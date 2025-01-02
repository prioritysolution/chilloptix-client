import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { format } from "date-fns";
import { AddUserFormData } from "./AddUserTypes";

export const useAddUser = () => {
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    name: yup.string().required("User name is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("User email is required"),
    mobile: yup.string().required("User mobile is required"),
    password: yup.string().required("Password is required"),
    role: yup.string().required("Role is required"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<AddUserFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<AddUserFormData> = (values) => {
    if (orgId) {
      //   addAddUserApiCall(values, orgId);
      console.log(values);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  // Function to call the login API
  //   const addAddUserApiCall = async (item: AddUserFormData, orgId: number) => {
  //     setLoading(true);

  //     const data = {
  //       org_id: orgId,
  //       basic_rate: item.basicRate,
  //       insurance: item.insurance,
  //       rms_fees: item.regulatedMarketFee,
  //       drying_fees: item.amount,
  //       valid_frm: format(item.effectFrom, "yyyy-MM-dd"),
  //       valid_till: format(item.effectTo, "yyyy-MM-dd"),
  //     };

  //     try {
  //       const res: ApiResponse = await addAddUserAPI(data);

  //       if (res.status === 200) {
  //         form.reset();
  //         toast.success(res.data.message);
  //       } else {
  //         toast.error(res.data.message);
  //       }
  //     } catch (err) {
  //       toast.error("Something went wrong");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return {
    loading,
    form,
    handleSubmit,
  };
};
