import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface TransferFormData {
  date: Date;
  senderBankId: string;
  availableBalance: string;
  transferType: string;
  receiverBankId: string;
  ledger: string;
  manualVoucherNo: string;
  particular: string;
  amount: string;
}

interface TransferBody {
  org_id: number | null;
  trans_date: string;
  bank_id: string;
  ref_vouch: string | null;
  particulars: string;
  amount: string;
  fin_id: number | null;
  gl_id: string | null;
  trf_id: string | null;
}

interface BankBalanceBody {
  org_id: number | null;
  date: string;
  bank_Id: string;
}

export interface TransferProps {
  loading: boolean;
  form: UseFormReturn<TransferFormData, any, undefined>;
  handleSubmit: SubmitHandler<TransferFormData>;
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
}
