import { ApiResponse } from "@/container/ApiTypes";
import { doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { WithdrawnBody } from "./WithdrawnTypes";

export const addWithdrawnAPI = async (
  bodyData: WithdrawnBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addBankWithdrawn,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};
