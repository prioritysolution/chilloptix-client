import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { GeneralBookingFormData } from "./GeneralBookingTypes";
import { decimalRegex, pinRegex } from "@/utils/validationRegex";
import {
  addGeneralBookingAPI,
  getBankCustomerAPI,
  getBookingAPI,
} from "./GeneralBookingApis";
import { format } from "date-fns";

export const useGeneralBooking = () => {
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);
  const [finId, setFinId] = useState<number | null>(null);

  const [custId, setCustId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showTransBlock, setShowTransBlock] = useState(false);
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [disableField, setDisableField] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [bookId, setBookId] = useState<number | null>(null);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
      setFinId(getCookieData<number | null>("chilloptixClientFinId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    bookingDate: yup.date().required("Booking date is required"),
    name: yup.string().required("Name is required"),
    guardianName: yup.string().required("Guradian Name is required"),
    village: yup.string().required("Village is required"),
    postOffice: yup.string().required("Post office is required"),
    pinCode: yup
      .string()
      .required("Pin Code is required")
      .test("is-valid-pin", "Invalid pin code", (value) => {
        if (!value) return false; // Required validation already ensures value is not null or empty
        return pinRegex.test(value); // Check if it matches the exact 6-digit format
      }),
    district: yup.string().required("District is required"),
    mobile: yup.string().required("Mobile is required"),
    quantity: yup
      .string()
      .required("Quantity is required")
      .test("is-valid-number", "Invalid quantity", (value) => {
        if (!value) return false; // Required validation already handles null/empty
        return decimalRegex.test(value); // Validate format with regex
      })
      .test(
        "is-greater-than-zero",
        "Quantity must be greater than 0",
        (value) => {
          if (!value) return false; // Required validation already handles null/empty
          const numberValue = parseFloat(value);
          return numberValue > 0; // Ensure the value is greater than 0
        }
      ),
    advanceAmount: yup
      .string()
      .default("")
      .test("is-valid-number", "Invalid advance amount", (value) => {
        if (!value) return true; // Allow null or empty values
        return decimalRegex.test(value); // Validate format with regex
      })
      .test(
        "is-greater-than-or-equal-to-zero",
        "Advance amount must be greater than or equal to 0",
        (value) => {
          if (!value) return true; // Allow null or empty values
          const numberValue = parseFloat(value);
          return numberValue >= 0; // Ensure the value is >= 0
        }
      ),
    validUpto: yup.date().required("Valid upto is required"),
    transType: yup.string().default("bank"),
    bankId: yup.string().default(""),
    refVouch: yup.string().default(""),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<GeneralBookingFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      guardianName: "",
      village: "",
      postOffice: "",
      pinCode: "",
      district: "",
      mobile: "",
      quantity: "",
      advanceAmount: "",
      transType: "bank",
      bankId: "",
      refVouch: "",
    },
  });

  const { name, advanceAmount } = form.watch();

  // Handle form submission
  const handleSubmit: SubmitHandler<GeneralBookingFormData> = (values) => {
    if (orgId) {
      addGeneralBookingApiCall(values, orgId);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const handleSelectCustomer = (id: number) => {
    let selectedData = customerData.find((data) => data.Id === id);

    if (!!selectedData) {
      form.setValue("name", selectedData.Cust_Name);
      form.setValue("guardianName", selectedData.Relation_Name);
      form.setValue("village", selectedData.Village);
      form.setValue("postOffice", selectedData.Post_Off);
      form.setValue("pinCode", selectedData.Pin_Code);
      form.setValue("district", selectedData.Dist);
      form.setValue("mobile", selectedData.Mobile);
      setDisableField(true);
      setCustId(selectedData.Id);
      setSelectedValue(selectedData.Cust_Name);
    } else {
      form.setValue("name", "");
      form.setValue("guardianName", "");
      form.setValue("village", "");
      form.setValue("postOffice", "");
      form.setValue("pinCode", "");
      form.setValue("district", "");
      form.setValue("mobile", "");
      setCustId(null);
      setDisableField(false);
      setSelectedValue("");
    }
  };

  const handleShowPdf = () => {
    setShowSuccessMessage(false);
    setSuccessMessage("");
    setIsOpen(true);
    if (orgId && bookId) getBookingApiCall(orgId, bookId);
  };

  // Function to call the login API
  const addGeneralBookingApiCall = async (
    item: GeneralBookingFormData,
    orgId: number
  ) => {
    setLoading(true);

    const data = {
      org_id: orgId,
      booking_date: format(item.bookingDate, "yyyy-MM-dd"),
      cust_name: item.name,
      relation_name: item.guardianName,
      village: item.village,
      post: item.postOffice,
      pin: item.pinCode,
      dist: item.district,
      mob: item.mobile,
      qunty: item.quantity,
      amount: item.advanceAmount,
      valid_till: format(item.validUpto, "yyyy-MM-dd"),
      fin_id: finId,
      cust_id: custId,
      bank_id: item.transType === "bank" ? item.bankId : null,
      ref_vouch: item.refVouch,
    };

    try {
      const res: ApiResponse = await addGeneralBookingAPI(data);

      if (res.status === 200) {
        form.reset();
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        setBookId(res.data.details);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        setSuccessMessage("");
        setShowSuccessMessage(false);
        setBookId(null);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setSuccessMessage("");
      setShowSuccessMessage(false);
      setBookId(null);
    } finally {
      setLoading(false);
    }
  };

  const getBankCustomerApiCall = async (orgId: number, keyword: string) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getBankCustomerAPI(orgId, keyword);

      if (res.status === 200) {
        setCustomerData(res.data.details);
      } else {
        toast.error(res.data.message);
        setCustomerData([]);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setCustomerData([]);
    } finally {
      setLoading(false);
    }
  };

  const getBookingApiCall = async (orgId: number, bookId: number) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getBookingAPI(orgId, bookId);

      if (res.status === 200) {
        setBookingData(res.data.details[0]);
      } else {
        toast.error(res.data.message);
        setBookingData(null);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setBookingData(null);
    } finally {
      setLoading(false);
    }
  };

  const prevName = useRef(name);

  useEffect(() => {
    if (orgId && name && selectedValue !== name && name !== prevName.current) {
      getBankCustomerApiCall(orgId, name);
      setCustId(null);
      setDisableField(false);
      setSelectedValue("");
    }
    prevName.current = name;
  }, [name, orgId]);

  useEffect(() => {
    if (advanceAmount && Number(advanceAmount) > 0) {
      setShowTransBlock(true);
    } else {
      setShowTransBlock(false);
    }
  }, [advanceAmount]);

  return {
    loading,
    form,
    handleSubmit,
    handleSelectCustomer,
    isOpen,
    setIsOpen,
    disableField,
    customerData,
    showTransBlock,
    bookingData,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
    handleShowPdf,
  };
};
