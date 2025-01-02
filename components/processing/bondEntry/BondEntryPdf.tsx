import { ScrollBar } from "@/components/ui/scroll-area";
import { BondEntryPdfProps } from "@/container/processing/bondEntry/BondEntryTypes";
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

const BondEntryPdf: FC<BondEntryPdfProps> = ({
  isOpen,
  setIsOpen,
  bondPdfData,
}) => {
  const [orgName, setOrgName] = useState<string | null>(null);
  const [orgAddress, setOrgAddress] = useState<string | null>(null);
  const [orgMobile, setOrgMobile] = useState<string | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = useReactToPrint({
    // @ts-expect-error nodescription
    contentRef: printRef,
    documentTitle: "Bond Entry Form",
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
      scrollBehavior="inside"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      backdrop="blur"
      size="4xl"
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader className="justify-center text-2xl font-medium">
          Bond Entry Print
        </ModalHeader>
        <Divider />
        <ModalBody className="w-full h-full flex items-center justify-center">
          <div ref={printRef} className="w-full h-full ">
            <div className="h-[500px] scrollbar-hide">
              <ScrollArea className=" scrollbar-hide">
                <ScrollArea className="w-full h-full overflow-x-auto scrollbar-hide">
                  {bondPdfData.length > 0 &&
                    bondPdfData.map((data, i) => (
                      <div
                        key={i}
                        className="w-full max-w-[210mm] h-[297mm] p-2 scrollbar-hide mx-auto"
                      >
                        <div className="border-2 border-black px-5 py-2 flex flex-col gap-1 w-[calc(210mm-16px)] min-w-[calc(210mm-16px)] h-full">
                          <div className="w-full text-center relative">
                            <p className="font-semibold">
                              Form No. 6 (See Rules 8 and 9)
                            </p>
                            <p className="underline">
                              Cold Storage Receipt-Negociable/Non-Negotiable
                            </p>
                            <h3 className="font-bold text-2xl font-mono tracking-tight [word-spacing:-.5rem] uppercase">
                              {orgName && orgName}
                            </h3>
                            <p className="uppercase">
                              {orgAddress && orgAddress}
                            </p>
                            <p className="">Mob. - {orgMobile && orgMobile}</p>
                            <p className="">
                              <span className="relative">
                                Cold Storage Licence No.
                                {Array.from({ length: 20 }).map((_, i) => (
                                  <span key={i}> &#46;</span>
                                ))}{" "}
                                <span className="absolute left-52 bottom-[2px]">
                                  {data?.Lic_No}
                                </span>
                              </span>
                              <span className="relative">
                                Valid Upto
                                {Array.from({ length: 16 }).map((_, i) => (
                                  <span key={i}> &#46;</span>
                                ))}
                                <span className="absolute left-24 bottom-[2px] text-nowrap">
                                  {data.Valid_Till &&
                                    format(data.Valid_Till, "dd-MM-yyyy")}
                                </span>
                              </span>
                            </p>
                            <p className="absolute -top-2 text-lg">
                              Sl. No. {data?.Bond_No}
                            </p>
                            <p className="absolute bottom-6 right-0">
                              Date{" "}
                              {Array.from({ length: 18 }).map((_, i) => (
                                <span key={i}> &#46;</span>
                              ))}
                              <span className="absolute text-nowrap left-12 bottom-[2px]">
                                {data &&
                                  data.Issue_Date &&
                                  format(data.Issue_Date, "dd-MM-yyyy")}
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="space-y-1 py-1 flex-grow">
                              <p className="relative">
                                Received from (Name &#38; Address of the
                                depositor)
                                {Array.from({ length: 100 }).map((_, i) => (
                                  <span key={i}> &#46;</span>
                                ))}
                                <span className="absolute left-4 bottom-[2px]">
                                  {data?.Cust_Name}
                                </span>
                              </p>
                              <p>
                                <span className="relative">
                                  Vill.
                                  {Array.from({ length: 18 }).map((_, i) => (
                                    <span key={i}> &#46;</span>
                                  ))}
                                  <span className="absolute left-8 bottom-0">
                                    {data?.Village}
                                  </span>
                                </span>{" "}
                                <span className="relative">
                                  P.O.
                                  {Array.from({ length: 24 }).map((_, i) => (
                                    <span key={i}> &#46;</span>
                                  ))}
                                  <span className="absolute left-8 bottom-0">
                                    {data?.Post_Off}
                                  </span>
                                </span>{" "}
                                <span className="relative">
                                  Dist.
                                  {Array.from({ length: 18 }).map((_, i) => (
                                    <span key={i}> &#46;</span>
                                  ))}
                                  <span className="absolute left-10 bottom-0">
                                    {data?.Dist}
                                  </span>
                                </span>
                              </p>
                            </div>
                            <div className="w-[110px] h-[110px] border-2 border-black flex flex-col flex-shrink-0 flex-grow-0">
                              <div className="w-full pb-2 text-sm bg-black text-white text-center font-medium">
                                <p>
                                  No. of
                                  <br />
                                  Application
                                </p>
                              </div>
                              <div className="w-full h-full text-center flex flex-col items-center justify-center text-xl">
                                <span>{data?.Bond_No}</span>
                                <Divider className="h-[2px] bg-black w-20" />
                                <span>{data?.Issue_Pack}</span>
                              </div>
                            </div>
                          </div>

                          <div className="w-full h-[150px] border-2 border-black rounded-lg grid grid-cols-[250px_1fr_200px_1fr]">
                            {/* First Child */}
                            <div className="text-center border-r-2 border-black flex flex-col">
                              <p>
                                Class of Standard quality and/or Grade Potato
                                condition of the goods not verified
                              </p>
                              <p className=" h-full text-sm flex items-center text-center w-full justify-center pt-1">
                                {data?.Class}
                              </p>
                            </div>
                            {/* Second Child with Specific Width */}
                            <div className="text-center border-r-2 border-black flex flex-col justify-between">
                              <p>Number of Packages or Lots</p>
                              <p className="text-xl text-center">
                                {data?.Issue_Pack}
                              </p>
                              <p>Said to Contain &#34;Potato&#34;</p>
                            </div>
                            {/* Third Child */}
                            <div className="text-center border-r-2 border-black flex flex-col">
                              <p>
                                Net quantity in kgms. by Weight or by measure
                              </p>
                              <p className="text-xl h-full flex items-center text-center w-full justify-center">
                                {data?.Issue_Qnty}
                              </p>
                            </div>
                            {/* Fourth Child */}
                            <div className="text-center flex flex-col">
                              <p>Advance Amount Paid</p>
                              <p className="text-lg h-full flex flex-col items-center text-center w-full justify-center">
                                {data?.Adv_Amt}
                                <span className="text-xs">
                                  (Rupees{" "}
                                  {data.Adv_Amt &&
                                    convertToWords(
                                      parseFloat(data.Adv_Amt)
                                    )}{" "}
                                  Only)
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="w-full flex items-end justify-between mt-5">
                            <p>
                              {Array.from({ length: 42 }).map((_, i) => (
                                <span key={i}>&#46; </span>
                              ))}
                              <br />
                              <span>
                                Signature/Thumb Impression of the hirer or Agent
                              </span>
                            </p>
                            <p>
                              {Array.from({ length: 33 }).map((_, i) => (
                                <span key={i}>&#46; </span>
                              ))}
                              <br />
                              <span>
                                Signature of the cold Storage Authority
                              </span>
                            </p>
                          </div>

                          <ol className="list-decimal px-3 text-sm" type="1">
                            <li>
                              <p>
                                Private marks of the hirer on the packages if
                                any No.
                              </p>
                            </li>
                            <li>
                              <p>
                                ⁠Rate of storing and other charges As per
                                Application
                              </p>
                            </li>
                            <li>
                              <p>
                                The goods are insured against the following
                                risks :-{" "}
                                <span className="font-semibold">
                                  (A) FIRE (B) ROIT (C) STRIKE (D) M.D.
                                </span>
                              </p>
                            </li>
                            <li>
                              <p>
                                Name of the insured:-{" "}
                                <span className="font-semibold">
                                  National Insurance Corporation Limited
                                </span>
                              </p>
                            </li>
                            <li>
                              <p className="flex gap-1">
                                <span className="font-semibold">⁠Note: </span>{" "}
                                If all the particulars of the Insurance cannot
                                be given, as not being available at the time of
                                granting the receipt such particulars as have
                                not been given shall be furnished to the hirer,
                                as soon as available in a separate sheet which
                                shall be a part of the receipt as by granted to
                                him.
                              </p>
                            </li>
                            <li>
                              <p>
                                The agricultural produce is accepted for storage
                                from:- 1st March 2024{" "}
                                {Array.from({ length: 7 }).map((_, i) => (
                                  <span key={i}>&#46; </span>
                                ))}
                                to 15th Nov. 2024{" "}
                                {Array.from({ length: 7 }).map((_, i) => (
                                  <span key={i}>&#46; </span>
                                ))}
                              </p>
                            </li>
                            <li>
                              <p>
                                Market rate at the time of deposit{" "}
                                {Array.from({ length: 26 }).map((_, i) => (
                                  <span key={i}>&#46; </span>
                                ))}
                                Estimated{" "}
                                {Array.from({ length: 26 }).map((_, i) => (
                                  <span key={i}>&#46; </span>
                                ))}
                              </p>
                            </li>
                            <li>
                              <p>
                                ⁠Particulars regarding transfer by endorsement
                                creating lines, mortgages or other encumbrances
                                of the agricultural produce. This receipt is
                                issued subject to the provision of the West
                                Bengal Cold Storage (Licensing &#38; Regulation)
                                Act. 1966 and rules there under and the
                                condition of any agreement/contract under
                                Section 22 of the Act.
                              </p>
                            </li>
                          </ol>

                          <div>
                            <p className="underline font-semibold">REMARKS:-</p>
                            <p className="text-sm pl-10">
                              The agricultural produce mentioned and described
                              below is hereby released from the receipt for
                              delivery from the Cold Storage. Any unreleased
                              balance of produce is subject to a line from
                              unpaid charges and advance on the released
                              portion.
                            </p>
                          </div>

                          <div className="w-full h-[250px] border-2 border-black grid grid-cols-3">
                            {/* First Child */}
                            <div className="text-center border-r-2 border-black">
                              <p className="border-b-2 border-black h-[50px] flex items-center justify-center">
                                Releaded Date
                              </p>
                            </div>
                            {/* Second Child with Specific Width */}
                            <div className="text-center border-r-2 border-black">
                              <p className="border-b-2 border-black h-[50px] flex items-center justify-center">
                                Signature of hirer
                              </p>
                            </div>
                            {/* Fourth Child */}
                            <div className="text-center">
                              <p className="border-b-2 border-black h-[50px] flex items-center justify-center">
                                Name and Quantity of produce due on receipt
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </ScrollArea>
            </div>
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

export default BondEntryPdf;
