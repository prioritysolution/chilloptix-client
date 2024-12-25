"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RackPostingProps } from "@/container/processing/rackPosting/RackPostingTypes";
import { Button } from "@nextui-org/react";
import { FC, useState } from "react";
import SuccessMessage from "@/common/successMessage";
import RackPostingForm from "./RackPostingForm";
import BondSearch from "@/common/form/bondSearchForm";
import RackPostingTable from "./RackPostingTable";

const RackPosting: FC<RackPostingProps> = ({
  loading,
  form,
  handleSubmit,
  handleSelectBond,
  showSuccessMessage,
  setShowSuccessMessage,
  successMessage,
  handleGetBondDataByBondNo,
  getBondDetailsLoading,
  rackPostingTableData,
  handleDeleteFromTable,
  handleAddRackPosting,
  totalPack,
}) => {
  const [isBondModalOpen, setIsBondModalOpen] = useState(false);

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg">
      <div className="flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Rack Posting</h3>
        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20 ">
          <RackPostingForm
            getBondDetailsLoading={getBondDetailsLoading}
            form={form}
            handleSubmit={handleSubmit}
            handleGetBondDataByBondNo={handleGetBondDataByBondNo}
            rackPostingTableData={rackPostingTableData}
            handleAddRackPosting={handleAddRackPosting}
            setIsBondModalOpen={setIsBondModalOpen}
            totalPack={totalPack}
          />

          <div className="w-[300px] sm:w-[400px] md:w-[350px] lg:w-[500px] xl:w-full mx-auto my-10 border border-primary rounded-2xl overflow-hidden">
            <ScrollArea>
              <RackPostingTable
                rackPostingTableData={rackPostingTableData}
                handleDeleteFromTable={handleDeleteFromTable}
              />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className="w-full flex justify-end">
            <Button
              color="primary"
              size="lg"
              radius="sm"
              className="w-full lg:w-1/5"
              isLoading={loading}
              isDisabled={loading || !(rackPostingTableData.length > 0)}
              onPress={handleAddRackPosting}
            >
              Add
            </Button>
          </div>
        </ScrollArea>

        <BondSearch
          isBondModalOpen={isBondModalOpen}
          setIsBondModalOpen={setIsBondModalOpen}
          handleSelectData={handleSelectBond}
        />
      </div>

      <SuccessMessage
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        showNextButton={false}
      />
    </div>
  );
};
export default RackPosting;