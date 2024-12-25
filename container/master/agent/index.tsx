"use client";

import getCookieData from "@/utils/getCookieData";
import { useEffect } from "react";
import { useAgent } from "./Hooks";
import Agent from "@/components/master/agent";

const AgentContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    getAgentApiCall,
    addAgentLoading,
    updateAgentLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  } = useAgent();

  useEffect(() => {
    if (token && orgId) getAgentApiCall(orgId);
  }, [token, orgId]);

  return (
    <Agent
      addAgentLoading={addAgentLoading}
      updateAgentLoading={updateAgentLoading}
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      editData={editData}
      handleEditData={handleEditData}
    />
  );
};
export default AgentContainer;
