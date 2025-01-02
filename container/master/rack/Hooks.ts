import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { useDispatch } from "react-redux";
import { RackFormData, RackTableData } from "./RackTypes";
import {
  addRackAPI,
  getRackAPI,
  getRackUnderChamberAPI,
  updateRackAPI,
} from "./RackApis";
import { getRackData } from "./RackReducer";

export const useRack = () => {
  const dispatch = useDispatch();

  const [addRackLoading, setAddRackLoading] = useState(false);
  const [updateRackLoading, setUpdateRackLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<RackTableData | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    floorId: yup.string().required("Floor is required"),
    chamberId: yup.string().required("Chamber is required"),
    rackName: yup.string().required("Rack name is required"),
    rackNo: yup.string().required("Rack no. is required"),
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
  const form = useForm<RackFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      floorId: "",
      chamberId: "",
      rackName: "",
      rackNo: "",
      capacity: "",
    },
  });

  const { floorId } = form.watch();

  // Handle form submission
  const handleSubmit: SubmitHandler<RackFormData> = (values) => {
    if (orgId) {
      if (editData && Object.keys(editData).length > 0) {
        updateRackApiCall(editData.Id, values, orgId);
      } else {
        addRackApiCall(values, orgId);
      }
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const handleEditData = (data: RackTableData) => {
    setEditData(data);
    setIsOpen(true);
  };

  // Function to call the login API
  const addRackApiCall = async (item: RackFormData, orgId: number) => {
    setAddRackLoading(true);

    const data = {
      org_id: orgId,
      floor_id: item.floorId,
      chamber_id: item.chamberId,
      rack_name: item.rackName,
      rack_no: item.rackNo,
      capacity: item.capacity,
    };

    try {
      const res: ApiResponse = await addRackAPI(data);

      if (res.status === 200) {
        form.reset();
        setIsOpen(false);
        getRackApiCall(orgId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddRackLoading(false);
    }
  };

  const updateRackApiCall = async (
    rackId: number,
    item: RackFormData,
    orgId: number
  ) => {
    let data = {
      org_id: orgId,
      rack_id: rackId,
      floor_id: item.floorId,
      chamber_id: item.chamberId,
      rack_name: item.rackName,
      rack_no: item.rackNo,
      capacity: item.capacity,
    };
    setUpdateRackLoading(true);
    try {
      const res = await updateRackAPI(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        form.reset();
        getRackApiCall(orgId);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdateRackLoading(false);
    }
  };

  // Function to call the login API
  const getRackApiCall = async (orgId: number) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getRackAPI(orgId);

      if (res.status === 200) {
        dispatch(getRackData(res.data.details));
      } else {
        dispatch(getRackData([]));
        toast.error(res.data.message || "No rack data found");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getRackData([]));
    } finally {
      setLoading(false);
    }
  };

  const getRackUnderChamberApiCall = async (
    orgId: number,
    chamberId: string
  ) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getRackUnderChamberAPI(orgId, chamberId);

      if (res.status === 200) {
        dispatch(getRackData(res.data.details));
      } else {
        dispatch(getRackData([]));
        toast.error(res.data.message || "No rack data available");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getRackData([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      form.reset({
        floorId: editData.Floor_Id.toString() || "",
        chamberId: editData.Chamber_Id.toString() || "",
        rackName: editData.Rack_Name || "",
        rackNo: editData.Rack_No || "",
        capacity: editData.Capacity || "",
      });
    } else {
      form.reset({
        floorId: "",
        chamberId: "",
        rackName: "",
        rackNo: "",
        capacity: "",
      });
    }
  }, [editData, form.reset]);

  useEffect(() => {
    if (editData && !isOpen) {
      setEditData(null);
    }
  }, [isOpen, editData]);

  return {
    getRackApiCall,
    getRackUnderChamberApiCall,
    addRackLoading,
    updateRackLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
    floorId,
  };
};
