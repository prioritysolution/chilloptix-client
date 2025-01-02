import { ScrollBar } from "@/components/ui/scroll-area";
import { RentReceiptPdfProps } from "@/container/processing/rentReceipt/RentReceiptTypes";
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
import { MdContentCut } from "react-icons/md";
import { useReactToPrint } from "react-to-print";

const RentReceiptPdf: FC<RentReceiptPdfProps> = ({
  isOpen,
  setIsOpen,
  rentCollectionPdfData,
}) => {
  const [orgName, setOrgName] = useState<string | null>(null);
  const [orgAddress, setOrgAddress] = useState<string | null>(null);
  const [orgMobile, setOrgMobile] = useState<string | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = useReactToPrint({
    // @ts-expect-error nodescription
    contentRef: printRef,
    documentTitle: "Rent Collection",
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
          Rent Collection Print
        </ModalHeader>
        <Divider />
        <ModalBody className="w-full h-full flex items-center justify-center">
          <div ref={printRef} className="w-full max-w-[210mm] h-[297mm]">
            <ScrollArea className="w-full h-full overflow-x-auto p-2 scrollbar-hide">
              <div className="border-2 border-black px-5 py-2 flex flex-col justify-between w-[calc(210mm-16px)] min-w-[calc(210mm-16px)] h-full ">
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full text-center relative space-y-1">
                    <p className="">Subject to Kolkata Juridiction</p>
                    <p className="underline tracking-wide text-xl font-medium underline-offset-2">
                      BILL OF STORAGE CHARGES
                    </p>
                    <div className="flex gap-5 items-end">
                      <div className="flex flex-col justify-center w-full text-center">
                        <h3 className="font-semibold text-3xl font-mono tracking-tight [word-spacing:-.5rem] uppercase">
                          {orgName && orgName}
                        </h3>
                        <p className="uppercase">{orgAddress && orgAddress}</p>
                        <p className="">Mob. - {orgMobile && orgMobile}</p>
                      </div>
                      <div className="h-[100px] w-[200px] border-2 border-black rounded-lg">
                        <p className=" w-full h-1/3 text-center pb-1 bg-black text-xl text-white font-semibold">
                          S. R. No.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-[2px] w-full h-2/3 text-lg">
                          <span>{rentCollectionPdfData?.Bond_No}</span>
                          <Divider className="h-[2px] bg-black w-24" />
                          <span>{rentCollectionPdfData?.Book_No}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="relative">
                        Name
                        {Array.from({ length: 58 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-20 bottom-[2px]">
                          {rentCollectionPdfData?.Cust_Name}
                        </span>
                      </span>{" "}
                      <span className="relative">
                        Date
                        {Array.from({ length: 17 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-12 bottom-[2px] text-nowrap">
                          {rentCollectionPdfData.Release_Date &&
                            format(
                              rentCollectionPdfData?.Release_Date,
                              "dd-MM-yyyy"
                            )}
                        </span>
                      </span>
                    </p>
                    <p>
                      <span className="relative">
                        Address
                        {Array.from({ length: 52 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-20 bottom-[2px]">
                          {rentCollectionPdfData?.Address}
                        </span>
                      </span>
                      <span className="relative">
                        Cont. No.
                        {Array.from({ length: 18 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-20 bottom-[2px]">
                          {rentCollectionPdfData?.Mobile}
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className="w-full h-[280px] border-2 border-black rounded-lg grid grid-cols-[2fr_1fr]">
                    {/* First Child */}
                    <div className="text-center border-r-2 border-black flex flex-col">
                      <p className="h-12 border-b-2 border-black flex items-center justify-center uppercase text-xl font-medium flex-shrink-0 flex-grow-0">
                        Particulars
                      </p>
                      <div className="flex flex-col justify-between w-full h-full">
                        <div className="w-full flex flex-col items-center gap-2 px-3 text-sm pt-3">
                          <p className="relative">
                            {Array.from({ length: 14 }).map((_, i) => (
                              <span key={i}> &#46;</span>
                            ))}{" "}
                            Bags of Potatos
                            <span className="absolute left-4 botton-[2px]">
                              {rentCollectionPdfData?.Rel_Qnty}
                            </span>
                          </p>
                          <p className="relative">
                            Rate{" "}
                            {Array.from({ length: 15 }).map((_, i) => (
                              <span key={i}> &#46;</span>
                            ))}{" "}
                            Per Packet.
                            <span className="absolute left-12 botton-[2px]">
                              {rentCollectionPdfData?.Basic_Rate}
                            </span>
                          </p>
                          <p className="relative">
                            Insurance{" "}
                            {Array.from({ length: 21 }).map((_, i) => (
                              <span key={i}> &#46;</span>
                            ))}
                            <span className="absolute left-24 botton-[2px]">
                              {rentCollectionPdfData?.Insurance}
                            </span>
                          </p>
                          <p className="relative">
                            R.M.F.{" "}
                            {Array.from({ length: 24 }).map((_, i) => (
                              <span key={i}> &#46;</span>
                            ))}
                            <span className="absolute  left-14 botton-[2px]">
                              {rentCollectionPdfData?.Rms_Fees}
                            </span>
                          </p>
                          <p className="relative">
                            Drying Fees
                            {Array.from({ length: 19 }).map((_, i) => (
                              <span key={i}> &#46;</span>
                            ))}
                            <span className="absolute left-24 bottom-[2px]">
                              {rentCollectionPdfData?.Drying_Amt}
                            </span>
                          </p>
                        </div>
                        <div className="w-full flex flex-col items-end gap-2 flex-shrink-0 px-3 pb-2 font-medium">
                          <p className="">Less Advance</p>
                          <p>
                            <span className="font-normal text-sm">
                              (Rupees{" "}
                              {convertToWords(
                                (rentCollectionPdfData.Total_Rent
                                  ? Number(rentCollectionPdfData.Total_Rent)
                                  : 0) -
                                  (rentCollectionPdfData.Advance_Paid
                                    ? Number(rentCollectionPdfData.Advance_Paid)
                                    : 0)
                              )}{" "}
                              Only)
                            </span>{" "}
                            Total Rs.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Second Child with Specific Width */}
                    <div className="text-center border-black flex flex-col">
                      <p className="h-12 border-b-2 border-black flex items-center justify-center text-xl font-medium flex-shrink-0 flex-grow-0">
                        Amount
                      </p>
                      <div className="h-full w-full relative flex flex-col items-end">
                        <div className="w-full h-full flex items-end justify-end pr-14 text-lg">
                          <p>{rentCollectionPdfData?.Total_Rent}</p>
                        </div>
                        <div className="h-12 w-full border-t-2 border-black flex items-end justify-end pr-14 text-lg">
                          <p>{rentCollectionPdfData?.Advance_Paid}</p>
                        </div>
                        <div className="h-12 w-full border-t-2 border-black flex items-end justify-end pr-14 text-lg">
                          <p>
                            {(rentCollectionPdfData.Total_Rent
                              ? Number(rentCollectionPdfData.Total_Rent)
                              : 0) -
                              (rentCollectionPdfData.Advance_Paid
                                ? Number(rentCollectionPdfData.Advance_Paid)
                                : 0)}
                          </p>
                        </div>
                        <div className="h-full w-[2px] bg-black absolute top-0 right-12" />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 self-end">
                    <p className="w-full text-center">E. & O.E.</p>
                    <div className="w-full border-2 border-black rounded-xl h-[80px]">
                      <p className="bg-black text-center text-white font-medium rounded-b-md w-fit px-5 pb-1 mx-auto">
                        Cashier
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-black border-dotted relative text-xl">
                  <MdContentCut className="absolute right-10 -top-[11px] rotate-180" />
                  <MdContentCut className="absolute left-10 -top-[11px]" />
                </div>

                <div className="w-full flex flex-col gap-3">
                  <div className="w-full text-center relative space-y-1">
                    <p className="border-2 border-black w-fit mx-auto px-3 [box-shadow:3px_3px_black] text-xl font-semibold">
                      GATE PASS
                    </p>
                    <div className="flex gap-5 items-end py-2">
                      <div className="flex flex-col justify-center w-full text-center">
                        <h3 className="font-semibold text-3xl font-mono tracking-tight [word-spacing:-.5rem] uppercase">
                          {orgName && orgName}
                        </h3>
                        <p className="uppercase">{orgAddress && orgAddress}</p>
                        <p className="">Mob. - {orgMobile && orgMobile}</p>
                      </div>
                      <div className="h-[100px] w-[200px] border-2 border-black rounded-lg">
                        <p className=" w-full h-1/3 text-center pb-1 bg-black text-xl text-white font-semibold">
                          S. R. No.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-[2px] w-full h-2/3 text-lg">
                          <span>{rentCollectionPdfData?.Bond_No}</span>
                          <Divider className="h-[2px] bg-black w-24" />
                          <span>{rentCollectionPdfData?.Book_No}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full flex gap-3 items-center justify-between py-2">
                    <div className="flex flex-col gap-y-2 py-1 w-full">
                      <p className="relative">
                        Name
                        {Array.from({ length: 55 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-20 bottom-[2px]">
                          {rentCollectionPdfData?.Cust_Name}
                        </span>
                      </p>
                      <p className="relative">
                        Address
                        {Array.from({ length: 53 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-20 bottom-[2px]">
                          {rentCollectionPdfData?.Address}
                        </span>
                      </p>
                      <p>
                        <span className="relative">
                          Cont. No.
                          {Array.from({ length: 36 }).map((_, i) => (
                            <span key={i}> &#46;</span>
                          ))}
                          <span className="absolute left-20 bottom-[2px]">
                            {rentCollectionPdfData?.Mobile}
                          </span>
                        </span>
                        <span className="relative">
                          Bags
                          {Array.from({ length: 12 }).map((_, i) => (
                            <span key={i}> &#46;</span>
                          ))}
                          <span className="absolute left-16 bottom-[2px]">
                            {rentCollectionPdfData?.Rel_Qnty}
                          </span>
                        </span>
                      </p>
                      <p className="relative">
                        Carried By
                        {Array.from({ length: 51 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-20 bottom-[2px]">
                          {rentCollectionPdfData?.as}
                        </span>
                      </p>

                      <p className="self-end mr-20 mt-2">Cashier</p>
                    </div>
                    <div className="w-[200px] h-full flex flex-col items-end text-end justify-between flex-shrink-0">
                      <p className="relative">
                        Date
                        {Array.from({ length: 19 }).map((_, i) => (
                          <span key={i}> &#46;</span>
                        ))}
                        <span className="absolute left-14 bottom-[2px] text-nowrap">
                          {rentCollectionPdfData.Release_Date &&
                            format(
                              rentCollectionPdfData?.Release_Date,
                              "dd-MM-yyyy"
                            )}
                        </span>
                      </p>
                      <p>Please Pass out Store Keeper</p>
                    </div>
                  </div>
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

export default RentReceiptPdf;
