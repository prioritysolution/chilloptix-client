"use client";

import { DatePickerField } from "@/common/formFields/DatePickerField";
import { Form } from "@/components/ui/form";
import { LicenseRenewalFormProps } from "@/container/master/licenseRenewal/LicenseRenewalTypes";
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

const LicenseRenewalForm: FC<LicenseRenewalFormProps> = ({
  addLicenseRenewalLoading,
  updateLicenseRenewalLoading,
  form,
  handleSubmit,
  isOpen,
  setIsOpen,
  editData,
}) => {
  const handleStopPropagation = (event: React.FocusEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

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
              License Renewal
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div onFocus={handleStopPropagation}>
                <DatePickerField
                  control={form.control}
                  label="Valid From"
                  name="validFrom"
                  startYear={2000}
                  endYear={2050}
                  disabled={!!(editData && Object.keys(editData).length > 0)}
                />
              </div>

              <div onFocus={handleStopPropagation}>
                <DatePickerField
                  control={form.control}
                  label="Valid To"
                  name="validTo"
                  startYear={2000}
                  endYear={2050}
                />
              </div>
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
                isLoading={
                  addLicenseRenewalLoading || updateLicenseRenewalLoading
                }
                isDisabled={
                  addLicenseRenewalLoading || updateLicenseRenewalLoading
                }
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
export default LicenseRenewalForm;
