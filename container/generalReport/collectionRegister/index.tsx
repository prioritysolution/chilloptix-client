"use client";

import CollectionRegister from "@/components/generalReport/collectionRegister";
import { useCollectionRegister } from "./Hooks";

const CollectionRegisterContainer = () => {
  const {
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
  } = useCollectionRegister();

  return (
    <CollectionRegister
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      collectionRegisterTableData={collectionRegisterTableData}
      handleDownloadPdf={handleDownloadPdf}
      totalQuantity={totalQuantity}
      totalBasic={totalBasic}
      totalInsurance={totalInsurance}
      totalRms={totalRms}
      totalDrying={totalDrying}
      totalAdvance={totalAdvance}
    />
  );
};
export default CollectionRegisterContainer;
