"use client";

import InputField from "@/common/formFields/InputField";
import { Form } from "@/components/ui/form";
import { PositionFormProps } from "@/container/master/position/PositionTypes";
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

const PositionForm: FC<PositionFormProps> = ({
  addPositionLoading,
  updatePositionLoading,
  form,
  handleSubmit,
  isOpen,
  setIsOpen,
  editData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      backdrop="blur"
      size="xl"
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        <Form {...form}>
          <form
            className="w-full h-full flex flex-col gap-5 justify-between py-2"
            autoComplete="off"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <ModalHeader className="justify-center text-2xl font-medium">
              {editData && Object.keys(editData).length > 0
                ? "Edit"
                : "Add New"}{" "}
              Position
            </ModalHeader>
            <Divider />
            <ModalBody>
              <InputField
                control={form.control}
                name="name"
                label="Position Name"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => setIsOpen(false)}
                size="lg"
                radius="sm"
                className="w-32"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                size="lg"
                radius="sm"
                className="w-32"
                isLoading={addPositionLoading || updatePositionLoading}
                isDisabled={addPositionLoading || updatePositionLoading}
              >
                {editData && Object.keys(editData).length > 0 ? "Edit" : "Add"}
              </Button>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
};
export default PositionForm;
