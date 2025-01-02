import { BondSearchTableData } from "@/common/form/bondSearchForm/BondSearchTypes";
import { BookingSearchTableData } from "@/common/form/bookingSearchForm/BookingSearchTypes";
import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface RackPostingFormData {
  bookingNo: string;
  bondId: string;
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
  positionId: string;
  pack: string;
}

interface RackData {
  floor: string;
  chamber: string;
  rack: string;
  pocket: string;
  no_pack: string;
  bond_id: string;
  position: string;
}

export interface RackPostingBody {
  org_id: number | null;
  post_date: string;
  rack_details: RackData[];
}

export interface BondListData {
  Id: number;
  Bond_No: number;
}

export interface RackPostingProps {
  loading: boolean;
  getBondListLoading: boolean;
  form: UseFormReturn<RackPostingFormData, any, undefined>;
  handleSubmit: SubmitHandler<RackPostingFormData>;
  handleSelectBooking: (data: BookingSearchTableData) => void;
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
  handleGetBondListByBookingNo: () => void;
  rackPostingTableData: any[];
  handleDeleteFromTable: (id: number) => void;
  handleAddRackPosting: () => void;
  totalPack: any[];
  bondListData: BondListData[];
}

export interface RackPostingTableProps {
  rackPostingTableData: any[];
  handleDeleteFromTable: (id: number) => void;
}

export interface RackPostingFormProps {
  getBondListLoading: boolean;
  form: UseFormReturn<RackPostingFormData, any, undefined>;
  handleSubmit: SubmitHandler<RackPostingFormData>;
  handleGetBondListByBookingNo: () => void;
  rackPostingTableData: RackPostingFormData[];
  handleAddRackPosting: () => void;
  setIsBookingModalOpen: Dispatch<SetStateAction<boolean>>;
  totalPack: any[];
  bondListData: BondListData[];
}
