import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const addBookingSearchAPI = async (
  orgId: number,
  type: string,
  keyword: string,
  bookType: string
): Promise<ApiResponse> => {
  let data = {
    url:
      bookType === "BOOK"
        ? endPoints.getBookingSearchData(orgId, type, keyword)
        : endPoints.getBookingSearchForRackData(orgId, type, keyword),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
