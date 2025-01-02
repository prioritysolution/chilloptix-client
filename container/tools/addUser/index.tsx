"use client";

import AddUser from "@/components/tools/addUser";
import { useAddUser } from "./Hooks";
import getCookieData from "@/utils/getCookieData";
import { useEffect } from "react";

const AddUserContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");

  const {
    // getUserRoleApiCall
    loading,
    form,
    handleSubmit,
  } = useAddUser();

  useEffect(() => {
    if (token) {
      // getUserRoleApiCall();
    }
  }, [token]);

  return <AddUser loading={loading} form={form} handleSubmit={handleSubmit} />;
};
export default AddUserContainer;
