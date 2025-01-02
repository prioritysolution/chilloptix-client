import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface FloorFormData {
  floorName: string;
  floorNo: string;
  capacity: string;
}

interface FloorBody {
  org_id: number | null;
  floor_id?: number;
  floor_name: string;
  floor_no: string;
  capacity: string;
}

export interface FloorProps {
  addFloorLoading: boolean;
  updateFloorLoading: boolean;
  loading: boolean;
  form: UseFormReturn<FloorFormData, any, undefined>;
  handleSubmit: SubmitHandler<FloorFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: FloorTableData | null;
  handleEditData: (data: FloorTableData) => void;
}

export interface FloorFormProps {
  addFloorLoading: boolean;
  updateFloorLoading: boolean;
  form: UseFormReturn<FloorFormData, any, undefined>;
  handleSubmit: SubmitHandler<FloorFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: FloorTableData | null;
}

export interface FloorTableProps {
  handleEditData: (data: FloorTableData) => void;
}

export interface FloorTableData {
  Id: number;
  Floor_Name: string;
  Floor_No: string;
  Capacity: string;
}
