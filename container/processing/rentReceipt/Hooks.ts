import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { format } from "date-fns";
import {
  RentDetailsFormData,
  RentReceiptFormData,
  RentReceiptTable,
} from "./RentReceiptTypes";
import { BondSearchTableData } from "@/common/form/bondSearchForm/BondSearchTypes";
import {
  addCollectRentAPI,
  getCalculateRentAPI,
  getRentDetailsByBondNoAPI,
} from "./RentReceiptApis";

export const useRentReceipt = () => {
  const [loading, setLoading] = useState(false);
  const [getBondDetailsLoading, setGetBondDetailsLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);
  const [finId, setFinId] = useState<number | null>(null);

  const [isOpenPdf, setIsOpenPdf] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [rentReceiptTableData, setRentReceiptTableData] = useState<
    RentReceiptTable[] | []
  >([]);

  const [activeRackId, setActiveRackId] = useState<string | undefined>("");

  const [collectionDetailsTableData, setCollectionDetailsTableData] = useState<
    any[] | []
  >([]);

  const [totalAmount, setTotalAmount] = useState(0);

  const [openRentDetails, setOpenRentDetails] = useState(false);

  const [rentDate, setRentDate] = useState<string>("");

  const [rentCollectionPdfData, setRentCollectionPdfData] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
      setFinId(getCookieData<number | null>("chilloptixClientFinId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    bondNo: yup.string().required("Bond No. is required"),
    date: yup.date().required("Date is required"),
    name: yup.string().default(""),
    guardianName: yup.string().default(""),
    address: yup.string().default(""),
    advanceAmount: yup.string().default(""),
    phone: yup.string().default(""),
    transType: yup.string().default("bank"),
    bankId: yup.string().default(""),
    refVouch: yup.string().default(""),
    collectAmount: yup.string().default(""),
  });

  const rentDetailsFormSchema = yup.object({
    balanceQuantity: yup.string().default(""),
    releaseQuantity: yup
      .string()
      .required("Release quantity is required")
      .test("is-integer", "Invalid release quantity", (value) => {
        if (!value) return false; // Required validation already handles null/empty
        const numValue = Number(value);
        return Number.isInteger(numValue) && numValue > 0; // Validate integer and positive
      })
      .test(
        "is-less-than-or-equal-to-balance",
        "Release quantity must be less than or equal to balance quantity",
        function (value) {
          if (!value) return true; // Skip validation if no value

          const releaseQuantity = Number(value); // Current release quantity
          const balanceQuantity = Number(this.parent.balanceQuantity); // Access balanceQuantity from the same object

          if (isNaN(balanceQuantity)) {
            return this.createError({
              message: "Balance quantity is invalid.",
            });
          }

          return releaseQuantity <= balanceQuantity; // Validate the release quantity is <= balance quantity
        }
      ),
    basicRent: yup.string().default(""),
    insurance: yup.string().default(""),
    rmsFees: yup.string().default(""),
    dryingAmount: yup.string().default(""),
    totalAmount: yup.string().default(""),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<RentReceiptFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      bondNo: "",
      date: undefined,
      name: "",
      guardianName: "",
      address: "",
      advanceAmount: "",
      phone: "",
      transType: "cash",
      bankId: "",
      refVouch: "",
      collectAmount: "",
    },
  });

  const rentDetailsForm = useForm<RentDetailsFormData>({
    resolver: yupResolver(rentDetailsFormSchema),
    defaultValues: {
      balanceQuantity: "",
      releaseQuantity: "",
      basicRent: "",
      insurance: "",
      rmsFees: "",
      dryingAmount: "",
      totalAmount: "",
    },
  });

  const { advanceAmount } = form.watch();
  const { releaseQuantity } = rentDetailsForm.watch();

  // Handle form submission
  const handleSubmit: SubmitHandler<RentReceiptFormData> = (values) => {
    if (Number(values.collectAmount) >= 0) {
      addCollectRentApiCall(values, rentDate);
    } else {
      toast.error(
        "Total amount should be greater than or equal to advance amount",
        { duration: 3000 }
      );
    }
  };

  const handleRentDetailsSubmit: SubmitHandler<RentDetailsFormData> = (
    values
  ) => {
    if (activeRackId) {
      setCollectionDetailsTableData((prev) => [
        ...prev,
        { ...values, rackId: activeRackId },
      ]);
      setOpenRentDetails(false);
      setActiveRackId("");
    }
  };

  const handleDeleteCollection = (rackId: string) => {
    const newCollection = collectionDetailsTableData.filter(
      (data) => data.rackId !== rackId
    );
    setCollectionDetailsTableData(newCollection);
  };

  const handleOpenRentDetails = (data: RentReceiptTable) => {
    setOpenRentDetails(true);
    rentDetailsForm.setValue(
      "balanceQuantity",
      data.Pack ? data.Pack.toString() : ""
    );
    setActiveRackId(data.Rack_Id?.toString());
  };

  const handleGetRentDetailsByBondNo = () => {
    if (form.getValues("date") && form.getValues("bondNo") && orgId) {
      getRentDetailsByBondNoApiCall(
        form.getValues("date"),
        form.getValues("bondNo")
      );
      setRentDate(format(form.getValues("date"), "yyyy-MM-dd"));
      setCollectionDetailsTableData([]);
    } else {
      toast.error("Enter a valid bond no. and date");
    }
  };

  const handleSelectBond = (data: BondSearchTableData) => {
    form.setValue("bondNo", data.Bond_No.toString());
  };

  const handleShowPdf = () => {
    setShowSuccessMessage(false);
    setSuccessMessage("");
    setIsOpenPdf(true);
  };

  const addCollectRentApiCall = async (
    item: RentReceiptFormData,
    date: string
  ) => {
    setLoading(true);

    let newAdvance = item.advanceAmount ? Number(item.advanceAmount) : 0;

    const rentDetailsData = collectionDetailsTableData.map((data) => {
      const advance =
        newAdvance - Number(data.totalAmount) > 0
          ? data.totalAmount
          : newAdvance > 0
          ? newAdvance.toString()
          : "0";
      newAdvance -= Number(data.totalAmount);

      return {
        rack: data.rackId,
        qnty: data.releaseQuantity,
        basic: data.basicRent,
        insurance: data.insurance,
        rms: data.rmsFees,
        drying: data.dryingAmount,
        advance,
      };
    });

    const data = {
      org_id: orgId,
      bond_id: rentReceiptTableData[0].Id,
      rent_date: date || "",
      adv_amt: item.advanceAmount,
      tot_amount: item.collectAmount,
      fin_id: finId,
      rent_details: rentDetailsData,
      bank_id: item.transType === "bank" ? item.bankId : "",
      ref_vouch: item.refVouch,
    };

    try {
      const res: ApiResponse = await addCollectRentAPI(data);

      if (res.status === 200) {
        form.reset();
        setActiveRackId("");
        setRentReceiptTableData([]);
        setCollectionDetailsTableData([]);
        setTotalAmount(0);
        setRentDate("");
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        setRentCollectionPdfData(res.data.details[0]);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getRentDetailsByBondNoApiCall = async (date: Date, bondNo: string) => {
    setGetBondDetailsLoading(true);

    const data = {
      org_id: orgId,
      bond_id: bondNo,
      date: date ? format(date, "yyyy-MM-dd") : "",
    };

    try {
      const res: ApiResponse = await getRentDetailsByBondNoAPI(data);

      if (res.status === 200) {
        setRentReceiptTableData(res.data.details);
        form.setValue("name", res.data.details[0].Cust_Name);
        form.setValue("guardianName", res.data.details[0].Relation_Name);
        form.setValue("phone", res.data.details[0].Mobile);
        form.setValue("address", res.data.details[0].Address);
        form.setValue("advanceAmount", res.data.details[0].Adv_Paid);
      } else {
        toast.error(res.data.message);

        form.setValue("name", "");
        form.setValue("guardianName", "");
        form.setValue("phone", "");
        form.setValue("address", "");
        form.setValue("advanceAmount", "");
        setRentReceiptTableData([]);
      }
    } catch (err) {
      toast.error("Something went wrong");

      form.setValue("name", "");
      form.setValue("guardianName", "");
      form.setValue("phone", "");
      form.setValue("address", "");
      form.setValue("advanceAmount", "");
      setRentReceiptTableData([]);
    } finally {
      setGetBondDetailsLoading(false);
    }
  };

  const getCalculateRentApiCall = async (
    orgId: number | null,
    date: string,
    quantity: string
  ) => {
    setGetBondDetailsLoading(true);

    const data = {
      org_id: orgId,
      qnty: quantity,
      date: date || "",
    };

    try {
      const res: ApiResponse = await getCalculateRentAPI(data);

      if (res.status === 200) {
        rentDetailsForm.setValue(
          "basicRent",
          res.data.details.Basic_Rent.toString()
        );
        rentDetailsForm.setValue(
          "insurance",
          res.data.details.Insurance.toString()
        );
        rentDetailsForm.setValue(
          "rmsFees",
          res.data.details.Rms_Fees.toString()
        );
        rentDetailsForm.setValue(
          "dryingAmount",
          res.data.details.Drying_Amt.toString()
        );
        rentDetailsForm.setValue(
          "totalAmount",
          res.data.details.Total_Rent.toString()
        );
      } else {
        toast.error(res.data.message);

        rentDetailsForm.setValue("basicRent", "");
        rentDetailsForm.setValue("insurance", "");
        rentDetailsForm.setValue("rmsFees", "");
        rentDetailsForm.setValue("dryingAmount", "");
        rentDetailsForm.setValue("totalAmount", "");
      }
    } catch (err) {
      toast.error("Something went wrong");

      rentDetailsForm.setValue("basicRent", "");
      rentDetailsForm.setValue("insurance", "");
      rentDetailsForm.setValue("rmsFees", "");
      rentDetailsForm.setValue("dryingAmount", "");
      rentDetailsForm.setValue("totalAmount", "");
    } finally {
      setGetBondDetailsLoading(false);
    }
  };

  const prevReleaseQuantity = useRef(releaseQuantity);

  useEffect(() => {
    if (
      orgId &&
      rentDate &&
      releaseQuantity &&
      releaseQuantity !== prevReleaseQuantity.current
    ) {
      getCalculateRentApiCall(orgId, rentDate, releaseQuantity);
    } else {
      rentDetailsForm.setValue("basicRent", "");
      rentDetailsForm.setValue("insurance", "");
      rentDetailsForm.setValue("rmsFees", "");
      rentDetailsForm.setValue("dryingAmount", "");
      rentDetailsForm.setValue("totalAmount", "");
    }
    prevReleaseQuantity.current = releaseQuantity;
  }, [releaseQuantity, orgId]);

  useEffect(() => {
    if (!openRentDetails) {
      rentDetailsForm.reset();
    }
  }, [openRentDetails]);

  useEffect(() => {
    const newTotalAmount =
      collectionDetailsTableData.length > 0
        ? collectionDetailsTableData.reduce((total, item) => {
            const amount = parseFloat(item.totalAmount); // Convert string to number
            return total + (isNaN(amount) ? 0 : amount); // Add amount to total, skip if NaN
          }, 0)
        : 0;

    setTotalAmount(newTotalAmount);
  }, [collectionDetailsTableData]);

  useEffect(() => {
    const newCollectAmount =
      advanceAmount && totalAmount ? totalAmount - Number(advanceAmount) : 0;
    form.setValue("collectAmount", newCollectAmount.toString());
  }, [advanceAmount, totalAmount]);

  return {
    loading,
    getBondDetailsLoading,
    form,
    rentDetailsForm,
    handleSubmit,
    handleRentDetailsSubmit,
    handleSelectBond,
    isOpenPdf,
    setIsOpenPdf,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
    handleGetRentDetailsByBondNo,
    rentReceiptTableData,
    handleOpenRentDetails,
    openRentDetails,
    setOpenRentDetails,
    collectionDetailsTableData,
    handleDeleteCollection,
    handleShowPdf,
    rentCollectionPdfData,
  };
};
