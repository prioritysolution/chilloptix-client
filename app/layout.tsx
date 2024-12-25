import { Poppins } from "next/font/google";
import { FC, ReactNode } from "react";

import "./globals.css";

import ToasterProvider from "@/common/ToasterProvider";
import ReduxProvider from "@/redux/ReduxProviders";
import { ModalProvider } from "@/utils/ContextProvider";
import { Providers } from "./providers";

const style = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ChillOptix Client",
  description: "Admin panel created with Next JS",
};

interface RootLayoutProps {
  children: ReactNode; // Use ReactNode to type the children prop
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={style.className}>
        <Providers>
          <main className="h-screen w-screen">
            <ToasterProvider>
              <ReduxProvider>
                <ModalProvider>{children}</ModalProvider>
              </ReduxProvider>
            </ToasterProvider>
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
