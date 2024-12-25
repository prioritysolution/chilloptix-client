import { ApiResponse } from "@/container/ApiTypes";
import { doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { LoginBody } from "./LoginTypes";

export const addLoginAPI = async (
  bodyData: LoginBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.login,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};
