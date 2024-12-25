"use client";
import getCookieData from "@/utils/getCookieData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const token = getCookieData("chilloptixClientToken");

  useEffect(() => {
    if (token) router.push("/dashboard");
    else router.push("/login");
  }, [token, router]);

  return <main className="min-h-screen">Hello world</main>;
}
