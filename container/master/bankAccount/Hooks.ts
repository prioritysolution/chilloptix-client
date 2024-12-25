import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { useDispatch } from "react-redux";
import { decimalRegex } from "@/utils/validationRegex";
import { BankAccountFormData, BankAccountTableData } from "./BankAccountTypes";
import { format, parse } from "date-fns";
import {
  addBankAccountAPI,
  getBankAccountAPI,
  getBankLedgerAPI,
} from "./BankAccountApis";
import { getBankAccountData, getBankLedgerData } from "./BankAccountReducer";

export const useBankAccount = () => {
  const dispatch = useDispatch();

  const [addBankAccountLoading, setAddBankAccountLoading] = useState(false);
  // const [updateBankAccountLoading, setUpdateBankAccountLoading] =
  //   useState(false);
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  // const [editData, setEditData] = useState<BankAccountTableData | null>(null);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [disableOpeningBalance, setDisableOpeningBalnce] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
      setStartDate(
        getCookieData<string | null>("chilloptixClientFinStartDate")
      );
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    bankName: yup.string().required("Bank name is required"),
    branchName: yup.string().required("Branch name is required"),
    ifsc: yup.string().required("IFSC is required"),
    accountNo: yup.string().required("Account no. is required"),
    ledger: yup.string().required("Legder is required"),
    openingBalance: yup
      .string()
      .required("Opening balance is required")
      .test("is-valid-number", "Opening balance is invalid", (value) => {
        if (value === "" || value === null) return true; // Allow empty or null values
        return decimalRegex.test(value); // Validate that it matches the number format with up to two decimals
      })
      .test(
        "is-greater-than-zero",
        "Opening balance must be equal greater than 0",
        (value) => {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          return numValue >= 0; // Ensure the number is greater than equal to 0 if provided
        }
      ),
    openingDate: yup.date().required("Opening date is required"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<BankAccountFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      bankName: "",
      branchName: "",
      ifsc: "",
      accountNo: "",
      ledger: "",
      openingBalance: "",
    },
  });

  const { openingDate } = form.watch();

  // Handle form submission
  const handleSubmit: SubmitHandler<BankAccountFormData> = (values) => {
    if (orgId) {
      // if (editData && Object.keys(editData).length > 0) {
      //   // updateBankAccountApiCall(editData.Id, values, orgId);
      // } else {
      // }
      addBankAccountApiCall(values, orgId);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  // const handleEditData = (data: BankAccountTableData) => {
  //   setEditData(data);
  //   setIsOpen(true);
  // };

  // Function to call the login API
  const addBankAccountApiCall = async (
    item: BankAccountFormData,
    orgId: number
  ) => {
    setAddBankAccountLoading(true);

    const data = {
      org_id: orgId,
      bank_name: item.bankName,
      branch_name: item.branchName,
      ifsc: item.ifsc,
      account_no: item.accountNo,
      gl_id: item.ledger,
      open_bal: item.openingBalance,
      open_date: format(item.openingDate, "yyyy-MM-dd"),
    };

    try {
      const res: ApiResponse = await addBankAccountAPI(data);

      if (res.status === 200) {
        form.reset();
        setIsOpen(false);
        getBankAccountApiCall(orgId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddBankAccountLoading(false);
    }
  };

  //   const updateBankAccountApiCall = async (
  //     bankAccountId: number,
  //     item: BankAccountFormData,
  //     orgId: number
  //   ) => {
  //     let data = {
  //       org_id: orgId,
  //       account_id: bankAccountId,
  //     //   agent_name: item.agentName,
  //     //   agent_rel: item.gurdianName,
  //     //   agent_add: item.address,
  //     //   agent_mob: item.mobile,
  //     //   percent: item.commissionType,
  //     //   comm_rate: item.commissionRate,
  //     //   agent_mail: item.email,
  //     //   dep_amt: item.amount,
  //     };

  //     setUpdateBankAccountLoading(true);
  //     try {
  //       const res = await updateBankAccountAPI(data);
  //       if (res.status === 200) {
  //         toast.success(res.data.message);
  //         form.reset();
  //         getBankAccountApiCall(orgId);
  //         setIsOpen(false);
  //       } else {
  //         toast.error(res.data.message);
  //       }
  //     } catch (error) {
  //       toast.error("Something went wrong");
  //     } finally {
  //       setUpdateBankAccountLoading(false);
  //     }
  //   };

  const getBankAccountApiCall = async (orgId: number) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getBankAccountAPI(orgId);

      if (res.status === 200) {
        dispatch(getBankAccountData(res.data.details));
      } else {
        dispatch(getBankAccountData([]));
        toast.error(res.data.message || "No Bank account data found");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getBankAccountData([]));
    } finally {
      setLoading(false);
    }
  };

  const getBankLedgerApiCall = async () => {
    setLoading(true);

    try {
      const res: ApiResponse = await getBankLedgerAPI();

      if (res.status === 200) {
        dispatch(getBankLedgerData(res.data.details));
      } else {
        dispatch(getBankLedgerData([]));
        toast.error(res.data.message || "No Bank ledger data found");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getBankLedgerData([]));
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (editData && Object.keys(editData).length > 0) {
  //     form.reset({
  //       bankName: editData.Bank_Name,
  //       branchName: editData.Branch_Name,
  //       ifsc: editData.IFSC,
  //       accountNo: editData.Account_No,
  //       ledger: editData.Ledger,
  //       openingBalance: editData.Opening_Balance,
  //       openingDate: parse(editData.Opening_Date, "yyyy-MM-dd", new Date()),
  //     });
  //   } else {
  //     form.reset({
  //       bankName: "",
  //       branchName: "",
  //       ifsc: "",
  //       accountNo: "",
  //       ledger: "",
  //       openingBalance: "",
  //     });
  //   }
  // }, [editData, form.reset]);

  // useEffect(() => {
  //   if (editData && !isOpen) {
  //     setEditData(null);
  //   }
  // }, [isOpen, editData]);

  useEffect(() => {
    if (
      openingDate &&
      startDate &&
      !isNaN(new Date(startDate).getTime()) &&
      new Date(openingDate) >= new Date(startDate)
    ) {
      form.setValue("openingBalance", "0");
      setDisableOpeningBalnce(true);
    } else {
      setDisableOpeningBalnce(false);
    }
  }, [openingDate]);

  return {
    getBankAccountApiCall,
    getBankLedgerApiCall,
    addBankAccountLoading,
    // updateBankAccountLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    // editData,
    // handleEditData,
    disableOpeningBalance,
  };
};
