import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface BookingRegisterFormData {
  fromDate: Date;
  toDate: Date;
  viewType: string;
}

export interface BookingRegisterTableData {
  Id: number;
  Bok_Date: string;
  Book_No: number;
  Book_Qnty: string;
  Cust_Name: string;
  Address: string;
  Mobile: string;
  Adv_Paid: string;
  Bond_Status: string;
}

interface BookingRegisterBody {
  org_id: number | null;
  form_date: string;
  to_date: string;
  type: string;
}

export interface BookingRegisterProps {
  loading: boolean;
  form: UseFormReturn<BookingRegisterFormData, any, undefined>;
  handleSubmit: SubmitHandler<BookingRegisterFormData>;
  bookingRegisterTableData: BookingRegisterTableData[];
  handleDownloadPdf: () => void;
  totalQuantity: number;
  totalAdvance: number;
}

export interface BookingRegisterFormProps {
  loading: boolean;
  form: UseFormReturn<BookingRegisterFormData, any, undefined>;
  handleSubmit: SubmitHandler<BookingRegisterFormData>;
  handleDownloadPdf: () => void;
}

export interface BookingRegisterTableProps {
  bookingRegisterTableData: BookingRegisterTableData[];
  totalQuantity: number;
  totalAdvance: number;
}
