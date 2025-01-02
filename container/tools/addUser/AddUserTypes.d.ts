import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface AddUserFormData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
}

interface AddUserBody {
  org_id: number | null;
  //   basic_rate: string;
  //   insurance: string;
  //   rms_fees: string;
  //   drying_fees: string;
  //   valid_frm: string;
  //   valid_till: string;
}

export interface AddUserProps {
  loading: boolean;
  form: UseFormReturn<AddUserFormData, any, undefined>;
  handleSubmit: SubmitHandler<AddUserFormData>;
}
