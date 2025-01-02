"use client";

import getCookieData from "@/utils/getCookieData";
import { useLicenseRenewal } from "./Hooks";
import { useEffect } from "react";
import LicenseRenewal from "@/components/master/licenseRenewal";

const LicenseRenewalContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    getLicenseRenewalApiCall,
    addLicenseRenewalLoading,
    updateLicenseRenewalLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    editData,
    handleEditData,
  } = useLicenseRenewal();

  useEffect(() => {
    if (token && orgId) getLicenseRenewalApiCall(orgId);
  }, [token, orgId]);

  return (
    <LicenseRenewal
      addLicenseRenewalLoading={addLicenseRenewalLoading}
      updateLicenseRenewalLoading={updateLicenseRenewalLoading}
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
export default LicenseRenewalContainer;
