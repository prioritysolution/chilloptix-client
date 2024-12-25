"use client";

import { useRouter } from "next/navigation";

import getCookieData from "@/utils/getCookieData";
import { FC, ReactNode, useEffect } from "react";
import SidebarContainer from "@/container/sidebar";
import NavbarContainer from "@/container/navbar";
import Footer from "@/components/footer";
// import SidebarContainer from "@/container/sidebar";
// import NavbarContainer from "@/container/navbar";
// import Footer from "@/components/footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const token = getCookieData("chilloptixClientToken");

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  useEffect(() => {
    const handleWheel = (event: globalThis.WheelEvent) => {
      const target = event.target as HTMLInputElement;

      // Ensure the event target is an input of type number
      if (target && target.tagName === "INPUT" && target.type === "number") {
        event.preventDefault();
      }
    };

    // Add native event listener to the document
    document.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup the event listener
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <main className=" flex flex-col min-h-screen bg-secondary overflow-hidden gap-[2px] text-white ">
        <NavbarContainer />
        <div className="w-full h-[calc(100vh-62px)] flex gap-[2px]">
          <SidebarContainer />
          <div className="h-full w-full md:w-[calc(100%-300px)] flex flex-col justify-between bg-secondary">
            <div className="flex-1 text-black p-[2px] pr-[5px] h-[calc(100vh-120px)]">
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
