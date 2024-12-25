"use client";

import getCookieData from "@/utils/getCookieData";
import { useFloor } from "../floor/Hooks";
import { useEffect } from "react";
import Chamber from "@/components/master/chamber";
import { useChamber } from "./Hooks";

const ChamberContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    getChamberApiCall,
    addChamberLoading,
    updateChamberLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  } = useChamber();

  const { getFloorApiCall } = useFloor();

  useEffect(() => {
    if (token && orgId) {
      getFloorApiCall(orgId);
      getChamberApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <Chamber
      addChamberLoading={addChamberLoading}
      updateChamberLoading={updateChamberLoading}
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
export default ChamberContainer;
