"use client";

import { useRent } from "./Hooks";
import Rent from "@/components/master/rent";

const RentContainer = () => {
  const { loading, form, handleSubmit, startDate } = useRent();

  return (
    <Rent
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      startDate={startDate}
    />
  );
};
export default RentContainer;
