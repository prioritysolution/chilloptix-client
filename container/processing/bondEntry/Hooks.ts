import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { format } from "date-fns";
import { BookingSearchTableData } from "@/common/form/bookingSearchForm/BookingSearchTypes";
import { BondEntryFormData } from "./BondEntryTypes";
import { addBondEntryAPI, getBookingDataByBookingNoAPI } from "./BondEntryApis";
import { decimalRegex } from "@/utils/validationRegex";

export const useBondEntry = () => {
  const [loading, setLoading] = useState(false);
  const [getBookingDetailsLoading, setGetBookingDetailsLoading] =
    useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);
  const [finId, setFinId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [bookingData, setBookingData] = useState<any>(null);

  const [bondTableData, setBondTableData] = useState<BondEntryFormData[] | []>(
    []
  );

  const [bondPdfData, setBondPdfData] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
      setFinId(getCookieData<number | null>("chilloptixClientFinId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    bookingNo: yup.string().required("Booking No. is required"),
    name: yup.string().default(""),
    address: yup.string().default(""),
    bookingDate: yup.string().default(""),
    bookingValid: yup.string().default(""),
    bookingQuantity: yup.string().default(""),
    date: yup.date().required("Date is required"),
    noOfPackages: yup
      .string()
      .required("No of packages is required") // Ensure the field is mandatory
      .test("is-valid-number", "Invalid no. of packages", (value) => {
        if (!value) return false; // Required validation already ensures value is not null or empty
        const numberValue = parseInt(value, 10); // Convert to integer
        return Number.isInteger(numberValue) && numberValue > 0; // Ensure it's a non-decimal number greater than 0
      }),
    netWeight: yup
      .string()
      .required("Net weight is required")
      .test("is-valid-number", "Net weight is invalid", (value) => {
        if (value === "" || value === null) return true; // Allow empty or null values
        return decimalRegex.test(value); // Validate that it matches the number format with up to two decimals
      })
      .test(
        "is-greater-than-zero",
        "Net weight must be greater than 0",
        (value) => {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          return numValue > 0; // Ensure the number is greater than 0 if provided
        }
      ),
    verified: yup.string().default(""),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<BondEntryFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      bookingNo: "",
      name: "",
      address: "",
      bookingDate: "",
      bookingValid: "",
      bookingQuantity: "",
      noOfPackages: "",
      netWeight: "",
      verified: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<BondEntryFormData> = (values) => {
    setBondTableData((prev) => [...prev, { ...values }]);

    form.reset({
      ...values, // Retain existing values for all fields
      noOfPackages: "", // Reset noOfPackages
      netWeight: "", // Reset netWeight
      verified: "",
    });
  };

  const handleDeleteFromTable = (idx: number) => {
    setBondTableData(bondTableData.filter((_, index) => index !== idx));
  };

  const handleAddBondEntry = () => {
    if (orgId && finId && bondTableData.length > 0) {
      addBondEntryApiCall(orgId, finId);
    }
  };

  const handleGetBookingDataByBookingNo = () => {
    if (form.getValues("bookingNo") && orgId) {
      getBookingDataByBookingNoApiCall(orgId, form.getValues("bookingNo"));
    } else {
      toast.error("Enter a valid booking no.");
    }
  };

  const handleSelectBooking = (data: BookingSearchTableData) => {
    form.setValue("bookingNo", data.Book_No.toString());
  };

  const handleShowPdf = () => {
    setShowSuccessMessage(false);
    setSuccessMessage("");
    setIsOpen(true);
  };

  // Function to call the login API
  const addBondEntryApiCall = async (orgId: number, finId: number) => {
    setLoading(true);

    let bondData = bondTableData.map((data) => ({
      bond_qnty: data.netWeight,
      bond_pack: data.noOfPackages,
      verified: data.verified,
    }));

    const data = {
      org_id: orgId,
      book_id: bookingData.Id,
      bond_date: format(form.getValues("date"), "yyyy-MM-dd"),
      bond_data: bondData,
      fin_id: finId,
    };

    try {
      const res: ApiResponse = await addBondEntryAPI(data);

      if (res.status === 200) {
        form.reset({
          bookingNo: "",
          name: "",
          address: "",
          bookingDate: "",
          bookingValid: "",
          bookingQuantity: "",
          noOfPackages: "",
          netWeight: "",
          verified: "",
        });
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        setBondTableData([]);
        setBondPdfData(res.data.details);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        setSuccessMessage("");
        setShowSuccessMessage(false);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setSuccessMessage("");
      setShowSuccessMessage(false);
    } finally {
      setLoading(false);
    }
  };

  const getBookingDataByBookingNoApiCall = async (
    orgId: number,
    bookNo: string
  ) => {
    setGetBookingDetailsLoading(true);

    try {
      const res: ApiResponse = await getBookingDataByBookingNoAPI(
        orgId,
        bookNo
      );

      if (res.status === 200) {
        setBookingData(res.data.details[0]);
        form.setValue("name", res.data.details[0].Cust_Name);
        form.setValue("address", res.data.details[0].Address);
        form.setValue(
          "bookingDate",
          res.data.details[0].Bok_Date
            ? format(res.data.details[0].Bok_Date, "dd-MM-yyyy")
            : ""
        );
        form.setValue(
          "bookingValid",
          res.data.details[0].Valid_Till
            ? format(res.data.details[0].Valid_Till, "dd-MM-yyyy")
            : ""
        );
        form.setValue("bookingQuantity", res.data.details[0].Book_Qnty);
      } else {
        toast.error(res.data.message);
        form.setValue("name", "");
        form.setValue("address", "");
        form.setValue("bookingDate", "");
        form.setValue("bookingValid", "");
        form.setValue("bookingQuantity", "");
        setBookingData(null);
      }
    } catch (err) {
      toast.error("Something went wrong");
      form.setValue("name", "");
      form.setValue("address", "");
      form.setValue("bookingDate", "");
      form.setValue("bookingValid", "");
      form.setValue("bookingQuantity", "");
      setBookingData(null);
    } finally {
      setGetBookingDetailsLoading(false);
    }
  };

  return {
    loading,
    getBookingDetailsLoading,
    form,
    handleSubmit,
    handleSelectBooking,
    isOpen,
    setIsOpen,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
    bondPdfData,
    handleShowPdf,
    handleGetBookingDataByBookingNo,
    bondTableData,
    handleDeleteFromTable,
    handleAddBondEntry,
  };
};
