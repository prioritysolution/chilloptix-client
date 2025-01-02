"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FC } from "react";
import { BondRegisterProps } from "@/container/generalReport/bondRegister/BondRegisterTypes";
import BondRegisterForm from "./BondRegisterForm";
import BondRegisterTable from "./BondRegisterTable";

const BondRegister: FC<BondRegisterProps> = ({
  loading,
  form,
  handleSubmit,
  bondRegisterTableData,
  handleDownloadPdf,
  totalPack,
  totalQuantity,
}) => {
  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg">
      <div className="flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Bond Register</h3>
        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 py-5 ">
          <BondRegisterForm
            loading={loading}
            form={form}
            handleSubmit={handleSubmit}
            handleDownloadPdf={handleDownloadPdf}
          />

          <div className="w-[300px] sm:w-full h-full flex flex-col border border-primary rounded-lg lg:p-5 gap-5 mt-5">
            <BondRegisterTable
              bondRegisterTableData={bondRegisterTableData}
              totalPack={totalPack}
              totalQuantity={totalQuantity}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default BondRegister;
