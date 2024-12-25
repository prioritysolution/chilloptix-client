import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import getCookieData from "@/utils/getCookieData";
import { BondSearchFormData } from "./BondSearchTypes";
import { addBondSearchAPI } from "./BondSearchFormApis";
import { ApiResponse } from "@/container/ApiTypes";
import { useDispatch } from "react-redux";
import { getBondSearchData } from "./BondSearchFormReducer";

export const useBondSearch = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);

  const [isBondModalOpen, setIsBondModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    bondType: yup
      .string()
      .required("Bond type is required") // Ensure it is required
      .test("is-valid-bond-type", "Bond type is invalid", (value) => {
        // Return true only if the value is valid
        return value === "1" || value === "2" || value === "3" || value === "";
      }),
    searchKey: yup.string().required("Please enter a value"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<BondSearchFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      bondType: "",
      searchKey: "",
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<BondSearchFormData> = (values) => {
    if (orgId) {
      addBondSearchApiCall(values, orgId);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  // Function to call the login API
  const addBondSearchApiCall = async (
    item: BondSearchFormData,
    orgId: number
  ) => {
    setLoading(true);

    try {
      const res: ApiResponse = await addBondSearchAPI(
        orgId,
        item.bondType,
        item.searchKey
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(getBondSearchData(res.data.details));
      } else {
        toast.error(res.data.message);
        dispatch(getBondSearchData([]));
      }
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(getBondSearchData([]));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    form,
    handleSubmit,
    isBondModalOpen,
    setIsBondModalOpen,
  };
};
