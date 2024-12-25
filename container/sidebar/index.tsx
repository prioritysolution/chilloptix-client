import getCookieData from "@/utils/getCookieData";
import { FC, useEffect } from "react";
import { useSidebar } from "./Hooks";
import Sidebar from "@/components/sidebar";

interface SidebarContainerProps {}

const SidebarContainer: FC<SidebarContainerProps> = ({}) => {
  const token = getCookieData("chilloptixClientToken");

  const { loading, getSidebarApiCall, handleLogout } = useSidebar();

  useEffect(() => {
    if (token) {
      getSidebarApiCall();
    }
  }, [token]);

  return <Sidebar loading={loading} handleLogout={handleLogout} />;
};
export default SidebarContainer;
