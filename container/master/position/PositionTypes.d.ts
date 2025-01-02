import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface PositionFormData {
  name: string;
}

interface PositionBody {
  org_id: number | null;
  position_id?: number;
  position_name: string;
}

export interface PositionProps {
  addPositionLoading: boolean;
  updatePositionLoading: boolean;
  loading: boolean;
  form: UseFormReturn<PositionFormData, any, undefined>;
  handleSubmit: SubmitHandler<PositionFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: PositionTableData | null;
  handleEditData: (data: PositionTableData) => void;
}

export interface PositionFormProps {
  addPositionLoading: boolean;
  updatePositionLoading: boolean;
  form: UseFormReturn<PositionFormData, any, undefined>;
  handleSubmit: SubmitHandler<PositionFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: PositionTableData | null;
}

export interface PositionTableProps {
  handleEditData: (data: PositionTableData) => void;
}

export interface PositionTableData {
  Id: number;
  Position_Name: string;
}
