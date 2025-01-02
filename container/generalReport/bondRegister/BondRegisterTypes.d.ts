import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface BondRegisterFormData {
  fromDate: Date;
  toDate: Date;
  viewType: string;
}

export interface BondRegisterTableData {
  Id: number;
  Issue_Date: string;
  Bond_No: number;
  Book_No: number;
  Issue_Pack: number;
  Issue_Qnty: string;
  Cust_Name: string;
  Address: string;
  Mobile: string;
  Rack_Status: string;
}

interface BondRegisterBody {
  org_id: number | null;
  form_date: string;
  to_date: string;
  type: string;
}

export interface BondRegisterProps {
  loading: boolean;
  form: UseFormReturn<BondRegisterFormData, any, undefined>;
  handleSubmit: SubmitHandler<BondRegisterFormData>;
  bondRegisterTableData: BondRegisterTableData[];
  handleDownloadPdf: () => void;
  totalPack: number;
  totalQuantity: number;
}

export interface BondRegisterFormProps {
  loading: boolean;
  form: UseFormReturn<BondRegisterFormData, any, undefined>;
  handleSubmit: SubmitHandler<BondRegisterFormData>;
  handleDownloadPdf: () => void;
}

export interface BondRegisterTableProps {
  bondRegisterTableData: BondRegisterTableData[];
  totalPack: number;
  totalQuantity: number;
}
