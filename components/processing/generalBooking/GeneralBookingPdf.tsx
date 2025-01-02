import { ScrollBar } from "@/components/ui/scroll-area";
import { GeneralBookingPdfProps } from "@/container/processing/generalBooking/GeneralBookingTypes";
import getCookieData from "@/utils/getCookieData";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { format } from "date-fns";
import { FC, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const GeneralBookingPdf: FC<GeneralBookingPdfProps> = ({
  isOpen,
  setIsOpen,
  bookingData,
}) => {
  const [orgName, setOrgName] = useState<string | null>(null);
  const [orgAddress, setOrgAddress] = useState<string | null>(null);
  const [orgMobile, setOrgMobile] = useState<string | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = useReactToPrint({
    // @ts-expect-error nodescription
    contentRef: printRef,
    documentTitle: "General Booking Form",
  });

  useEffect(() => {
    if (typeof window !== null) {
      setOrgName(getCookieData("chilloptixClientOrgName"));
      setOrgAddress(getCookieData("chilloptixClientOrgAddress"));
      setOrgMobile(getCookieData("chilloptixClientOrgMobile"));
    }
  }, []);

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      backdrop="blur"
      size="4xl"
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader className="justify-center text-2xl font-medium">
          General Booking Print
        </ModalHeader>
        <Divider />
        <ModalBody className="w-full h-full flex items-center justify-center">
          <div ref={printRef} className="w-full max-w-[210mm] h-[148mm]">
            <ScrollArea className="w-full h-full overflow-x-auto p-2 scrollbar-hide">
              <div className="border-2 border-black px-5 py-2 flex flex-col justify-between gap-3 w-[calc(210mm-16px)] min-w-[calc(210mm-16px)] h-full">
                <div className="w-full text-center relative space-y-1">
                  <p className="">Application Form No. 14</p>
                  <p className="underline">Application for cold store space</p>
                  <h3 className="font-bold text-3xl font-mono tracking-tight [word-spacing:-.5rem] uppercase">
                    {orgName && orgName}
                  </h3>
                  <p className="uppercase">{orgAddress && orgAddress}</p>
                  <p className="">Mob. - {orgMobile && orgMobile}</p>
                  <p className="absolute -top-2 text-xl">
                    No. {bookingData?.Book_No}
                  </p>
                </div>
                <div className="space-y-3 py-1">
                  <p className="relative">
                    Applicant Name
                    {Array.from({ length: 71 }).map((_, i) => (
                      <span key={i}> &#46;</span>
                    ))}
                    <span className="absolute left-36 bottom-[2px]">
                      {bookingData?.Cust_Name}
                    </span>
                  </p>
                  <div className="flex gap-5">
                    <span>Address : </span>
                    <div className="flex flex-col gap-1">
                      <p className="relative">
                        Vill
                        {Array.from({ length: 72 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-14 bottom-[2px]">
                          {bookingData?.Village}
                        </span>
                      </p>
                      <p className="relative">
                        P.O.
                        {Array.from({ length: 71 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-14 bottom-[2px]">
                          {bookingData?.Post}
                        </span>
                      </p>
                      <p className="relative">
                        Dist.
                        {Array.from({ length: 71 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-14 bottom-[2px]">
                          {bookingData?.Dist}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="relative">
                    No. of Pack
                    {Array.from({ length: 75 }).map((_, i) => (
                      <span key={i}> &#46;</span>
                    ))}
                    <span className="absolute left-36 bottom-[2px]">
                      {bookingData?.Book_Qnty}
                    </span>
                  </p>
                  <p className="relative">
                    Date
                    {Array.from({ length: 81 }).map((_, i) => (
                      <span key={i}> &#46;</span>
                    ))}
                    <span className="absolute left-36 bottom-[2px]">
                      {bookingData.Book_Date &&
                        format(bookingData.Book_Date, "dd-MM-yyyy")}
                    </span>
                  </p>
                  <p className="relative">
                    Mob. No.
                    {Array.from({ length: 77 }).map((_, i) => (
                      <span key={i}> &#46;</span>
                    ))}
                    <span className="absolute left-36 bottom-[2px]">
                      {bookingData?.Mobile}
                    </span>
                  </p>
                  <p className="relative">
                    Agent
                    {Array.from({ length: 80 }).map((_, i) => (
                      <span key={i}> &#46;</span>
                    ))}
                    <span className="absolute left-36 bottom-[2px]">
                      {bookingData?.Agent}
                    </span>
                  </p>
                </div>
                <p className="w-full text-center text-muted-foreground">
                  ** This is a computer-generated receipt and does not require a
                  signature & stamp. **
                </p>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => setIsOpen(false)}
            size="lg"
            radius="sm"
            className="w-32"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            size="lg"
            radius="sm"
            className="w-32"
            onPress={() => generatePDF()}
          >
            Print
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GeneralBookingPdf;
