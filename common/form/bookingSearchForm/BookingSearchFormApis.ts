import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const addBookingSearchAPI = async (
  orgId: number,
  type: string,
  keyword: string
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getBookingSearchData(orgId, type, keyword),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
