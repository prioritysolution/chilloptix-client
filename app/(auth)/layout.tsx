"use client";

import getCookieData from "@/utils/getCookieData";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface AuthLayoutProps {
  children: ReactNode; // Use ReactNode to type the children prop
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();
  const token = getCookieData("chilloptixClientToken");

  useEffect(() => {
    if (token) router.push("/dashboard");
  }, [token, router]);
  return (
    <main className="w-full h-screen bg-secondary overflow-hidden gap-[2px] text-black">
      {children}
    </main>
  );
};

export default AuthLayout;
