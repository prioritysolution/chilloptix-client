import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { BondRegisterBody } from "./BondRegisterTypes";

export const addBondRegisterAPI = async (
  bodyData: BondRegisterBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addBondRegister,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};
