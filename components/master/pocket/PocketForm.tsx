"use client";

import DropdownField from "@/common/formFields/DropdownField";
import InputField from "@/common/formFields/InputField";
import { Form } from "@/components/ui/form";
import { PocketFormProps } from "@/container/master/pocket/PocketTypes";
import { RackTableData } from "@/container/master/rack/RackTypes";
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
import { useSelector } from "react-redux";

interface RackState {
  rackData: RackTableData[];
}

interface RootState {
  rack: RackState;
}

const PocketForm: FC<PocketFormProps> = ({
  addPocketLoading,
  updatePocketLoading,
  form,
  handleSubmit,
  isOpen,
  setIsOpen,
  editData,
}) => {
  const rackData: RackTableData[] = useSelector(
    (state: RootState) => state?.rack?.rackData
  );

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
              Pocket
            </ModalHeader>
            <Divider />
            <ModalBody>
              <DropdownField
                control={form.control}
                name="rackId"
                options={rackData || []}
                label="Rack"
                optionLabelKey="Rack_Name"
              />

              <InputField
                control={form.control}
                name="pocketName"
                label="Pocket Name"
              />

              <InputField
                control={form.control}
                name="pocketNo"
                label="Pocket No"
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
                isLoading={addPocketLoading || updatePocketLoading}
                isDisabled={addPocketLoading || updatePocketLoading}
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
export default PocketForm;
