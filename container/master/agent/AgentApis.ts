import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { AgentBody } from "./AgentTypes";

export const addAgentAPI = async (
  bodyData: AgentBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addAgent,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getAgentAPI = async (orgId: number): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getAgent(orgId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const updateAgentAPI = async (
  bodyData: AgentBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.updateAgent,
    bodyData,
  };

  // Call the API
  const res = await doPutApiCall(data);

  return res;
};
