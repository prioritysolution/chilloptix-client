import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface DepositFormData {
  date: Date;
  bankId: string;
  availableBalance: string;
  manualVoucherNo: string;
  particular: string;
  amount: string;
}

interface DepositBody {
  org_id: number | null;
  trans_date: string;
  bank_id: string;
  ref_vouch: string | null;
  particulars: string;
  amount: string;
  fin_id: number | null;
}

interface BankBalanceBody {
  org_id: number | null;
  date: string;
  bank_Id: string;
}

export interface DepositProps {
  loading: boolean;
  form: UseFormReturn<DepositFormData, any, undefined>;
  handleSubmit: SubmitHandler<DepositFormData>;
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
}
