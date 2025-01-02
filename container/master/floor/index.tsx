"use client";

import Floor from "@/components/master/floor";
import { useFloor } from "./Hooks";
import getCookieData from "@/utils/getCookieData";
import { useEffect } from "react";

const FloorContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    getFloorApiCall,
    addFloorLoading,
    updateFloorLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  } = useFloor();

  useEffect(() => {
    if (token && orgId) getFloorApiCall(orgId);
  }, [token, orgId]);

  return (
    <Floor
      addFloorLoading={addFloorLoading}
      updateFloorLoading={updateFloorLoading}
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
export default FloorContainer;
