"use client";

import InputField from "@/common/formFields/InputField";
import RadioField from "@/common/formFields/RadioFields";
import TextareaField from "@/common/formFields/TextareaField";
import { Form } from "@/components/ui/form";
import { AgentFormProps } from "@/container/master/agent/AgentTypes";
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

const AgentForm: FC<AgentFormProps> = ({
  addAgentLoading,
  updateAgentLoading,
  form,
  handleSubmit,
  isOpen,
  setIsOpen,
  editData,
}) => {
  const commissionTypeOptions = [
    {
      value: "1",
      label: "Percent",
    },
    {
      value: "0",
      label: "Fixed",
    },
  ];

  return (
    <Modal
      scrollBehavior="outside"
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
              Agent
            </ModalHeader>
            <Divider />
            <ModalBody>
              <InputField
                control={form.control}
                name="agentName"
                label="Agent Name"
              />

              <InputField
                control={form.control}
                name="gurdianName"
                label="Guardian Name"
              />

              <TextareaField
                control={form.control}
                name="address"
                label="Address"
                placeholder="Enter address"
              />

              <InputField
                control={form.control}
                name="mobile"
                label="Mobile"
                type="number"
              />

              <InputField control={form.control} name="email" label="Email" />

              <InputField
                control={form.control}
                name="amount"
                label="Deposit Amount"
                type="number"
              />

              <RadioField
                control={form.control}
                name="commissionType"
                label="Commission Type"
                options={commissionTypeOptions}
              />

              <InputField
                control={form.control}
                name="commissionRate"
                label="Commission Rate"
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
                isLoading={addAgentLoading || updateAgentLoading}
                isDisabled={addAgentLoading || updateAgentLoading}
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
export default AgentForm;
