import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { useDispatch } from "react-redux";
import { AgentFormData, AgentTableData } from "./AgentTypes";
import { getAgentData } from "./AgentReducer";
import { decimalRegex } from "@/utils/validationRegex";
import { addAgentAPI, getAgentAPI, updateAgentAPI } from "./AgentApis";

export const useAgent = () => {
  const dispatch = useDispatch();

  const [addAgentLoading, setAddAgentLoading] = useState(false);
  const [updateAgentLoading, setUpdateAgentLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<AgentTableData | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    agentName: yup.string().required("Agent name is required"),
    gurdianName: yup.string().required("Gurdian name is required"),
    address: yup.string().required("Adderss is required"),
    mobile: yup.string().required("Mobile is required"),
    email: yup.string().email("Invalid email").default(""),
    amount: yup
      .string()
      .default("")
      .test("is-valid-number", "Deposit amount is invalid", (value) => {
        if (value === "" || value === null) return true; // Allow empty or null values
        return decimalRegex.test(value); // Validate that it matches the number format with up to two decimals
      })
      .test(
        "is-greater-than-zero",
        "Deposit amount must be greater than 0",
        (value) => {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          return numValue > 0; // Ensure the number is greater than 0 if provided
        }
      ),
    commissionType: yup
      .string()
      .required("Commission type is required") // Ensure it is required
      .test(
        "is-valid-commission-type",
        "Commission type is invalid",
        (value) => {
          // Return true only if the value is valid
          return value === "0" || value === "1" || value === "";
        }
      ),
    commissionRate: yup
      .string()
      .default("")
      .test("is-valid-number", "Commission rate is invalid", (value) => {
        if (value === "" || value === null) return true; // Allow empty or null values
        return decimalRegex.test(value); // Validate that it matches the number format with up to two decimals
      })
      .test(
        "is-greater-than-zero",
        "Commission rate must be greater than 0",
        (value) => {
          if (value === "" || value === null) return true; // Allow empty or null values
          const numValue = parseFloat(value);
          return numValue > 0; // Ensure the number is greater than 0 if provided
        }
      ),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<AgentFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      agentName: "",
      gurdianName: "",
      address: "",
      mobile: "",
      email: "",
      amount: "",
      commissionType: "",
      commissionRate: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<AgentFormData> = (values) => {
    if (orgId) {
      if (editData && Object.keys(editData).length > 0) {
        updateAgentApiCall(editData.Id, values, orgId);
      } else {
        addAgentApiCall(values, orgId);
      }
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const handleEditData = (data: AgentTableData) => {
    setEditData(data);
    setIsOpen(true);
  };

  // Function to call the login API
  const addAgentApiCall = async (item: AgentFormData, orgId: number) => {
    setAddAgentLoading(true);

    const data = {
      org_id: orgId,
      agent_name: item.agentName,
      agent_rel: item.gurdianName,
      agent_add: item.address,
      agent_mob: item.mobile,
      percent: item.commissionType,
      comm_rate: item.commissionRate,
      agent_mail: item.email,
      dep_amt: item.amount,
    };

    try {
      const res: ApiResponse = await addAgentAPI(data);

      if (res.status === 200) {
        form.reset();
        setIsOpen(false);
        getAgentApiCall(orgId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddAgentLoading(false);
    }
  };

  const updateAgentApiCall = async (
    agentId: number,
    item: AgentFormData,
    orgId: number
  ) => {
    let data = {
      org_id: orgId,
      agent_id: agentId,
      agent_name: item.agentName,
      agent_rel: item.gurdianName,
      agent_add: item.address,
      agent_mob: item.mobile,
      percent: item.commissionType,
      comm_rate: item.commissionRate,
      agent_mail: item.email,
      dep_amt: item.amount,
    };
    setUpdateAgentLoading(true);
    try {
      const res = await updateAgentAPI(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        form.reset();
        getAgentApiCall(orgId);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdateAgentLoading(false);
    }
  };

  // Function to call the login API
  const getAgentApiCall = async (orgId: number) => {
    setLoading(true);

    try {
      const res: ApiResponse = await getAgentAPI(orgId);

      if (res.status === 200) {
        dispatch(getAgentData(res.data.details));
      } else {
        dispatch(getAgentData([]));
        toast.error(res.data.message || "No agent data found");
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getAgentData([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      form.reset({
        agentName: editData.Agent_Name,
        gurdianName: editData.Relation_Name,
        address: editData.Address,
        mobile: editData.Mobile,
        email: editData.Mail,
        amount: editData.Deposit_Amt,
        commissionType: editData.Is_Percent.toString(),
        commissionRate: editData.Comm_Rate,
      });
    } else {
      form.reset({
        agentName: "",
        gurdianName: "",
        address: "",
        mobile: "",
        email: "",
        amount: "",
        commissionType: "",
        commissionRate: "",
      });
    }
  }, [editData, form.reset]);

  useEffect(() => {
    if (editData && !isOpen) {
      setEditData(null);
    }
  }, [isOpen, editData]);

  return {
    getAgentApiCall,
    addAgentLoading,
    updateAgentLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  };
};
