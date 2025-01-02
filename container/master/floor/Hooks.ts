import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import { FloorFormData, FloorTableData } from "./FloorTypes";
import { addFloorAPI, getFloorAPI, updateFloorAPI } from "./FloorApis";
import getCookieData from "@/utils/getCookieData";
import { useDispatch } from "react-redux";
import { getFloorData } from "./FloorReducer";

export const useFloor = () => {
  const dispatch = useDispatch();

  const [addFloorLoading, setAddFloorLoading] = useState(false);
  const [updateFloorLoading, setUpdateFloorLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<FloorTableData | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    floorName: yup.string().required("Floor name is required"),
    floorNo: yup.string().required("Floor no. is required"),
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
  const form = useForm<FloorFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      floorName: "",
      floorNo: "",
      capacity: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<FloorFormData> = (values) => {
    if (orgId) {
      if (editData && Object.keys(editData).length > 0) {
        updateFloorApiCall(editData.Id, values, orgId);
      } else {
        addFloorApiCall(values, orgId);
      }
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const handleEditData = (data: FloorTableData) => {
    setEditData(data);
    setIsOpen(true);
  };

  // Function to call the login API
  const addFloorApiCall = async (item: FloorFormData, orgId: number) => {
    setAddFloorLoading(true);

    const data = {
      org_id: orgId,
      floor_name: item.floorName,
      floor_no: item.floorNo,
      capacity: item.capacity,
    };

    try {
      const res: ApiResponse = await addFloorAPI(data);

      if (res.status === 200) {
        form.reset();
        setIsOpen(false);
        getFloorApiCall(orgId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddFloorLoading(false);
    }
  };

  const updateFloorApiCall = async (
    floorId: number,
    item: FloorFormData,
    orgId: number
  ) => {
    let data = {
      org_id: orgId,
      floor_id: floorId,
      floor_name: item.floorName,
      floor_no: item.floorNo,
      capacity: item.capacity,
    };
    setUpdateFloorLoading(true);
    try {
      const res = await updateFloorAPI(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        form.reset();
        getFloorApiCall(orgId);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdateFloorLoading(false);
    }
  };

  // Function to call the login API
  const getFloorApiCall = async (orgId: number) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getFloorAPI(orgId);

      if (res.status === 200) {
        dispatch(getFloorData(res.data.details));
      } else {
        dispatch(getFloorData([]));
        toast.error(res.data.message || "No floor data available");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getFloorData([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      form.reset({
        floorName: editData.Floor_Name || "",
        floorNo: editData.Floor_No || "",
        capacity: editData.Capacity || "",
      });
    } else {
      form.reset({ floorName: "", floorNo: "", capacity: "" });
    }
  }, [editData, form.reset]);

  useEffect(() => {
    if (editData && !isOpen) {
      setEditData(null);
    }
  }, [isOpen, editData]);

  return {
    getFloorApiCall,
    addFloorLoading,
    updateFloorLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  };
};
