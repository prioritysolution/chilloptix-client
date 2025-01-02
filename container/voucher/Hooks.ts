import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { decimalRegex } from "@/utils/validationRegex";
import { format } from "date-fns";
import { VoucherFormData } from "./VoucherTypes";
import { addVoucherAPI, getVoucherLedgerDataAPI } from "./VoucherApis";
import { useDispatch } from "react-redux";
import { getLedgerData } from "./VoucherReducer";

export const useVoucher = () => {
  const dispatch = useDispatch();

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
    date: yup.date().required("Voucher date is required"),
    voucherType: yup.string().required("Voucher type is required"),
    manualVoucherNo: yup.string().default(""),
    particular: yup.string().required("Particular is required"),
    ledger: yup.string().required("Ledger is required"),
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
  const form = useForm<VoucherFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      date: undefined,
      voucherType: "R",
      manualVoucherNo: "",
      particular: "",
      ledger: "",
      amount: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<VoucherFormData> = (values) => {
    if (orgId) {
      addVoucherApiCall(values, orgId);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const addVoucherApiCall = async (item: VoucherFormData, orgId: number) => {
    setLoading(true);

    const data = {
      org_id: orgId,
      trans_date: format(item.date, "yyyy-MM-dd"),
      ledger_id: item.ledger,
      vouch_type: item.voucherType,
      particular: item.particular,
      amount: item.amount,
      ref_vouch: item.manualVoucherNo || null,
      fin_id: finId,
    };

    try {
      const res: ApiResponse = await addVoucherAPI(data);

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

  const getVoucherLedgerDataApiCall = async () => {
    setLoading(true);

    try {
      const res: ApiResponse = await getVoucherLedgerDataAPI();

      if (res.status === 200) {
        dispatch(getLedgerData(res.data.details));
      } else {
        toast.error(res.data.message);
        dispatch(getLedgerData([]));
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getLedgerData([]));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    form,
    handleSubmit,
    getVoucherLedgerDataApiCall,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
  };
};
