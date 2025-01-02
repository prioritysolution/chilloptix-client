"use client";

import InputField from "@/common/formFields/InputField";
import { Form } from "@/components/ui/form";
import { RentDetailsFormProps } from "@/container/processing/rentReceipt/RentReceiptTypes";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC } from "react";

const RentDetailsForm: FC<RentDetailsFormProps> = ({
  form,
  handleSubmit,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      backdrop="blur"
      size="2xl"
      hideCloseButton
      isDismissable={false}
      scrollBehavior="outside"
    >
      <ModalContent>
        <Form {...form}>
          <form
            className="w-full h-full flex flex-col gap-5 justify-between py-2"
            autoComplete="off"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <ModalHeader className="justify-center text-2xl font-medium">
              Rent Details
            </ModalHeader>
            <Divider />
            <ModalBody>
              <InputField
                control={form.control}
                name="balanceQuantity"
                label="Balance Quantity"
                disabled
              />

              <InputField
                control={form.control}
                name="releaseQuantity"
                label="Release Quantity"
                type="number"
              />

              <InputField
                control={form.control}
                name="basicRent"
                label="Basic Rent"
                disabled
              />

              <InputField
                control={form.control}
                name="insurance"
                label="Insurance"
                disabled
              />

              <InputField
                control={form.control}
                name="rmsFees"
                label="RMS Fees"
                disabled
              />

              <InputField
                control={form.control}
                name="dryingAmount"
                label="Drying Amount"
                disabled
              />

              <InputField
                control={form.control}
                name="totalAmount"
                label="Total Amount"
                disabled
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => setIsOpen(false)}
                size="lg"
                radius="sm"
                className="w-40"
              >
                Close
              </Button>
              <Button
                type="submit"
                color="primary"
                size="lg"
                radius="sm"
                className="w-40"
              >
                Add To Table
              </Button>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
};
export default RentDetailsForm;
