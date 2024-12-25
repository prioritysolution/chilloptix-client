import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const addBondSearchAPI = async (
  orgId: number,
  type: string,
  keyword: string
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getBondSearchData(orgId, type, keyword),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
