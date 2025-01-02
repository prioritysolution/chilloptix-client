import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface RentFormData {
  basicRate: string;
  insurance: string;
  regulatedMarketFee: string;
  amount: string;
  effectFrom: Date;
  effectTo: Date;
}

interface RentBody {
  org_id: number | null;
  basic_rate: string;
  insurance: string;
  rms_fees: string;
  drying_fees: string;
  valid_frm: string;
  valid_till: string;
}

export interface RentProps {
  loading: boolean;
  form: UseFormReturn<RentFormData, any, undefined>;
  handleSubmit: SubmitHandler<RentFormData>;
  startDate: string | null;
  fromDateDisable: boolean;
}
