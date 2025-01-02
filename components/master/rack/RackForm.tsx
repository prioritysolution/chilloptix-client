"use client";

import DropdownField from "@/common/formFields/DropdownField";
import InputField from "@/common/formFields/InputField";
import { Form } from "@/components/ui/form";
import { ChamberTableData } from "@/container/master/chamber/ChamberTypes";
import { FloorTableData } from "@/container/master/floor/FloorTypes";
import { RackFormProps } from "@/container/master/rack/RackTypes";
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

interface FloorState {
  floorData: FloorTableData[];
}

interface ChamberState {
  chamberData: ChamberTableData[];
}

interface RootState {
  floor: FloorState;
  chamber: ChamberState;
}

const RackForm: FC<RackFormProps> = ({
  addRackLoading,
  updateRackLoading,
  form,
  handleSubmit,
  isOpen,
  setIsOpen,
  editData,
}) => {
  const floorData: FloorTableData[] = useSelector(
    (state: RootState) => state?.floor?.floorData
  );

  const chamberData: ChamberTableData[] = useSelector(
    (state: RootState) => state?.chamber?.chamberData
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
              Rack
            </ModalHeader>
            <Divider />
            <ModalBody>
              <DropdownField
                control={form.control}
                name="floorId"
                options={floorData}
                label="Floor"
                optionLabelKey="Floor_Name"
              />

              <DropdownField
                control={form.control}
                name="chamberId"
                options={chamberData || []}
                label="Chamber"
                optionLabelKey="Chamber_Name"
              />

              <InputField
                control={form.control}
                name="rackName"
                label="Rack Name"
              />

              <InputField
                control={form.control}
                name="rackNo"
                label="Rack No"
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
                isLoading={addRackLoading || updateRackLoading}
                isDisabled={addRackLoading || updateRackLoading}
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
export default RackForm;
