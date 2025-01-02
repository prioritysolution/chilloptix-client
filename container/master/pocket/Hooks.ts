import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { useDispatch } from "react-redux";
import { PocketFormData, PocketTableData } from "./PocketTypes";
import {
  addPocketAPI,
  getPocketAPI,
  getPocketUnderRackAPI,
  updatePocketAPI,
} from "./PocketApis";
import { getPocketData } from "./PocketReducer";

export const usePocket = () => {
  const dispatch = useDispatch();

  const [addPocketLoading, setAddPocketLoading] = useState(false);
  const [updatePocketLoading, setUpdatePocketLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<PocketTableData | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    rackId: yup.string().required("Rack is required"),
    pocketName: yup.string().required("Pocket name is required"),
    pocketNo: yup.string().required("Pocket no. is required"),
    capacity: yup
      .string()
      .required("Capacity is required")
      .test("is-integer", "Invalid capacity", (value) => {
        if (!value) return false; // Required validation already handles null/empty
        const numValue = Number(value);
        return Number.isInteger(numValue) && numValue > 0; // Validate integer and positive
      }),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<PocketFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      rackId: "",
      pocketName: "",
      pocketNo: "",
      capacity: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<PocketFormData> = (values) => {
    if (orgId) {
      if (editData && Object.keys(editData).length > 0) {
        updatePocketApiCall(editData.Id, values, orgId);
      } else {
        addPocketApiCall(values, orgId);
      }
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const handleEditData = (data: PocketTableData) => {
    setEditData(data);
    setIsOpen(true);
  };

  // Function to call the login API
  const addPocketApiCall = async (item: PocketFormData, orgId: number) => {
    setAddPocketLoading(true);

    const data = {
      org_id: orgId,
      rack_id: item.rackId,
      pocket_name: item.pocketName,
      pocket_no: item.pocketNo,
      capacity: item.capacity,
    };

    try {
      const res: ApiResponse = await addPocketAPI(data);

      if (res.status === 200) {
        form.reset();
        setIsOpen(false);
        getPocketApiCall(orgId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddPocketLoading(false);
    }
  };

  const updatePocketApiCall = async (
    pocketId: number,
    item: PocketFormData,
    orgId: number
  ) => {
    let data = {
      org_id: orgId,
      pocket_id: pocketId,
      rack_id: item.rackId,
      pocket_name: item.pocketName,
      pocket_no: item.pocketNo,
      capacity: item.capacity,
    };
    setUpdatePocketLoading(true);
    try {
      const res = await updatePocketAPI(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        form.reset();
        getPocketApiCall(orgId);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdatePocketLoading(false);
    }
  };

  // Function to call the login API
  const getPocketApiCall = async (orgId: number) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getPocketAPI(orgId);

      if (res.status === 200) {
        dispatch(getPocketData(res.data.details));
      } else {
        dispatch(getPocketData([]));
        toast.error(res.data.message || "No pocket data found");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getPocketData([]));
    } finally {
      setLoading(false);
    }
  };

  const getPocketUnderRackApiCall = async (orgId: number, rackId: string) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getPocketUnderRackAPI(orgId, rackId);

      if (res.status === 200) {
        dispatch(getPocketData(res.data.details));
      } else {
        dispatch(getPocketData([]));
        toast.error(res.data.message || "No pocket data available");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getPocketData([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      form.reset({
        rackId: editData.Rack_Id.toString() || "",
        pocketName: editData.Pocket_Name || "",
        pocketNo: editData.Pocket_No || "",
        capacity: editData.Capacity || "",
      });
    } else {
      form.reset({ rackId: "", pocketName: "", pocketNo: "", capacity: "" });
    }
  }, [editData, form.reset]);

  useEffect(() => {
    if (editData && !isOpen) {
      setEditData(null);
    }
  }, [isOpen, editData]);

  return {
    getPocketApiCall,
    getPocketUnderRackApiCall,
    addPocketLoading,
    updatePocketLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  };
};
