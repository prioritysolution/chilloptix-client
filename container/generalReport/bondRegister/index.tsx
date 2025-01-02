"use client";

import BondRegister from "@/components/generalReport/bondRegister";
import { useBondRegister } from "./Hooks";

const BondRegisterContainer = () => {
  const {
    loading,
    form,
    handleSubmit,
    bondRegisterTableData,
    handleDownloadPdf,
    totalPack,
    totalQuantity,
  } = useBondRegister();

  return (
    <BondRegister
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      bondRegisterTableData={bondRegisterTableData}
      handleDownloadPdf={handleDownloadPdf}
      totalPack={totalPack}
      totalQuantity={totalQuantity}
    />
  );
};
export default BondRegisterContainer;
