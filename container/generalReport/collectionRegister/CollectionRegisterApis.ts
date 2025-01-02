import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { CollectionRegisterBody } from "./CollectionRegisterTypes";

export const addCollectionRegisterAPI = async (
  bodyData: CollectionRegisterBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addCollectionRegister,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};
