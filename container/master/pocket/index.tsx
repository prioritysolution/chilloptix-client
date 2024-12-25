"use client";

import getCookieData from "@/utils/getCookieData";
import { useEffect } from "react";
import { usePocket } from "./Hooks";
import { useRack } from "../rack/Hooks";
import Pocket from "@/components/master/pocket";

const PocketContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    getPocketApiCall,
    addPocketLoading,
    updatePocketLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  } = usePocket();

  const { getRackApiCall } = useRack();

  useEffect(() => {
    if (token && orgId) {
      getRackApiCall(orgId);
      getPocketApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <Pocket
      addPocketLoading={addPocketLoading}
      updatePocketLoading={updatePocketLoading}
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
export default PocketContainer;
