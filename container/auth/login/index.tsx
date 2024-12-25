"use client";

import { FC } from "react";

import { useLogin } from "./Hooks";
import Login from "@/components/auth/login"; // Adjust this import as necessary

const LoginContainer: FC = () => {
  const { form, loading, handleSubmit } = useLogin();

  return <Login form={form} loading={loading} handleSubmit={handleSubmit} />;
};

export default LoginContainer;
