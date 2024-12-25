import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface BankAccountFormData {
  bankName: string;
  branchName: string;
  ifsc: string;
  accountNo: string;
  ledger: string;
  openingBalance: string;
  openingDate: Date;
}

interface BankAccountBody {
  org_id: number | null;
  bank_id?: number;
  bank_name: string;
  branch_name: string;
  ifsc: string;
  account_no: string;
  gl_id: string;
  open_bal: string;
  open_date: string;
}

export interface BankAccountProps {
  addBankAccountLoading: boolean;
  // updateBankAccountLoading: boolean;
  loading: boolean;
  form: UseFormReturn<BankAccountFormData, any, undefined>;
  handleSubmit: SubmitHandler<BankAccountFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  // editData: BankAccountTableData | null;
  // handleEditData: (data: BankAccountTableData) => void;
  disableOpeningBalance: boolean;
}

export interface BankAccountFormProps {
  addBankAccountLoading: boolean;
  // updateBankAccountLoading: boolean;
  form: UseFormReturn<BankAccountFormData, any, undefined>;
  handleSubmit: SubmitHandler<BankAccountFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  // editData: BankAccountTableData | null;
  disableOpeningBalance: boolean;
}

export interface BankAccountTableProps {
  handleEditData: (data: BankAccountTableData) => void;
}

export interface BankAccountTableData {
  Id: number;
  Bank_Name: string;
  Branch_Name: string;
  Bank_IFSC: string;
  Account_No: string;
}
