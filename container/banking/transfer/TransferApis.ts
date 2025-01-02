import { ApiResponse } from "@/container/ApiTypes";
import { doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { TransferBody } from "./TransferTypes";

export const addTransferAPI = async (
  bodyData: TransferBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addBankTransfer,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};
