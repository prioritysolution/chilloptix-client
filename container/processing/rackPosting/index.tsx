"use client";

import RackPosting from "@/components/processing/rackPosting";
import { useRackPosting } from "./Hooks";
import getCookieData from "@/utils/getCookieData";
import { useFloor } from "@/container/master/floor/Hooks";
import { useChamber } from "@/container/master/chamber/Hooks";
import { useEffect } from "react";
import { useRack } from "@/container/master/rack/Hooks";
import { usePocket } from "@/container/master/pocket/Hooks";
import { usePosition } from "@/container/master/position/Hooks";

const RackPostingContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    loading,
    getBondListLoading,
    form,
    handleSubmit,
    handleSelectBooking,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
    handleGetBondListByBookingNo,
    rackPostingTableData,
    handleDeleteFromTable,
    handleAddRackPosting,
    floorId,
    chamberId,
    rackId,
    totalPack,
    bondListData,
  } = useRackPosting();

  const { getFloorApiCall } = useFloor();

  const { getChamberUnderFloorApiCall } = useChamber();

  const { getRackUnderChamberApiCall } = useRack();

  const { getPocketUnderRackApiCall } = usePocket();

  const { getPositionApiCall } = usePosition();

  useEffect(() => {
    if (token && orgId) {
      getFloorApiCall(orgId);
      getPositionApiCall(orgId);
    }
  }, [token, orgId]);

  useEffect(() => {
    if (token && orgId && floorId) {
      getChamberUnderFloorApiCall(orgId, floorId);
    }
    form.setValue("chamberId", "");
  }, [token, orgId, floorId]);

  useEffect(() => {
    if (token && orgId && chamberId) {
      getRackUnderChamberApiCall(orgId, chamberId);
    }
    form.setValue("rackId", "");
  }, [token, orgId, chamberId]);

  useEffect(() => {
    if (token && orgId && rackId) {
      getPocketUnderRackApiCall(orgId, rackId);
    }
    form.setValue("pocketId", "");
  }, [token, orgId, rackId]);

  return (
    <RackPosting
      loading={loading}
      getBondListLoading={getBondListLoading}
      form={form}
      handleSubmit={handleSubmit}
      handleSelectBooking={handleSelectBooking}
      showSuccessMessage={showSuccessMessage}
      setShowSuccessMessage={setShowSuccessMessage}
      successMessage={successMessage}
      handleGetBondListByBookingNo={handleGetBondListByBookingNo}
      rackPostingTableData={rackPostingTableData}
      handleDeleteFromTable={handleDeleteFromTable}
      handleAddRackPosting={handleAddRackPosting}
      totalPack={totalPack}
      bondListData={bondListData}
    />
  );
};
export default RackPostingContainer;
