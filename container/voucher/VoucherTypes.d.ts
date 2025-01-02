import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface VoucherFormData {
  date: Date;
  voucherType: string;
  manualVoucherNo: string;
  particular: string;
  ledger: string;
  amount: string;
}

interface VoucherBody {
  org_id: number | null;
  trans_date: string;
  ledger_id: string;
  vouch_type: string;
  particular: string;
  amount: string;
  fin_id: number | null;
  ref_vouch: string | null;
}

export interface VoucherProps {
  loading: boolean;
  form: UseFormReturn<VoucherFormData, any, undefined>;
  handleSubmit: SubmitHandler<VoucherFormData>;
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
}
