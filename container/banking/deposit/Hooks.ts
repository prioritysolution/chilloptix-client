import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { decimalRegex } from "@/utils/validationRegex";
import { format } from "date-fns";
import { DepositFormData } from "./DepositTypes";
import { addDepositAPI, getBankBalanceAPI } from "./DepositApis";

export const useDeposit = () => {
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
    date: yup.date().required("Deposit date is required"),
    bankId: yup.string().required("Bank is required"),
    availableBalance: yup.string().default(""),
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
      ),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<DepositFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      date: undefined,
      bankId: "",
      availableBalance: "",
      manualVoucherNo: "",
      particular: "",
      amount: "",
    },
  });

  const { date, bankId } = form.watch();

  // Handle form submission
  const handleSubmit: SubmitHandler<DepositFormData> = (values) => {
    if (orgId) {
      addDepositApiCall(values, orgId);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const addDepositApiCall = async (item: DepositFormData, orgId: number) => {
    setLoading(true);

    const data = {
      org_id: orgId,
      trans_date: format(item.date, "yyyy-MM-dd"),
      bank_id: item.bankId,
      particulars: item.particular,
      amount: item.amount,
      ref_vouch: item.manualVoucherNo || null,
      fin_id: finId,
    };

    try {
      const res: ApiResponse = await addDepositAPI(data);

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
  const prevBankId = useRef(bankId);

  useEffect(() => {
    if (
      orgId &&
      bankId &&
      date &&
      (bankId !== prevBankId.current || date !== prevDate.current)
    ) {
      getBankBalanceApiCall(orgId, date, bankId);
    }
    prevDate.current = date;
    prevBankId.current = bankId;
  }, [date, bankId, orgId]);

  return {
    loading,
    form,
    handleSubmit,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
  };
};
