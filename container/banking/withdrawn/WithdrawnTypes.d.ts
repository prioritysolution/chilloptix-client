import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface WithdrawnFormData {
  date: Date;
  bankId: string;
  availableBalance: string;
  manualVoucherNo: string;
  particular: string;
  amount: string;
}

interface WithdrawnBody {
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

export interface WithdrawnProps {
  loading: boolean;
  form: UseFormReturn<WithdrawnFormData, any, undefined>;
  handleSubmit: SubmitHandler<WithdrawnFormData>;
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
}
