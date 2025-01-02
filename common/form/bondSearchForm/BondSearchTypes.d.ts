import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface BondSearchFormData {
  searchKey: string;
  bondType: string;
}

export interface BondSearchProps {
  isBondModalOpen: boolean;
  setIsBondModalOpen: Dispatch<SetStateAction<boolean>>;
  handleSelectData: (data: BondSearchTableData) => void;
}

export interface BondSearchFormProps {
  loading: boolean;
  form: UseFormReturn<GeneralBondFormData, any, undefined>;
  handleSubmit: SubmitHandler<GeneralBondFormData>;
}

export interface BondSearchTableProps {
  setIsBondModalOpen: Dispatch<SetStateAction<boolean>>;
  handleSelectData: (data: BondSearchTableData) => void;
}

export interface BondSearchTableData {
  Id: number;
  Issue_Date: string;
  Bond_No: number;
  Issue_Qnty: string;
  Issue_Pack: number;
  Cust_Name: string;
  Relation_Name: string;
  Address: string;
  Mobile: string;
}
