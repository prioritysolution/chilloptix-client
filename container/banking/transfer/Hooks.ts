import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { decimalRegex } from "@/utils/validationRegex";
import { format } from "date-fns";
import { TransferFormData } from "./TransferTypes";
import { getBankBalanceAPI } from "../deposit/DepositApis";
import { addTransferAPI } from "./TransferApis";

export const useTransfer = () => {
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);
  const [finId, setFinId] = useState<number | null>(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
      setFinId(getCookieData<number | null>("chilloptixClientFinId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    date: yup.date().required("Transfer date is required"),
    senderBankId: yup.string().required("Bank is required"),
    availableBalance: yup.string().default(""),
    transferType: yup.string().required("Transfer type is required"),
    receiverBankId: yup
      .string()
      .default("")
      .test(
        "is-required-for-bank",
        "Receiver bank is required",
        function (value) {
          const transferType = this.parent.transferType;
          if (transferType === "bank" && !value) {
            return false; // Invalid if transfer type is "bank" and receiverBankId is empty
          }
          return true; // Valid otherwise
        }
      ),
    ledger: yup
      .string()
      .default("")
      .test("is-required-for-transfer", "Ledger is required", function (value) {
        const transferType = this.parent.transferType;
        if (transferType === "transfer" && !value) {
          return false; // Invalid if transfer type is "transfer" and ledger is empty
        }
        return true; // Valid otherwise
      }),
    manualVoucherNo: yup.string().default(""),
    particular: yup.string().required("Particular is required"),
    amount: yup
      .string()
      .required("Amount is required")
      .test("is-valid-number", "Amount is invalid", (value) => {
        if (value === "" || value === null) return true; // Allow empty or null values
        return decimalRegex.test(value); // Validate that it matches the number format with up to two decimals
      })
      .test(
        "is-greater-than-zero",
        "Amount must be greater than 0",
        (value) => {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          return numValue > 0; // Ensure the number is greater than 0 if provided
        }
      )
      .test(
        "is-less-than-or-equal-to-balance",
        "Amount must be less than or equal to available balance",
        function (value) {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          const availableBalance = parseFloat(
            this.parent.availableBalance || "0"
          );

          if (isNaN(numValue) || isNaN(availableBalance)) {
            return false; // Invalid if either value is not a number
          }

          return numValue <= availableBalance; // Check if amount is within the balance
        }
      ),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<TransferFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      date: undefined,
      senderBankId: "",
      availableBalance: "",
      transferType: "bank",
      receiverBankId: "",
      ledger: "",
      manualVoucherNo: "",
      particular: "",
      amount: "",
    },
  });

  const { date, senderBankId, transferType } = form.watch();

  // Handle form submission
  const handleSubmit: SubmitHandler<TransferFormData> = (values) => {
    if (orgId) {
      addTransferApiCall(values, orgId);
      console.log(values);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const addTransferApiCall = async (item: TransferFormData, orgId: number) => {
    setLoading(true);

    const data = {
      org_id: orgId,
      trans_date: format(item.date, "yyyy-MM-dd"),
      bank_id: item.senderBankId,
      particulars: item.particular,
      amount: item.amount,
      ref_vouch: item.manualVoucherNo || null,
      fin_id: finId,
      gl_id: item.transferType === "transfer" ? item.ledger : null,
      trf_id: item.transferType === "bank" ? item.receiverBankId : null,
    };

    try {
      const res: ApiResponse = await addTransferAPI(data);

      if (res.status === 200) {
        form.reset();
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getBankBalanceApiCall = async (
    orgId: number,
    date: Date,
    bankId: string
  ) => {
    setLoading(true);

    const data = {
      org_id: orgId,
      date: format(date, "yyyy-MM-dd"),
      bank_Id: bankId,
    };

    try {
      const res: ApiResponse = await getBankBalanceAPI(data);

      if (res.status === 200) {
        form.setValue("availableBalance", res.data.details);
      } else {
        toast.error(res.data.message);
        form.setValue("availableBalance", "");
      }
    } catch (err) {
      toast.error("Something went wrong");
      form.setValue("availableBalance", "");
    } finally {
      setLoading(false);
    }
  };

  const prevDate = useRef<Date>(date);
  const prevSenderBankId = useRef(senderBankId);

  useEffect(() => {
    if (
      orgId &&
      senderBankId &&
      date &&
      (senderBankId !== prevSenderBankId.current || date !== prevDate.current)
    ) {
      getBankBalanceApiCall(orgId, date, senderBankId);
    }
    prevDate.current = date;
    prevSenderBankId.current = senderBankId;
  }, [date, senderBankId, orgId]);

  useEffect(() => {
    form.setValue("receiverBankId", "");
    form.setValue("ledger", "");
  }, [senderBankId, transferType]);

  return {
    loading,
    form,
    handleSubmit,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
  };
};
