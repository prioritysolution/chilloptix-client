import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { LoginFormData } from "./LoginTypes";
import { ApiResponse } from "@/container/ApiTypes";
import { addLoginAPI } from "./LoginApis";
import { format } from "date-fns";

export const useLogin = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // Form validation schema with yup
  const formSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<LoginFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<LoginFormData> = (values) => {
    addLoginApiCall(values);
  };

  // Function to call the login API
  const addLoginApiCall = async (item: LoginFormData) => {
    setLoading(true);

    const data = {
      ...item,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    try {
      const res: ApiResponse = await addLoginAPI(data);

      if (res.status === 200) {
        // Reset form and navigate on success
        form.reset();
        toast.success(res.data.message);

        // Save the token in a cookie with secure settings
        Cookies.set("chilloptixClientToken", res.data.token, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });
        Cookies.set("chilloptixClientOrgId", res.data.org_id, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });
        Cookies.set("chilloptixClientOrgName", res.data.org_Name, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });
        Cookies.set("chilloptixClientOrgAddress", res.data.org_Add, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });
        Cookies.set("chilloptixClientOrgMobile", res.data.org_mob, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });
        Cookies.set("chilloptixClientOrgReg", res.data.org_reg, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });
        Cookies.set("chilloptixClientOrgRegDate", res.data.org_reg_date, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });
        Cookies.set("chilloptixClientFinStartDate", res.data.fin_start, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });
        Cookies.set("chilloptixClientFinEndDate", res.data.fin_end, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });
        Cookies.set("chilloptixClientFinId", res.data.fin_id, {
          expires: 7, // 1 day expiration
          secure: process.env.NODE_ENV === "production", // Secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/",
        });

        router.push("/dashboard");
      } else {
        // Handle the case when login fails
        toast.error(res.data.message || "Unknown error");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleSubmit,
  };
};
