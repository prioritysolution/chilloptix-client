import { BondSearchTableData } from "@/common/form/bondSearchForm/BondSearchTypes";
import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface RackPostingFormData {
  bondNo: string;
  issueDate: string;
  name: string;
  guardianName: string;
  address: string;
  bondQuantity: string;
  bondPack: string;
  date: Date;
  floorId: string;
  chamberId: string;
  rackId: string;
  pocketId: string;
  pack: string;
}

interface RackData {
  floor: string;
  chamber: string;
  rack: string;
  pocket: string;
  no_pack: string;
}

export interface RackPostingBody {
  org_id: number | null;
  bond_id: number;
  post_date: string;
  rack_details: RackData[];
}

export interface RackPostingProps {
  loading: boolean;
  getBondDetailsLoading: boolean;
  form: UseFormReturn<RackPostingFormData, any, undefined>;
  handleSubmit: SubmitHandler<RackPostingFormData>;
  handleSelectBond: (data: BondSearchTableData) => void;
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
  handleGetBondDataByBondNo: () => void;
  rackPostingTableData: any[];
  handleDeleteFromTable: (id: number) => void;
  handleAddRackPosting: () => void;
  totalPack: number;
}

export interface RackPostingTableProps {
  rackPostingTableData: any[];
  handleDeleteFromTable: (id: number) => void;
}

export interface RackPostingFormProps {
  getBondDetailsLoading: boolean;
  form: UseFormReturn<RackPostingFormData, any, undefined>;
  handleSubmit: SubmitHandler<RackPostingFormData>;
  handleGetBondDataByBondNo: () => void;
  rackPostingTableData: RackPostingFormData[];
  handleAddRackPosting: () => void;
  setIsBondModalOpen: Dispatch<SetStateAction<boolean>>;
  totalPack: number;
}
