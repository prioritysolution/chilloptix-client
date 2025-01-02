import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { useDispatch } from "react-redux";
import {
  LicenseRenewalTableData,
  LicenseRenewalFormData,
} from "./LicenseRenewalTypes";
import { getLicenseRenewalData } from "./LicenseRenewalReducer";
import {
  addLicenseRenewalAPI,
  getLicenseRenewalAPI,
  updateLicenseRenewalAPI,
} from "./LicenseRenewalApis";
import { format } from "date-fns";

export const useLicenseRenewal = () => {
  const dispatch = useDispatch();

  const [addLicenseRenewalLoading, setAddLicenseRenewalLoading] =
    useState(false);
  const [updateLicenseRenewalLoading, setUpdateLicenseRenewalLoading] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<LicenseRenewalTableData | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    validFrom: yup.date().required("Valid from is required"),
    validTo: yup.date().required("Valid to is required"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<LicenseRenewalFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      validFrom: undefined,
      validTo: undefined,
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<LicenseRenewalFormData> = (values) => {
    if (orgId) {
      if (editData && Object.keys(editData).length > 0) {
        updateLicenseRenewalApiCall(editData.Id, values, orgId);
      } else {
        addLicenseRenewalApiCall(values, orgId);
      }
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const handleEditData = (data: LicenseRenewalTableData) => {
    setEditData(data);
    setIsOpen(true);
  };

  // Function to call the login API
  const addLicenseRenewalApiCall = async (
    item: LicenseRenewalFormData,
    orgId: number
  ) => {
    setAddLicenseRenewalLoading(true);

    const data = {
      org_id: orgId,
      form_date: item.validFrom ? format(item.validFrom, "yyyy-MM-dd") : "",
      till_date: item.validTo ? format(item.validTo, "yyyy-MM-dd") : "",
    };

    try {
      const res: ApiResponse = await addLicenseRenewalAPI(data);

      if (res.status === 200) {
        form.reset();
        setIsOpen(false);
        getLicenseRenewalApiCall(orgId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddLicenseRenewalLoading(false);
    }
  };

  const updateLicenseRenewalApiCall = async (
    renId: number,
    item: LicenseRenewalFormData,
    orgId: number
  ) => {
    let data = {
      org_id: orgId,
      ren_id: renId,
      form_date: item.validFrom ? format(item.validFrom, "yyyy-MM-dd") : "",
      till_date: item.validTo ? format(item.validTo, "yyyy-MM-dd") : "",
    };
    setUpdateLicenseRenewalLoading(true);
    try {
      const res = await updateLicenseRenewalAPI(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        form.reset();
        getLicenseRenewalApiCall(orgId);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdateLicenseRenewalLoading(false);
    }
  };

  // Function to call the login API
  const getLicenseRenewalApiCall = async (orgId: number) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getLicenseRenewalAPI(orgId);

      if (res.status === 200) {
        dispatch(getLicenseRenewalData(res.data.details));
      } else {
        dispatch(getLicenseRenewalData([]));
        toast.error(res.data.message || "No license renewal data available");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getLicenseRenewalData([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      form.reset({
        validFrom: editData.Valid_Frm
          ? new Date(editData.Valid_Frm)
          : undefined,
        validTo: editData.Valid_Till
          ? new Date(editData.Valid_Till)
          : undefined,
      });
    } else {
      form.reset({ validFrom: undefined, validTo: undefined });
    }
  }, [editData, form.reset]);

  useEffect(() => {
    if (editData && !isOpen) {
      setEditData(null);
    }
  }, [isOpen, editData]);

  return {
    getLicenseRenewalApiCall,
    addLicenseRenewalLoading,
    updateLicenseRenewalLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  };
};
