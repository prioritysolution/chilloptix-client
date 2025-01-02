import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface BookingSearchFormData {
  searchKey: string;
  bookingType: string;
}

export interface BookingSearchProps {
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: Dispatch<SetStateAction<boolean>>;
  handleSelectData: (data: BookingSearchTableData) => void;
  bookType?: string;
}

export interface BookingSearchFormProps {
  loading: boolean;
  form: UseFormReturn<GeneralBookingFormData, any, undefined>;
  handleSubmit: SubmitHandler<GeneralBookingFormData>;
  bookType: string;
}

export interface BookingSearchTableProps {
  setIsBookingModalOpen: Dispatch<SetStateAction<boolean>>;
  handleSelectData: (data: BookingSearchTableData) => void;
}

export interface BookingSearchTableData {
  Id: number;
  Book_No: number;
  Bok_Date: string;
  Cust_Name: string;
  Relation_Name: string;
  Village: string;
  Mobile: string;
  Book_Qnty: string;
}
