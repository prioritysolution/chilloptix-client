"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { LicenseRenewalProps } from "@/container/master/licenseRenewal/LicenseRenewalTypes";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import LicenseRenewalForm from "./LicenseRenewalForm";
import LicenseRenewalTable from "./LicenseRenewalTable";

const LicenseRenewal: FC<LicenseRenewalProps> = ({
  addLicenseRenewalLoading,
  updateLicenseRenewalLoading,
  // loading,
  form,
  handleSubmit,
  isOpen,
  setIsOpen,
  editData,
  handleEditData,
}) => {
  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">License Renewal Master</h3>

        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 ">
          <div className="w-full flex flex-col items-center gap-5">
            <Button
              color="primary"
              size="lg"
              radius="sm"
              className="w-fit self-end"
              onPress={() => setIsOpen(true)}
            >
              Add License Renewal
            </Button>

            <LicenseRenewalForm
              addLicenseRenewalLoading={addLicenseRenewalLoading}
              updateLicenseRenewalLoading={updateLicenseRenewalLoading}
              form={form}
              handleSubmit={handleSubmit}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              editData={editData}
            />
            <div className="w-[300px] sm:w-full h-full flex flex-col border border-primary rounded-lg lg:p-5 gap-5">
              <LicenseRenewalTable handleEditData={handleEditData} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default LicenseRenewal;
