import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { RentFormData } from "./RentTypes";
import { decimalRegex } from "@/utils/validationRegex";
import { addRentAPI } from "./RentApis";
import { format } from "date-fns";

export const useRent = () => {
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
      setStartDate(
        getCookieData<string | null>("chilloptixClientFinStartDate")
      );
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    basicRate: yup
      .string()
      .required("Basic rate is required")
      .test("is-valid-number", "Basic rate is invalid", (value) => {
        if (value === "" || value === null) return true; // Allow empty or null values
        return decimalRegex.test(value); // Validate that it matches the number format with up to two decimals
      })
      .test(
        "is-greater-than-zero",
        "Basic rate must be greater than 0",
        (value) => {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          return numValue > 0; // Ensure the number is greater than 0 if provided
        }
      ),
    insurance: yup
      .string()
      .required("Isurance is required")
      .test("is-valid-number", "Insurance is invalid", (value) => {
        if (value === "" || value === null) return true; // Allow empty or null values
        return decimalRegex.test(value); // Validate that it matches the number format with up to two decimals
      })
      .test(
        "is-greater-than-zero",
        "Insurance must be greater than 0",
        (value) => {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          return numValue > 0; // Ensure the number is greater than 0 if provided
        }
      ),
    regulatedMarketFee: yup
      .string()
      .required("Regulated market fee is required")
      .test("is-valid-number", "Regulated market fee is invalid", (value) => {
        if (value === "" || value === null) return true; // Allow empty or null values
        return decimalRegex.test(value); // Validate that it matches the number format with up to two decimals
      })
      .test(
        "is-greater-than-zero",
        "Regulated market fee must be greater than 0",
        (value) => {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          return numValue > 0; // Ensure the number is greater than 0 if provided
        }
      ),
    amount: yup
      .string()
      .required("Amount is required")
      .test("is-valid-number", "Amount is invalid", (value) => {
        if (value === "" || value === null) return true; // Allow empty or null values
        return decimalRegex.test(value); // Validate that it matches the number format with up to two decimals
      })
      .test(
        "is-greater-than-zero",
        "Amount must be greater than 0",
        (value) => {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          return numValue > 0; // Ensure the number is greater than 0 if provided
        }
      ),
    effectFrom: yup
      .date()
      .required("Effect from date is required")
      .test("is-valid-start-date", "Start date is invalid", function (value) {
        // Check if the startDate is a valid date string
        if (!startDate || isNaN(new Date(startDate).getTime())) {
          return this.createError({
            message: "Invalid finantial start date",
          });
        }

        // Ensure that effectFrom is equal to or greater than startDate
        const startDateObj = new Date(startDate);
        if (value && new Date(value) < startDateObj) {
          return this.createError({
            message: `Effect from date should be from finantial start date`,
          });
        }

        return true;
      }),
    effectTo: yup
      .date()
      .required("Effect to date is required")
      .test(
        "is-greater-than-effectFrom",
        "Effect to date must be greater than effect from date",
        function (value) {
          const { effectFrom } = this.parent;
          return (
            !effectFrom || !value || new Date(value) >= new Date(effectFrom)
          );
        }
      ),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<RentFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      basicRate: "",
      insurance: "",
      regulatedMarketFee: "",
      amount: "",
    },
  });

  const { effectFrom } = form.watch();

  // Handle form submission
  const handleSubmit: SubmitHandler<RentFormData> = (values) => {
    if (orgId) {
      addRentApiCall(values, orgId);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  // Function to call the login API
  const addRentApiCall = async (item: RentFormData, orgId: number) => {
    setLoading(true);

    const data = {
      org_id: orgId,
      basic_rate: item.basicRate,
      insurance: item.insurance,
      rms_fees: item.regulatedMarketFee,
      drying_fees: item.amount,
      valid_frm: format(item.effectFrom, "yyyy-MM-dd"),
      valid_till: format(item.effectTo, "yyyy-MM-dd"),
    };

    try {
      const res: ApiResponse = await addRentAPI(data);

      if (res.status === 200) {
        form.reset();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.resetField("effectTo");
  }, [effectFrom]);

  return {
    loading,
    form,
    handleSubmit,
    startDate,
  };
};
