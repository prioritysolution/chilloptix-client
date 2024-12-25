"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";

import { useModalOpen } from "@/utils/ContextProvider";
import { cn } from "@/lib/utils";
import IconDisplay from "@/common/IconDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

// Types for sidebar data
interface ChildLink {
  Icon: string | null;
  Page_Allies?: string | null; // Alias for navigation
  Menue_Name: string;
}

interface SidebarLink {
  title: string;
  path?: string | null;
  Icon?: string | null; // Icon name as a string
  childLinks: ChildLink[] | null;
}

interface SidebarProps {
  handleLogout: () => void;
  loading: boolean;
}

interface SidebarState {
  sidebarData: SidebarLink[];
}

interface RootState {
  sidebar: SidebarState;
}

const Sidebar: React.FC<SidebarProps> = ({ loading }) => {
  const { modalOpen, handleClose } = useModalOpen();
  const [expandedLink, setExpandedLink] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  const sidebarData: SidebarLink[] = useSelector(
    (state: RootState) => state?.sidebar?.sidebarData
  );

  const handleExpandedLink = (title: string) => {
    setExpandedLink((prev) => (prev === title ? "" : title));
  };

  return (
    <div
      className={cn(
        " w-[300px] h-[calc(100vh-62px)] flex-col justify-between absolute md:relative bg-primary -translate-x-[300px] md:translate-x-0 flex transition-all ease-in duration-200 delay-75 z-[10] scrollbar-hide",
        { "translate-x-0": modalOpen }
      )}
    >
      <ScrollArea className=" h-full ">
        <div className="flex text-white justify-end pr-5 py-2">
          <MdOutlineClose
            className="text-3xl font-bold md:hidden"
            onClick={handleClose}
          />
        </div>
        {loading || !sidebarData || !(sidebarData.length > 0) ? (
          <>
            <ul className=" space-y-4 mb-4 px-4">
              {Array.from({ length: 14 }).map((_, index) => (
                <li key={index}>
                  <Skeleton className="w-full h-[40px] rounded-lg bg-secondary" />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className=" space-y-4 mb-4 ">
            {sidebarData.map((link, id) => (
              <li
                key={id}
                className={cn("px-4", {
                  "flex items-center justify-between  ": !(
                    link.childLinks && link.childLinks.length > 0
                  ),
                })}
              >
                <p
                  className={cn(
                    "flex items-center justify-between p-2 px-4 font-[500] border border-secondary rounded-lg w-full cursor-pointer",
                    {
                      "bg-secondary text-black":
                        link.path === pathname ||
                        (link.childLinks &&
                          link.childLinks.filter(
                            (item) => item.Page_Allies === pathname
                          ).length > 0),
                    }
                  )}
                  onClick={() => {
                    if (link.childLinks && link.childLinks.length > 0) {
                      handleExpandedLink(link.title);
                    } else {
                      handleExpandedLink("");
                    }

                    if (
                      link.childLinks &&
                      !(link.childLinks.length > 0) &&
                      link.path
                    ) {
                      router.replace(link.path);
                    }
                  }}
                >
                  <span className="flex items-center justify-center gap-5">
                    <IconDisplay
                      iconName={link.Icon ? link.Icon : ""}
                      iconSet={
                        link.Icon ? link.Icon.slice(0, 2).toLowerCase() : ""
                      }
                      className="text-2xl  "
                    />

                    {link.title}
                  </span>
                  {link.childLinks && link.childLinks.length > 0 && (
                    <FiChevronRight
                      className={cn(
                        "text-xl transition-all duration-150",
                        link.title === expandedLink && "rotate-90"
                      )}
                    />
                  )}
                </p>
                <ul
                // className={
                //   link.childLinks &&
                //   ` rounded-md flex justify-start items-center`
                // }
                >
                  {link.childLinks &&
                    link.title === expandedLink &&
                    link.childLinks.map((item, id) => (
                      <div
                        className="flex items-center justify-between pl-6"
                        key={id}
                      >
                        <div className="flex items-center justify-start">
                          <div className={`h-[40px] w-[2px] bg-secondary`} />
                          <li
                            className={`flex items-center justify-start gap-2 py-2 rounded-md cursor-pointer`}
                            onClick={() =>
                              item.Page_Allies && router.push(item.Page_Allies)
                            }
                          >
                            <div className="h-[2px] w-[10px] bg-secondary" />
                            {item.Menue_Name}
                          </li>
                        </div>
                        <div
                          className={cn(
                            "border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[10px] border-r-[hsl(330,_55%,_90%)] hidden",
                            { block: item.Page_Allies === pathname }
                          )}
                        />
                      </div>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
      <div className=" border-t-[2px] border-secondary px-5  flex items-center bottom-0 left-0 w-full z-[5] h-[67px]">
        <p className="text-secondary text-3xl italic">
          ChillOptix<span className="text-lg"> 1.0.1</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
