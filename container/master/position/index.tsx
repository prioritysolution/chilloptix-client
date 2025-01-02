"use client";

import getCookieData from "@/utils/getCookieData";
import { usePosition } from "./Hooks";
import { useEffect } from "react";
import Position from "@/components/master/position";

const PositionContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    getPositionApiCall,
    addPositionLoading,
    updatePositionLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  } = usePosition();

  useEffect(() => {
    if (token && orgId) getPositionApiCall(orgId);
  }, [token, orgId]);

  return (
    <Position
      addPositionLoading={addPositionLoading}
      updatePositionLoading={updatePositionLoading}
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
export default PositionContainer;
