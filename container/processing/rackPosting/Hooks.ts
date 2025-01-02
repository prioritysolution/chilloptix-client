import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { format } from "date-fns";
import { BondListData, RackPostingFormData } from "./RackPostingTypes";
import {
  addRackPostingAPI,
  getRackBondListByBookingNoAPI,
  getRackDetailsByBondNoAPI,
} from "./RackPostingApis";
import { FloorTableData } from "@/container/master/floor/FloorTypes";
import { ChamberTableData } from "@/container/master/chamber/ChamberTypes";
import { RackTableData } from "@/container/master/rack/RackTypes";
import { PocketTableData } from "@/container/master/pocket/PocketTypes";
import { useSelector } from "react-redux";
import { BookingSearchTableData } from "@/common/form/bookingSearchForm/BookingSearchTypes";

interface FloorState {
  floorData: FloorTableData[];
}

interface ChamberState {
  chamberData: ChamberTableData[];
}

interface RackState {
  rackData: RackTableData[];
}

interface PocketState {
  pocketData: PocketTableData[];
}

interface RootState {
  floor: FloorState;
  chamber: ChamberState;
  rack: RackState;
  pocket: PocketState;
}

export const useRackPosting = () => {
  const floorData: FloorTableData[] = useSelector(
    (state: RootState) => state?.floor?.floorData
  );

  const chamberData: ChamberTableData[] = useSelector(
    (state: RootState) => state?.chamber?.chamberData
  );

  const rackData: RackTableData[] = useSelector(
    (state: RootState) => state?.rack?.rackData
  );

  const pocketData: PocketTableData[] = useSelector(
    (state: RootState) => state?.pocket?.pocketData
  );

  const [loading, setLoading] = useState(false);
  const [getBondListLoading, setGetBondListLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [bondListData, setBondListData] = useState<BondListData[]>([]);

  const [rackPostingTableData, setRackPostingTableData] = useState<any[] | []>(
    []
  );

  const [totalPack, setTotalPack] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    bookingNo: yup.string().required("Booking No. is required"),
    bondId: yup.string().required("Bond is required"),
    issueDate: yup.string().default(""),
    name: yup.string().default(""),
    guardianName: yup.string().default(""),
    address: yup.string().default(""),
    bondQuantity: yup.string().default(""),
    bondPack: yup.string().default(""),
    date: yup.date().required("Date is required"),
    floorId: yup.string().required("Floor is required"),
    chamberId: yup.string().required("Chamber is required"),
    rackId: yup.string().required("Rack is required"),
    pocketId: yup.string().required("Pocket is required"),
    positionId: yup.string().required("Position is required"),
    pack: yup
      .string()
      .required("Pack is required")
      .test("is-positive-integer", "Invalid pack", (value) => {
        if (!value) return false; // Required validation already handles null/empty
        const numValue = Number(value);
        return Number.isInteger(numValue) && numValue > 0; // Check for positive integer
      })
      .test("equal-to-bond-pack", function (value) {
        if (!value) return true; // Skip validation if no value

        const pack = Number(value); // Current pack value being validated
        const bondId = this.parent.bondId; // Current bondId in the form
        const bondPack = this.parent.bondPack
          ? Number(this.parent.bondPack)
          : 0;

        // Find the total bond pack for the current bondId
        const bondData = totalPack.find((pack) => pack.bondId === bondId);

        let totalBondPack = 0;

        if (bondData) {
          totalBondPack = bondData.totalPack;
        }

        // Validate numbers
        if (isNaN(pack) || isNaN(totalBondPack) || isNaN(bondPack)) {
          return this.createError({
            message: `Invalid value for Bond ID ${bondId}.`,
          });
        }

        // Check if the pack + totalBondPack is <= bondPack
        if (pack + totalBondPack > bondPack) {
          return this.createError({
            message: `For this Bond ID, the total pack must not exceed the bond pack (${bondPack}).`,
          });
        }

        return true; // Validation passed
      }),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<RackPostingFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      bookingNo: "",
      bondId: "",
      issueDate: "",
      name: "",
      guardianName: "",
      address: "",
      bondQuantity: "",
      bondPack: "",
      floorId: "",
      chamberId: "",
      rackId: "",
      pocketId: "",
      positionId: "",
      pack: "",
    },
  });

  const { bondId, floorId, chamberId, rackId, bondPack } = form.watch();

  // Handle form submission
  const handleSubmit: SubmitHandler<RackPostingFormData> = (values) => {
    setRackPostingTableData((prev) => [
      ...prev,
      {
        ...values,
        floorName:
          floorData.length > 0
            ? floorData.find((floor) => floor.Id.toString() === values.floorId)
                ?.Floor_Name
            : "",
        chamberName:
          chamberData.length > 0
            ? chamberData.find(
                (chamber) => chamber.Id.toString() === values.chamberId
              )?.Chamber_Name
            : "",
        rackName:
          rackData.length > 0
            ? rackData.find((rack) => rack.Id.toString() === values.rackId)
                ?.Rack_Name
            : "",
        pocketName:
          pocketData.length > 0
            ? pocketData.find(
                (pocket) => pocket.Id.toString() === values.pocketId
              )?.Pocket_Name
            : "",
        bondNo: bondListData.find(
          (bond) => bond.Id.toString() === values.bondId
        )?.Bond_No,
      },
    ]);

    form.reset({
      ...values,
      floorId: "",
      chamberId: "",
      rackId: "",
      pocketId: "",
      positionId: "",
      pack: "", // Retain existing values for all fields
    });
  };

  const handleDeleteFromTable = (idx: number) => {
    setRackPostingTableData(
      rackPostingTableData.filter((_, index) => index !== idx)
    );
  };

  const handleAddRackPosting = () => {
    if (orgId && bondPack && rackPostingTableData.length > 0) {
      const isValid = rackPostingTableData.every((item) => {
        const correspondingPack = totalPack.find(
          (pack) => pack.bondId === item.bondId
        );
        return (
          correspondingPack &&
          Number(item.bondPack) === correspondingPack.totalPack
        );
      });

      if (isValid) {
        addRackPostingApiCall(orgId);
      } else {
        toast.error("Bond quantity must equal to total pack for every bond.");
      }
    }
  };

  const handleGetBondListByBookingNo = () => {
    if (form.getValues("bookingNo") && orgId) {
      getRackBondListByBookingNoApiCall(orgId, form.getValues("bookingNo"));
    } else {
      toast.error("Enter a valid bond no.");
    }
  };

  const handleSelectBooking = (data: BookingSearchTableData) => {
    form.setValue("bookingNo", data.Book_No.toString());
  };

  const addRackPostingApiCall = async (orgId: number) => {
    setLoading(true);

    let rackPostingData = rackPostingTableData.map((data) => ({
      floor: data.floorId,
      chamber: data.chamberId,
      rack: data.rackId,
      pocket: data.pocketId,
      no_pack: data.pack,
      bond_id: data.bondId,
      position: data.positionId,
    }));

    const data = {
      org_id: orgId,
      post_date: format(form.getValues("date"), "yyyy-MM-dd"),
      rack_details: rackPostingData,
    };

    try {
      const res: ApiResponse = await addRackPostingAPI(data);

      if (res.status === 200) {
        form.reset({
          bookingNo: "",
          issueDate: "",
          name: "",
          guardianName: "",
          address: "",
          bondQuantity: "",
          bondPack: "",
          floorId: "",
          chamberId: "",
          rackId: "",
          pocketId: "",
          positionId: "",
          pack: "",
        });
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        setRackPostingTableData([]);
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

  const getRackBondListByBookingNoApiCall = async (
    orgId: number,
    bookNo: string
  ) => {
    setGetBondListLoading(true);

    try {
      const res: ApiResponse = await getRackBondListByBookingNoAPI(
        orgId,
        bookNo
      );

      if (res.status === 200) {
        setBondListData(res.data.details);
      } else {
        toast.error(res.data.message);
        setBondListData([]);
      }
    } catch (err) {
      toast.error("Something went wrong");

      setBondListData([]);
    } finally {
      setGetBondListLoading(false);
    }
  };

  const getRackDetailsByBondNoApiCall = async (
    orgId: number,
    bondNo: string
  ) => {
    setGetBondListLoading(true);

    try {
      const res: ApiResponse = await getRackDetailsByBondNoAPI(orgId, bondNo);

      if (res.status === 200) {
        form.setValue(
          "issueDate",
          res.data.details[0].Issue_Date
            ? format(res.data.details[0].Issue_Date, "dd-MM-yyyy")
            : ""
        );
        form.setValue("name", res.data.details[0].Cust_Name);
        form.setValue("guardianName", res.data.details[0].Relation_Name);
        form.setValue("address", res.data.details[0].Address);
        form.setValue("bondQuantity", res.data.details[0].Issue_Qnty);
        form.setValue("bondPack", res.data.details[0].Issue_Pack);
      } else {
        toast.error(res.data.message);
        form.setValue("issueDate", "");
        form.setValue("name", "");
        form.setValue("guardianName", "");
        form.setValue("address", "");
        form.setValue("bondQuantity", "");
        form.setValue("bondPack", "");
        setBondListData([]);
      }
    } catch (err) {
      toast.error("Something went wrong");
      form.setValue("issueDate", "");
      form.setValue("name", "");
      form.setValue("guardianName", "");
      form.setValue("address", "");
      form.setValue("bondQuantity", "");
      form.setValue("bondPack", "");
    } finally {
      setGetBondListLoading(false);
    }
  };

  useEffect(() => {
    if (!rackPostingTableData) {
      setTotalPack([]);
      return;
    }

    const groupedTotals = rackPostingTableData.reduce((acc, item) => {
      const bondId = item.bondId; // Extract bondId
      const pack = Number(item.pack); // Convert pack to number

      if (!acc[bondId]) {
        acc[bondId] = { bondId, totalPack: 0 }; // Initialize if not present
      }

      acc[bondId].totalPack += isNaN(pack) ? 0 : pack; // Add to totalPack, skip if NaN

      return acc;
    }, {});

    // Convert the object to an array of totals
    const totalPackArray = Object.values(groupedTotals);

    setTotalPack(totalPackArray);
  }, [rackPostingTableData]);

  useEffect(() => {
    if (orgId && bondId) {
      getRackDetailsByBondNoApiCall(orgId, bondId);
    }
  }, [orgId, bondId]);

  return {
    loading,
    getBondListLoading,
    form,
    handleSubmit,
    handleSelectBooking,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
    handleGetBondListByBookingNo,
    rackPostingTableData,
    handleDeleteFromTable,
    handleAddRackPosting,
    floorId,
    chamberId,
    rackId,
    totalPack,
    bondListData,
  };
};
