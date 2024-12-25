import { ScrollBar } from "@/components/ui/scroll-area";
import { GeneralBookingPdfProps } from "@/container/processing/generalBooking/GeneralBookingTypes";
import getCookieData from "@/utils/getCookieData";
import convertToWords from "@/utils/numberToWords";
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
          <div
            ref={printRef}
            className="w-full max-w-[210mm] h-[148mm] bg-green-100"
          >
            <ScrollArea className="w-full h-full overflow-x-auto p-2 scrollbar-hide">
              <div className="border-2 border-black px-5 py-2 flex flex-col gap-3 text-sm w-[calc(210mm-16px)] min-w-[calc(210mm-16px)] h-full">
                <div className="w-full text-center relative">
                  <p className="">Application Form No. 14</p>
                  <p className="underline">Application for cold store space</p>
                  <h3 className="font-bold text-xl font-mono tracking-tight [word-spacing:-.5rem] uppercase">
                    {orgName && orgName}
                  </h3>
                  <p className="uppercase">{orgAddress && orgAddress}</p>
                  <p className="">Mob. - {orgMobile && orgMobile}</p>
                  <p className="absolute -top-2 text-lg">No.</p>
                </div>
                <div className="space-y-1 py-1">
                  <p className="relative">
                    Applicant Name
                    {Array.from({ length: 80 }).map((_, i) => (
                      <span key={i}> &#46;</span>
                    ))}
                    <span className="absolute left-36 bottom-[2px]">
                      {bookingData?.Cust_Name}
                    </span>
                  </p>
                  <p className="relative">
                    Address
                    {Array.from({ length: 86 }).map((_, i) => (
                      <span key={i}> &#46;</span>
                    ))}
                    <span className="absolute left-20 bottom-[2px]">
                      {bookingData?.Address}
                    </span>
                  </p>
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="w-[240px] h-[120px] border-2 border-black rounded-md p-1 py-2 flex flex-col justify-between items-end">
                    <p className="relative">
                      Advance Paid Amount
                      {Array.from({ length: 69 }).map((_, i) => (
                        <span key={i}> &#46;</span>
                      ))}
                      <span className="absolute left-1 top-[18px]">
                        {bookingData && bookingData.Amount && (
                          <>
                            {bookingData.Amount} ({" "}
                            {convertToWords(parseFloat(bookingData.Amount))}{" "}
                            Only )
                          </>
                        )}
                      </span>
                    </p>
                    <p></p>
                    <p>Signature</p>
                  </div>
                  <p className="relative">
                    Date
                    {Array.from({ length: 25 }).map((_, i) => (
                      <span key={i}> &#46;</span>
                    ))}
                    <span className="absolute left-12 bottom-[2px]">
                      {bookingData &&
                        bookingData.Bok_Date &&
                        format(bookingData.Bok_Date, "dd-MM-yyyy")}
                    </span>
                  </p>
                </div>
                <p>
                  Sir,
                  <br />
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please
                    reserve space in your cold store for
                    <span className="relative">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <span key={i}> &#46;</span>
                      ))}
                      <span className="absolute left-2 bottom-[2px]">
                        {bookingData?.Book_Qnty}
                      </span>
                    </span>{" "}
                    kg of potatoes from
                    <span className="relative">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <span key={i}> &#46;</span>
                      ))}
                      <span className="absolute left-2 bottom-[2px]">
                        {bookingData &&
                          bookingData.Bok_Date &&
                          format(bookingData.Bok_Date, "dd-MM-yyyy")}
                      </span>
                    </span>{" "}
                    to <br />
                    <span className="relative">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <span key={i}> &#46;</span>
                      ))}
                      <span className="absolute left-2 bottom-[2px]">
                        {bookingData &&
                          bookingData.Valid_Till &&
                          format(bookingData.Valid_Till, "dd-MM-yyyy")}
                      </span>
                    </span>{" "}
                    . I/We agree to accept your cold store terms and conditions.
                  </span>
                </p>
                <div className="w-full flex items-center justify-between">
                  <div className="w-[410px] border-2 border-black text-center [box-shadow:5px_5px_#000]">
                    <p className="font-semibold text-base">
                      Warranted that the rentiers are liable to pay any
                      additional increase in rent fixed by the Govt.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-end gap-5">
                    <p>Yours faithfully</p>
                    <p>(Applicant&#39;s signature)</p>
                  </div>
                </div>
                <div>
                  <h4 className="underline font-semibold text-base">
                    Terms & Conditions
                  </h4>
                  <ol className="list-decimal px-3 py-1" type="1">
                    <li>
                      <p>
                        Store rent is Rs.
                        <span>
                          {Array.from({ length: 13 }).map((_, i) => (
                            <span key={i}> &#46;</span>
                          ))}
                        </span>{" "}
                        Insurance cost is Rs.
                        <span>
                          {Array.from({ length: 13 }).map((_, i) => (
                            <span key={i}> &#46;</span>
                          ))}
                        </span>{" "}
                        and customs duty is Rs.
                        <span>
                          {Array.from({ length: 13 }).map((_, i) => (
                            <span key={i}> &#46;</span>
                          ))}
                        </span>
                      </p>
                    </li>
                    <li>
                      <p>
                        The bag will be
                        <span>
                          {Array.from({ length: 13 }).map((_, i) => (
                            <span key={i}> &#46;</span>
                          ))}
                        </span>
                        kg.
                      </p>
                    </li>
                  </ol>
                </div>
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
