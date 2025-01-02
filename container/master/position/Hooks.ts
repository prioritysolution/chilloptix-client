import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import { PositionFormData, PositionTableData } from "./PositionTypes";
import {
  addPositionAPI,
  getPositionAPI,
  updatePositionAPI,
} from "./PositionApis";
import getCookieData from "@/utils/getCookieData";
import { useDispatch } from "react-redux";
import { getPositionData } from "./PositionReducer";

export const usePosition = () => {
  const dispatch = useDispatch();

  const [addPositionLoading, setAddPositionLoading] = useState(false);
  const [updatePositionLoading, setUpdatePositionLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<PositionTableData | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    name: yup.string().required("Position name is required"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<PositionFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<PositionFormData> = (values) => {
    if (orgId) {
      if (editData && Object.keys(editData).length > 0) {
        updatePositionApiCall(editData.Id, values, orgId);
      } else {
        addPositionApiCall(values, orgId);
      }
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const handleEditData = (data: PositionTableData) => {
    setEditData(data);
    setIsOpen(true);
  };

  // Function to call the login API
  const addPositionApiCall = async (item: PositionFormData, orgId: number) => {
    setAddPositionLoading(true);

    const data = {
      org_id: orgId,
      position_name: item.name,
    };

    try {
      const res: ApiResponse = await addPositionAPI(data);

      if (res.status === 200) {
        form.reset();
        setIsOpen(false);
        getPositionApiCall(orgId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddPositionLoading(false);
    }
  };

  const updatePositionApiCall = async (
    positionId: number,
    item: PositionFormData,
    orgId: number
  ) => {
    let data = {
      org_id: orgId,
      position_id: positionId,
      position_name: item.name,
    };
    setUpdatePositionLoading(true);
    try {
      const res = await updatePositionAPI(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        form.reset();
        getPositionApiCall(orgId);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdatePositionLoading(false);
    }
  };

  // Function to call the login API
  const getPositionApiCall = async (orgId: number) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getPositionAPI(orgId);

      if (res.status === 200) {
        dispatch(getPositionData(res.data.details));
      } else {
        dispatch(getPositionData([]));
        toast.error(res.data.message || "No position data available");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getPositionData([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      form.reset({
        name: editData.Position_Name || "",
      });
    } else {
      form.reset({ name: "" });
    }
  }, [editData, form.reset]);

  useEffect(() => {
    if (editData && !isOpen) {
      setEditData(null);
    }
  }, [isOpen, editData]);

  return {
    getPositionApiCall,
    addPositionLoading,
    updatePositionLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  };
};
