"use client";

import BookingRegister from "@/components/generalReport/bookingRegister";
import { useBookingRegister } from "./Hooks";

const BookingRegisterContainer = () => {
  const {
    loading,
    form,
    handleSubmit,
    bookingRegisterTableData,
    handleDownloadPdf,
    totalQuantity,
    totalAdvance,
  } = useBookingRegister();

  return (
    <BookingRegister
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      bookingRegisterTableData={bookingRegisterTableData}
      handleDownloadPdf={handleDownloadPdf}
      totalQuantity={totalQuantity}
      totalAdvance={totalAdvance}
    />
  );
};
export default BookingRegisterContainer;
