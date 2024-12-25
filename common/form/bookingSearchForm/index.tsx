"use client";

import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useBookingSearch } from "./Hooks";
import { FC } from "react";
import { BookingSearchProps } from "./BookingSearchTypes";
import BookingSearchForm from "./BookingSearchForm";
import BookingSearchTable from "./BookingSearchTable";

const BookingSearch: FC<BookingSearchProps> = ({
  isBookingModalOpen,
  setIsBookingModalOpen,
  handleSelectData,
}) => {
  const { loading, form, handleSubmit } = useBookingSearch();

  return (
    <div className="w-full">
      <Modal
        isOpen={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        backdrop="blur"
        size="4xl"
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="justify-center text-2xl font-medium">
            Booking Search Table
          </ModalHeader>
          <Divider />

          <ModalBody>
            <div className="w-full flex flex-col gap-5 py-5 ">
              <BookingSearchForm
                loading={loading}
                form={form}
                handleSubmit={handleSubmit}
              />

              <Divider />

              <BookingSearchTable
                handleSelectData={handleSelectData}
                setIsBookingModalOpen={setIsBookingModalOpen}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default BookingSearch;
