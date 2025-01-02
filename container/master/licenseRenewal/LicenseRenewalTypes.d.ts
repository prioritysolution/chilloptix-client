import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface LicenseRenewalFormData {
  validFrom: Date;
  validTo: Date;
}

interface LicenseRenewalBody {
  org_id: number | null;
  ren_id?: number | null;
  form_date: string;
  till_date: string;
}

export interface LicenseRenewalProps {
  addLicenseRenewalLoading: boolean;
  updateLicenseRenewalLoading: boolean;
  loading: boolean;
  form: UseFormReturn<LicenseRenewalFormData, any, undefined>;
  handleSubmit: SubmitHandler<LicenseRenewalFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: LicenseRenewalTableData | null;
  handleEditData: (data: LicenseRenewalTableData) => void;
}

export interface LicenseRenewalFormProps {
  addLicenseRenewalLoading: boolean;
  updateLicenseRenewalLoading: boolean;
  form: UseFormReturn<LicenseRenewalFormData, any, undefined>;
  handleSubmit: SubmitHandler<LicenseRenewalFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: LicenseRenewalTableData | null;
}

export interface LicenseRenewalTableProps {
  handleEditData: (data: LicenseRenewalTableData) => void;
}

export interface LicenseRenewalTableData {
  Id: number;
  Valid_Frm: string;
  Valid_Till: string;
}
