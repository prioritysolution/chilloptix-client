import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface ChamberFormData {
  floorId: string;
  chamberName: string;
  chamberNo: string;
}

interface ChamberBody {
  org_id: number | null;
  chamber_id?: number;
  floor_id: string;
  chamber_name: string;
  chamber_no: string;
}

export interface ChamberProps {
  addChamberLoading: boolean;
  updateChamberLoading: boolean;
  loading: boolean;
  form: UseFormReturn<ChamberFormData, any, undefined>;
  handleSubmit: SubmitHandler<ChamberFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: ChamberTableData | null;
  handleEditData: (data: ChamberTableData) => void;
}

export interface ChamberFormProps {
  addChamberLoading: boolean;
  updateChamberLoading: boolean;
  form: UseFormReturn<ChamberFormData, any, undefined>;
  handleSubmit: SubmitHandler<ChamberFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: ChamberTableData | null;
}

export interface ChamberTableProps {
  handleEditData: (data: ChamberTableData) => void;
}

export interface ChamberTableData {
  Id: number;
  Floor_Id: string;
  Chamber_Name: string;
  Chamber_No: string;
}
