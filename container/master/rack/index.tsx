"use client";

import getCookieData from "@/utils/getCookieData";
import { useFloor } from "../floor/Hooks";
import { useEffect } from "react";
import { useRack } from "./Hooks";
import Rack from "@/components/master/rack";
import { useChamber } from "../chamber/Hooks";

const RackContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    getRackApiCall,
    addRackLoading,
    updateRackLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
    floorId,
  } = useRack();

  const { getFloorApiCall } = useFloor();

  const { getChamberUnderFloorApiCall } = useChamber();

  useEffect(() => {
    if (token && orgId) {
      getFloorApiCall(orgId);
      getRackApiCall(orgId);
    }
  }, [token, orgId]);

  useEffect(() => {
    if (token && orgId && floorId) {
      getChamberUnderFloorApiCall(orgId, floorId);
    }
    form.setValue("chamberId", "");
  }, [token, orgId, floorId]);

  return (
    <Rack
      addRackLoading={addRackLoading}
      updateRackLoading={updateRackLoading}
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
export default RackContainer;
