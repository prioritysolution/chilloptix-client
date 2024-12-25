import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface RackFormData {
  floorId: string;
  chamberId: string;
  rackName: string;
  rackNo: string;
}

interface RackBody {
  org_id: number | null;
  rack_id?: number;
  floor_id: string;
  chamber_id: string;
  rack_name: string;
  rack_no: string;
}

export interface RackProps {
  addRackLoading: boolean;
  updateRackLoading: boolean;
  loading: boolean;
  form: UseFormReturn<RackFormData, any, undefined>;
  handleSubmit: SubmitHandler<RackFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: RackTableData | null;
  handleEditData: (data: RackTableData) => void;
}

export interface RackFormProps {
  addRackLoading: boolean;
  updateRackLoading: boolean;
  form: UseFormReturn<RackFormData, any, undefined>;
  handleSubmit: SubmitHandler<RackFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: RackTableData | null;
}

export interface RackTableProps {
  handleEditData: (data: RackTableData) => void;
}

export interface RackTableData {
  Id: number;
  Floor_Id: string;
  Chamber_Id: string;
  Rack_Name: string;
  Rack_No: string;
}
