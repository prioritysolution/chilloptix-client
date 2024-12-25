import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { format } from "date-fns";
import { RackPostingFormData } from "./RackPostingTypes";
import { BondSearchTableData } from "@/common/form/bondSearchForm/BondSearchTypes";
import { addRackPostingAPI, getBondDataByBondNoAPI } from "./RackPostingApis";
import { FloorTableData } from "@/container/master/floor/FloorTypes";
import { ChamberTableData } from "@/container/master/chamber/ChamberTypes";
import { RackTableData } from "@/container/master/rack/RackTypes";
import { PocketTableData } from "@/container/master/pocket/PocketTypes";
import { useSelector } from "react-redux";

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
  const [getBondDetailsLoading, setGetBondDetailsLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [bondData, setBondData] = useState<any>(null);

  const [rackPostingTableData, setRackPostingTableData] = useState<any[] | []>(
    []
  );

  const [totalPack, setTotalPack] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    bondNo: yup.string().required("Bond No. is required"),
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
    pack: yup
      .string()
      .required("Pack is required")
      .test("is-positive-integer", "Invalid pack", (value) => {
        if (!value) return false; // Required validation already handles null/empty
        const numValue = Number(value);
        return Number.isInteger(numValue) && numValue > 0; // Check for positive integer
      })
      .test(
        "equal-to-bond-pack",
        "Total pack must be equal to bond pack",
        function (value) {
          if (!value) return true; // Skip validation if no value

          const pack = Number(value);
          const bondPack = this.parent.bondPack
            ? Number(this.parent.bondPack)
            : 0;

          if (isNaN(pack) || isNaN(totalPack) || isNaN(bondPack)) {
            return false; // Invalid if any of the values are not numbers
          }

          return pack + totalPack <= bondPack;
        }
      ),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<RackPostingFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      bondNo: "",
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
      pack: "",
    },
  });

  const { floorId, chamberId, rackId, bondPack } = form.watch();

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
      },
    ]);

    form.reset({
      ...values,
      floorId: "",
      chamberId: "",
      rackId: "",
      pocketId: "",
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
      if (Number(bondPack) === totalPack) {
        addRackPostingApiCall(orgId);
      } else {
        toast.error("Bond quantity must equal to total pack");
      }
    }
  };

  const handleGetBondDataByBondNo = () => {
    if (form.getValues("bondNo") && orgId) {
      getBondDataByBondNoApiCall(orgId, form.getValues("bondNo"));
    } else {
      toast.error("Enter a valid bond no.");
    }
  };

  const handleSelectBond = (data: BondSearchTableData) => {
    form.setValue("bondNo", data.Bond_No.toString());
  };

  const addRackPostingApiCall = async (orgId: number) => {
    setLoading(true);

    let rackPostingData = rackPostingTableData.map((data) => ({
      floor: data.floorId,
      chamber: data.chamberId,
      rack: data.rackId,
      pocket: data.pocketId,
      no_pack: data.pack,
    }));

    const data = {
      org_id: orgId,
      bond_id: bondData.Id,
      post_date: format(form.getValues("date"), "yyyy-MM-dd"),
      rack_details: rackPostingData,
    };

    try {
      const res: ApiResponse = await addRackPostingAPI(data);

      if (res.status === 200) {
        form.reset({
          bondNo: "",
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

  const getBondDataByBondNoApiCall = async (orgId: number, bookNo: string) => {
    setGetBondDetailsLoading(true);

    try {
      const res: ApiResponse = await getBondDataByBondNoAPI(orgId, bookNo);

      if (res.status === 200) {
        setBondData(res.data.details[0]);
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
        setBondData(null);
      }
    } catch (err) {
      toast.error("Something went wrong");
      form.setValue("issueDate", "");
      form.setValue("name", "");
      form.setValue("guardianName", "");
      form.setValue("address", "");
      form.setValue("bondQuantity", "");
      form.setValue("bondPack", "");
      setBondData(null);
    } finally {
      setGetBondDetailsLoading(false);
    }
  };

  useEffect(() => {
    const newTotalPack = rackPostingTableData
      ? rackPostingTableData.reduce((total, item) => {
          const pack = Number(item.pack); // Convert string to number
          return total + (isNaN(pack) ? 0 : pack); // Add to total, skip if NaN
        }, 0)
      : 0;

    setTotalPack(newTotalPack);
  }, [rackPostingTableData]);

  return {
    loading,
    getBondDetailsLoading,
    form,
    handleSubmit,
    handleSelectBond,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
    handleGetBondDataByBondNo,
    rackPostingTableData,
    handleDeleteFromTable,
    handleAddRackPosting,
    floorId,
    chamberId,
    rackId,
    totalPack,
  };
};
