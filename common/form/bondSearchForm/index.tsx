"use client";

import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useBondSearch } from "./Hooks";
import { FC } from "react";
import { BondSearchProps } from "./BondSearchTypes";
import BondSearchForm from "./BondSearchForm";
import BondSearchTable from "./BondSearchTable";

const BondSearch: FC<BondSearchProps> = ({
  isBondModalOpen,
  setIsBondModalOpen,
  handleSelectData,
}) => {
  const { loading, form, handleSubmit } = useBondSearch();

  return (
    <div className="w-full">
      <Modal
        isOpen={isBondModalOpen}
        onOpenChange={setIsBondModalOpen}
        backdrop="blur"
        size="4xl"
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="justify-center text-2xl font-medium">
            Bond Search Table
          </ModalHeader>
          <Divider />

          <ModalBody>
            <div className="w-full flex flex-col gap-5 py-5 ">
              <BondSearchForm
                loading={loading}
                form={form}
                handleSubmit={handleSubmit}
              />

              <Divider />

              <BondSearchTable
                handleSelectData={handleSelectData}
                setIsBondModalOpen={setIsBondModalOpen}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default BondSearch;
