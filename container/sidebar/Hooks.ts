import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { ApiResponse } from "@/container/ApiTypes";
import { useDispatch } from "react-redux";
import { getLogoutAPI, getSidebarAPI } from "./SidebarApis";
import { getSidebarData } from "./SidebarReducer";
import { useRouter } from "next/navigation";

export const useSidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    getLogutApiCall();
  };

  // Function to call the login API
  const getSidebarApiCall = async () => {
    setLoading(true);

    try {
      const res: ApiResponse = await getSidebarAPI();

      if (res.status === 200) {
        dispatch(getSidebarData(res?.data?.details));
      } else {
        dispatch(getSidebarData([]));
        toast.error(res.data.message || "No data available");
      }
    } catch (err) {
      dispatch(getSidebarData([]));
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // logout get api call
  const getLogutApiCall = async () => {
    setLoading(true);
    try {
      const res = await getLogoutAPI();
      if (res.status === 200) {
        router.push("/login");
        Cookies.remove("chilloptixAdminToken");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getSidebarApiCall,
    handleLogout,
  };
};
