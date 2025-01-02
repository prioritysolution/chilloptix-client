import { BookingSearchTableData } from "@/common/form/bookingSearchForm/BookingSearchTypes";
import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface BondEntryFormData {
  bookingNo: string;
  name: string;
  address: string;
  bookingDate: string;
  bookingValid: string;
  bookingQuantity: string;
  date: Date;
  noOfPackages: string;
  netWeight: string;
  verified: string;
}

interface BondData {
  bond_qnty: string;
  bond_pack: string;
  verified: string;
}

export interface BondEntryBody {
  org_id: number | null;
  book_id: number;
  bond_date: string;
  bond_data: BondData[];
  fin_id: number | null;
}

export interface BondEntryProps {
  loading: boolean;
  getBookingDetailsLoading: boolean;
  form: UseFormReturn<BondEntryFormData, any, undefined>;
  handleSubmit: SubmitHandler<BondEntryFormData>;
  handleSelectBooking: (data: BookingSearchTableData) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bondPdfData: any;
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
  handleShowPdf: () => void;
  handleGetBookingDataByBookingNo: () => void;
  bondTableData: BondEntryFormData[];
  handleDeleteFromTable: (id: number) => void;
  handleAddBondEntry: () => void;
}

export interface BondEntryPdfProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bondPdfData: any[];
}

export interface BondEntryTableProps {
  bondTableData: BondEntryFormData[];
  handleDeleteFromTable: (id: number) => void;
}

export interface BondEntryFormProps {
  getBookingDetailsLoading: boolean;
  form: UseFormReturn<BondEntryFormData, any, undefined>;
  handleSubmit: SubmitHandler<BondEntryFormData>;
  handleGetBookingDataByBookingNo: () => void;
  bondTableData: BondEntryFormData[];
  handleAddBondEntry: () => void;
  setIsBookingModalOpen: Dispatch<SetStateAction<boolean>>;
}
