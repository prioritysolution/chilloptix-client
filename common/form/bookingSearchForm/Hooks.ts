import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import getCookieData from "@/utils/getCookieData";
import { BookingSearchFormData } from "./BookingSearchTypes";
import { addBookingSearchAPI } from "./BookingSearchFormApis";
import { ApiResponse } from "@/container/ApiTypes";
import { useDispatch } from "react-redux";
import { getBookingSearchData } from "./BookingSearchFormReducer";

export const useBookingSearch = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    bookingType: yup
      .string()
      .required("Booking type is required") // Ensure it is required
      .test("is-valid-booking-type", "Booking type is invalid", (value) => {
        // Return true only if the value is valid
        return value === "1" || value === "2" || value === "3" || value === "";
      }),
    searchKey: yup.string().required("Please enter a value"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<BookingSearchFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      bookingType: "",
      searchKey: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<BookingSearchFormData> = (values) => {
    if (orgId) {
      addBookingSearchApiCall(values, orgId);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  // Function to call the login API
  const addBookingSearchApiCall = async (
    item: BookingSearchFormData,
    orgId: number
  ) => {
    setLoading(true);

    try {
      const res: ApiResponse = await addBookingSearchAPI(
        orgId,
        item.bookingType,
        item.searchKey
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(getBookingSearchData(res.data.details));
      } else {
        toast.error(res.data.message);
        dispatch(getBookingSearchData([]));
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getBookingSearchData([]));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    form,
    handleSubmit,
    isBookingModalOpen,
    setIsBookingModalOpen,
  };
};
