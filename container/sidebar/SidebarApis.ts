import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getSidebarAPI = async (): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getSidebar,
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const getLogoutAPI = async (): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getLogout,
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
