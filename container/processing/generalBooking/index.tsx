"use client";

import GeneralBooking from "@/components/processing/generalBooking";
import { useGeneralBooking } from "./Hooks";
import getCookieData from "@/utils/getCookieData";
import { useBankAccount } from "@/container/master/bankAccount/Hooks";
import { useEffect } from "react";

const GeneralBookingContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    loading,
    form,
    handleSubmit,
    handleSelectCustomer,
    isOpen,
    setIsOpen,
    disableField,
    customerData,
    showTransBlock,
    bookingData,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
    handleShowPdf,
  } = useGeneralBooking();

  const { getBankAccountApiCall } = useBankAccount();

  useEffect(() => {
    if (token && orgId) {
      getBankAccountApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <GeneralBooking
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      handleSelectCustomer={handleSelectCustomer}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      disableField={disableField}
      customerData={customerData}
      showTransBlock={showTransBlock}
      bookingData={bookingData}
      showSuccessMessage={showSuccessMessage}
      setShowSuccessMessage={setShowSuccessMessage}
      successMessage={successMessage}
      handleShowPdf={handleShowPdf}
    />
  );
};
export default GeneralBookingContainer;
