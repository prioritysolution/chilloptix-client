import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface CollectionRegisterFormData {
  fromDate: Date;
  toDate: Date;
}

export interface CollectionRegisterTableData {
  Id: number;
  Rel_Date: string;
  Cust_Name: string;
  Address: string;
  Mobile: string;
  Qnty: string;
  Basic: string;
  Insurance: string;
  Rms_Fee: string;
  Drying_Fee: string;
  Adv_Amt: string;
}

interface CollectionRegisterBody {
  org_id: number | null;
  form_date: string;
  to_date: string;
}

export interface CollectionRegisterProps {
  loading: boolean;
  form: UseFormReturn<CollectionRegisterFormData, any, undefined>;
  handleSubmit: SubmitHandler<CollectionRegisterFormData>;
  collectionRegisterTableData: CollectionRegisterTableData[];
  handleDownloadPdf: () => void;
  totalQuantity: number;
  totalBasic: number;
  totalInsurance: number;
  totalRms: number;
  totalDrying: number;
  totalAdvance: number;
}

export interface CollectionRegisterFormProps {
  loading: boolean;
  form: UseFormReturn<CollectionRegisterFormData, any, undefined>;
  handleSubmit: SubmitHandler<CollectionRegisterFormData>;
  handleDownloadPdf: () => void;
}

export interface CollectionRegisterTableProps {
  collectionRegisterTableData: CollectionRegisterTableData[];
  totalQuantity: number;
  totalBasic: number;
  totalInsurance: number;
  totalRms: number;
  totalDrying: number;
  totalAdvance: number;
}
