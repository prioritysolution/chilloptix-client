"use client";

import {
  MdCall,
  MdNotifications,
  MdOutlineArrowForwardIos,
  MdMenu,
} from "react-icons/md";
import { useModalOpen } from "@/utils/ContextProvider";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import getCookieData from "@/utils/getCookieData";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { handleOpen } = useModalOpen();

  const [orgName, setOrgName] = useState<string | null>(null);
  const [orgReg, setOrgReg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgName(getCookieData<string | null>("chilloptixClientOrgName"));
      setOrgReg(getCookieData<string | null>("chilloptixClientOrgReg"));
    }
  }, []);

  return (
    <div className="w-full py-5  flex items-center justify-between bg-primary h-[60px]">
      <div className="md:w-[350px] h-full px-5">
        <div className="block md:hidden cursor-pointer" onClick={handleOpen}>
          <MdMenu className="text-2xl" />
        </div>
      </div>
      <div className="w-full px-4 flex items-center justify-between h-full pr-2 md:pr-10 ">
        <div className="text-xs md:text-base flex flex-col md:flex-row items-center gap-1">
          <span>Organisation name : </span>
          {orgName ? (
            <span className="font-[500]">{orgName}</span>
          ) : (
            <Skeleton className="w-[100px] h-[20px] inline-block ml-1 bg-secondary" />
          )}
        </div>

        <div className="text-xs md:text-base flex flex-col md:flex-row items-center gap-1">
          <span>Registration : </span>
          {orgReg ? (
            <span className="font-[500]">{orgReg}</span>
          ) : (
            <Skeleton className="w-[100px] h-[20px] inline-block ml-1 bg-secondary" />
          )}
        </div>

        <div className="flex items-center justify-center gap-5 sm:gap-10 text-2xl ">
          <div className="relative">
            <MdNotifications />
            <div className="p-[3px] rounded-full bg-red-500 absolute right-0 top-0 border-[2px] border-white" />
          </div>
          <div>
            <MdCall />
          </div>
          <div className="flex items-center justify-center  text-base">
            <Dropdown backdrop="blur">
              <DropdownTrigger className="">
                {
                  <Button
                    className="flex gap-2 md:gap-5 items-center text-white"
                    variant="light"
                  >
                    <div className="bg-secondary h-[30px] w-[30px] rounded-full sm:flex items-center justify-center text-black text-lg hidden">
                      <p>
                        {orgName && orgName.length > 0 && orgName.charAt(0)}
                      </p>
                    </div>
                    <span className="text-sm md:text-base">{orgName}</span>
                    <MdOutlineArrowForwardIos className="rotate-90 hidden md:block" />
                  </Button>
                }
              </DropdownTrigger>
              <DropdownMenu className="">
                <DropdownSection showDivider>
                  <DropdownItem
                    key={"label"}
                    variant="light"
                    className="cursor-default"
                    isReadOnly
                  >
                    My Account
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection aria-label="Help & Feedback">
                  <DropdownItem
                    key="profile"
                    variant="shadow"
                    color="secondary"
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem key="logout" variant="shadow" color="secondary">
                    Log Out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
