import { BondSearchTableData } from "@/common/form/bondSearchForm/BondSearchTypes";
import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface RentReceiptFormData {
  date: Date;
  bondNo: string;
  name: string;
  guardianName: string;
  address: string;
  advanceAmount: string;
  phone: string;
  transType: string;
  bankId: string;
  refVouch: string;
  collectAmount: string;
}

export interface RentDetailsFormData {
  balanceQuantity: string;
  releaseQuantity: string;
  basicRent: string;
  insurance: string;
  rmsFees: string;
  dryingAmount: string;
  totalAmount: string;
  totalAmount: string;
}

interface RentDetails {
  rack: string;
  qnty: string;
  basic: string;
  insurance: string;
  rms: string;
  drying: string;
}

export interface RentReceiptBody {
  org_id: number | null;
  bond_id: number | null;
  rent_date: string;
  adv_amt: string;
  tot_amount: string;
  fin_id: number | null;
  rent_details: RentDetails[];
  bank_id: string;
  ref_vouch: string;
}

export interface RentDetailsBody {
  org_id: number | null;
  bond_id: string;
  date: string;
}

export interface CalculateRentBody {
  org_id: number | null;
  qnty: string;
  date: string;
}

export interface RentReceiptProps {
  loading: boolean;
  getBondDetailsLoading: boolean;
  form: UseFormReturn<RentReceiptFormData, any, undefined>;
  rentDetailsForm: UseFormReturn<RentDetailsFormData, any, undefined>;
  handleSubmit: SubmitHandler<RentReceiptFormData>;
  handleRentDetailsSubmit: SubmitHandler<RentDetailsFormData>;
  handleSelectBond: (data: BondSearchTableData) => void;
  isOpenPdf: boolean;
  setIsOpenPdf: Dispatch<SetStateAction<boolean>>;
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
  handleGetRentDetailsByBondNo: () => void;
  rentReceiptTableData: RentReceiptTable[];
  handleOpenRentDetails: (data: RentReceiptTable) => void;
  openRentDetails: boolean;
  setOpenRentDetails: Dispatch<SetStateAction<boolean>>;
  collectionDetailsTableData: any[];
  handleDeleteCollection: (id: string) => void;
  handleShowPdf: () => void;
  rentCollectionPdfData: any;
}

export interface RentReceiptTable {
  Id: number | null;
  Rack_Id: number | null;
  Cust_Name: string | null;
  Relation_Name: string | null;
  Mobile: string | null;
  Address: string | null;
  Book_No: number | null;
  Bond_No: number | null;
  Adv_Paid: string | null;
  Issue_Date: string | null;
  Flor_Name: string | null;
  Chamber_Name: string | null;
  Rack_Name: string | null;
  Pocket_Name: string | null;
  Position: string | null;
  Pack: number | null;
}

export interface RentReceiptTableProps {
  rentReceiptTableData: RentReceiptTable[];
  handleOpenRentDetails: (data: RentReceiptTable) => void;
  collectionDetailsTableData: any[];
}

export interface CollectionDetailsTableProps {
  handleDeleteCollection: (id: string) => void;
  collectionDetailsTableData: any[];
}

export interface RentReceiptFormProps {
  getBondDetailsLoading: boolean;
  form: UseFormReturn<RentReceiptFormData, any, undefined>;
  handleGetRentDetailsByBondNo: () => void;
  setIsBondModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface RentDetailsFormProps {
  form: UseFormReturn<RentDetailsFormData, any, undefined>;
  handleSubmit: SubmitHandler<RentDetailsFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface RentReceiptPdfProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  rentCollectionPdfData: any;
}
