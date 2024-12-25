import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { useDispatch } from "react-redux";
import { ChamberFormData, ChamberTableData } from "./ChamberTypes";
import { getChamberData } from "./ChamberReducer";
import {
  addChamberAPI,
  getChamberAPI,
  getChamberUnderFloorAPI,
  updateChamberAPI,
} from "./ChamberApis";

export const useChamber = () => {
  const dispatch = useDispatch();

  const [addChamberLoading, setAddChamberLoading] = useState(false);
  const [updateChamberLoading, setUpdateChamberLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<ChamberTableData | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    floorId: yup.string().required("Floor is required"),
    chamberName: yup.string().required("Chamber name is required"),
    chamberNo: yup.string().required("Chamber no. is required"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<ChamberFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      floorId: "",
      chamberName: "",
      chamberNo: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<ChamberFormData> = (values) => {
    if (orgId) {
      if (editData && Object.keys(editData).length > 0) {
        updateChamberApiCall(editData.Id, values, orgId);
      } else {
        addChamberApiCall(values, orgId);
      }
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const handleEditData = (data: ChamberTableData) => {
    setEditData(data);
    setIsOpen(true);
  };

  // Function to call the login API
  const addChamberApiCall = async (item: ChamberFormData, orgId: number) => {
    setAddChamberLoading(true);

    const data = {
      org_id: orgId,
      floor_id: item.floorId,
      chamber_name: item.chamberName,
      chamber_no: item.chamberNo,
    };

    try {
      const res: ApiResponse = await addChamberAPI(data);

      if (res.status === 200) {
        form.reset();
        setIsOpen(false);
        getChamberApiCall(orgId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddChamberLoading(false);
    }
  };

  const updateChamberApiCall = async (
    chamberId: number,
    item: ChamberFormData,
    orgId: number
  ) => {
    let data = {
      org_id: orgId,
      chamber_id: chamberId,
      floor_id: item.floorId,
      chamber_name: item.chamberName,
      chamber_no: item.chamberNo,
    };
    setUpdateChamberLoading(true);
    try {
      const res = await updateChamberAPI(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        form.reset();
        getChamberApiCall(orgId);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdateChamberLoading(false);
    }
  };

  const getChamberApiCall = async (orgId: number) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getChamberAPI(orgId);

      if (res.status === 200) {
        dispatch(getChamberData(res.data.details));
      } else {
        dispatch(getChamberData([]));
        toast.error(res.data.message || "No chamber data available");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getChamberData([]));
    } finally {
      setLoading(false);
    }
  };

  const getChamberUnderFloorApiCall = async (
    orgId: number,
    floorId: string
  ) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getChamberUnderFloorAPI(orgId, floorId);

      if (res.status === 200) {
        dispatch(getChamberData(res.data.details));
      } else {
        dispatch(getChamberData([]));
        toast.error(res.data.message || "No chamber data available");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getChamberData([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      form.reset({
        floorId: editData.Floor_Id.toString(),
        chamberName: editData.Chamber_Name,
        chamberNo: editData.Chamber_No,
      });
    } else {
      form.reset({ floorId: "", chamberName: "", chamberNo: "" });
    }
  }, [editData, form.reset]);

  useEffect(() => {
    if (editData && !isOpen) {
      setEditData(null);
    }
  }, [isOpen, editData]);

  return {
    getChamberApiCall,
    getChamberUnderFloorApiCall,
    addChamberLoading,
    updateChamberLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  };
};
