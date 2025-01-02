import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface GeneralBookingFormData {
  bookingDate: Date;
  name: string;
  guardianName: string;
  village: string;
  postOffice: string;
  pinCode: string;
  district: string;
  mobile: string;
  quantity: string;
  advanceAmount: string;
  agentId: string;
  validUpto: Date;
  transType: string;
  bankId: string;
  refVouch: string;
}

interface GeneralBookingBody {
  org_id: number | null;
  booking_date: string;
  cust_name: string;
  relation_name: string;
  village: string;
  post: string;
  pin: string;
  dist: string;
  mob: string;
  qunty: string;
  amount: string;
  agent_id: string;
  valid_till: string;
  fin_id: number | null;
  cust_id: number | null;
  bank_id: string | null;
  ref_vouch: string;
}

export interface GeneralBookingProps {
  loading: boolean;
  form: UseFormReturn<GeneralBookingFormData, any, undefined>;
  handleSubmit: SubmitHandler<GeneralBookingFormData>;
  handleSelectCustomer: (id: number) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  disableField: boolean;
  customerData: any[];
  showTransBlock: boolean;
  bookingData: any;
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
  handleShowPdf: () => void;
}

export interface GeneralBookingPdfProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bookingData: any;
}
