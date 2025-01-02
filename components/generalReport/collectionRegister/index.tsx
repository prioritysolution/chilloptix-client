"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FC } from "react";
import { CollectionRegisterProps } from "@/container/generalReport/collectionRegister/CollectionRegisterTypes";
import CollectionRegisterForm from "./CollectionRegisterForm";
import CollectionRegisterTable from "./CollectionRegisterTable";

const CollectionRegister: FC<CollectionRegisterProps> = ({
  loading,
  form,
  handleSubmit,
  collectionRegisterTableData,
  handleDownloadPdf,
  totalQuantity,
  totalBasic,
  totalInsurance,
  totalRms,
  totalDrying,
  totalAdvance,
}) => {
  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg">
      <div className="flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Collection Register</h3>
        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 py-5 ">
          <CollectionRegisterForm
            loading={loading}
            form={form}
            handleSubmit={handleSubmit}
            handleDownloadPdf={handleDownloadPdf}
          />

          <div className="w-[300px] sm:w-full h-full flex flex-col border border-primary rounded-lg lg:p-5 gap-5 mt-5">
            <CollectionRegisterTable
              collectionRegisterTableData={collectionRegisterTableData}
              totalQuantity={totalQuantity}
              totalBasic={totalBasic}
              totalInsurance={totalInsurance}
              totalRms={totalRms}
              totalDrying={totalDrying}
              totalAdvance={totalAdvance}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default CollectionRegister;
