import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface PocketFormData {
  rackId: string;
  pocketName: string;
  pocketNo: string;
  capacity: string;
}

interface PocketBody {
  org_id: number | null;
  pocket_id?: number;
  rack_id: string;
  pocket_name: string;
  pocket_no: string;
  capacity: string;
}

export interface PocketProps {
  addPocketLoading: boolean;
  updatePocketLoading: boolean;
  loading: boolean;
  form: UseFormReturn<PocketFormData, any, undefined>;
  handleSubmit: SubmitHandler<PocketFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: PocketTableData | null;
  handleEditData: (data: PocketTableData) => void;
}

export interface PocketFormProps {
  addPocketLoading: boolean;
  updatePocketLoading: boolean;
  form: UseFormReturn<PocketFormData, any, undefined>;
  handleSubmit: SubmitHandler<PocketFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: PocketTableData | null;
}

export interface PocketTableProps {
  handleEditData: (data: PocketTableData) => void;
}

export interface PocketTableData {
  Id: number;
  Rack_Id: string;
  Pocket_Name: string;
  Pocket_No: string;
  Capacity: string;
}
