"use client";

import InputField from "@/common/formFields/InputField";
import { Form } from "@/components/ui/form";
import { FloorFormProps } from "@/container/master/floor/FloorTypes";
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

const FloorForm: FC<FloorFormProps> = ({
  addFloorLoading,
  updateFloorLoading,
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
              Floor
            </ModalHeader>
            <Divider />
            <ModalBody>
              <InputField
                control={form.control}
                name="floorName"
                label="Floor Name"
              />

              <InputField
                control={form.control}
                name="floorNo"
                label="Floor No"
                type="number"
              />

              <InputField
                control={form.control}
                name="capacity"
                label="Capacity"
                type="number"
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
                isLoading={addFloorLoading || updateFloorLoading}
                isDisabled={addFloorLoading || updateFloorLoading}
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
export default FloorForm;
