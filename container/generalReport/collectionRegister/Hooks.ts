import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/container/ApiTypes";
import getCookieData from "@/utils/getCookieData";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  CollectionRegisterFormData,
  CollectionRegisterTableData,
} from "./CollectionRegisterTypes";
import { addCollectionRegisterAPI } from "./CollectionRegisterApis";

export const useCollectionRegister = () => {
  const [loading, setLoading] = useState(false);

  const [orgId, setOrgId] = useState<number | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [orgAddress, setOrgAddress] = useState<string | null>(null);
  const [orgMobile, setOrgMobile] = useState<string | null>(null);
  const [orgReg, setOrgReg] = useState<string | null>(null);

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [collectionRegisterTableData, setCollectionRegisterTableData] =
    useState<CollectionRegisterTableData[]>([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrgId(getCookieData<number | null>("chilloptixClientOrgId"));
      setOrgName(getCookieData<string | null>("chilloptixClientOrgName"));
      setOrgAddress(getCookieData<string | null>("chilloptixClientOrgAddress"));
      setOrgMobile(getCookieData<string | null>("chilloptixClientOrgMobile"));
      setOrgReg(getCookieData<string | null>("chilloptixClientOrgReg"));
    }
  }, []);

  // Form validation schema with yup
  const formSchema = yup.object({
    fromDate: yup.date().required("From date is required"),
    toDate: yup.date().required("To date is required"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const form = useForm<CollectionRegisterFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
    },
  });

  // Handle form submission
  const handleSubmit: SubmitHandler<CollectionRegisterFormData> = (values) => {
    if (orgId) {
      addCollectionRegisterApiCall(values, orgId);
    } else {
      toast.error("Somthing went wrong");
    }
  };

  const now = new Date();

  // Get individual components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  let hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Determine AM or PM and adjust hours for 12-hour format
  const ampm = Number(hours) >= 12 ? "PM" : "AM";
  hours = (Number(hours) % 12 || 12).toString(); // Convert 0 to 12 for midnight
  hours = String(hours).padStart(2, "0");

  // Format the date and time
  const currentDate = `${year}-${month}-${day}`;
  const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  const calculateTotal = (field: keyof CollectionRegisterTableData) => {
    return collectionRegisterTableData?.reduce((total, item) => {
      const value = item[field];
      // Convert value to number, treating null or empty as 0
      const numericValue = value ? parseFloat(value as string) : 0;
      return total + numericValue;
    }, 0);
  };

  const totalQuantity = calculateTotal("Qnty");
  const totalBasic = calculateTotal("Basic");
  const totalInsurance = calculateTotal("Insurance");
  const totalRms = calculateTotal("Rms_Fee");
  const totalDrying = calculateTotal("Drying_Fee");
  const totalAdvance = calculateTotal("Adv_Amt");

  const convertTableData = (data: CollectionRegisterTableData[]) => {
    return data.map((item, index) => [
      (index + 1).toString(), // Serial No.
      format(item.Rel_Date, "dd-MM-yyyy"), // Date
      item.Cust_Name, // Particulars
      item.Address || "", // Interest
      item.Mobile || "", // Withdrawals
      item.Qnty, // Balance
      item.Basic, // Balance
      item.Insurance, // Balance
      item.Rms_Fee, // Balance
      item.Drying_Fee, // Balance
      item.Adv_Amt, // Balance
    ]);
  };

  const handleDownloadPdf = (): void => {
    if (collectionRegisterTableData.length > 0) {
      const doc = new jsPDF("l", "mm", "a4") as jsPDF & {
        internal: {
          getNumberOfPages: () => number;
        };
      };

      const getTextWidth = (text: string, fontSize = 10): number => {
        doc.setFontSize(fontSize);
        return doc.getTextWidth(text);
      };

      const headers = [
        "Sl",
        "Release Date",
        "Customer Name",
        "Address",
        "Mobile",
        "Quantity",
        "Basic",
        "Insurance",
        "Rms Fees",
        "Drying Fees",
        "Advance Amount",
      ];

      const pdfTableData = convertTableData(collectionRegisterTableData);

      let finalY = 50; // Start position for the first row
      let grandTotalPage = false; // Track if grand total is on a new page

      // Draw the table first
      autoTable(doc, {
        head: [headers],
        body: pdfTableData,
        startY: finalY,
        margin: { horizontal: 6 },
        headStyles: {
          fillColor: [255, 255, 255], // White background for header
          textColor: [0, 0, 0], // Black text for header
          fontStyle: "bold", // Bold font style for header
        },
        styles: {
          overflow: "linebreak",
          fontSize: 10,
          lineColor: [0, 0, 0],
          lineWidth: 0.3,
          valign: "middle",
          minCellHeight: 14,
          fillColor: [255, 255, 255], // White background for all cells
        },
        columnStyles: {
          0: { cellWidth: 15, halign: "center" },
          1: { cellWidth: 25 },
          2: { cellWidth: 30 },
          3: { cellWidth: 40 },
          4: { cellWidth: 25 },
          5: { cellWidth: 25 },
          6: { cellWidth: 25 },
          7: { cellWidth: 25 },
          8: { cellWidth: 25 },
          9: { cellWidth: 25 },
          10: { cellWidth: 25 },
        },
        didDrawPage: (data) => {
          const pageWidth = doc.internal.pageSize.width;
          let startY = 7;

          if (data.pageNumber === 1) {
            const orgDetailsArray = [orgName, orgAddress, orgMobile, orgReg];

            doc.setFontSize(14);
            orgDetailsArray.forEach((detail, index) => {
              if (detail) {
                const detailTextWidth = getTextWidth(detail.toString(), 14);
                const detailXPos = (pageWidth - detailTextWidth) / 2;
                doc.text(detail.toString(), detailXPos, startY + index * 8);
              }
            });

            startY += orgDetailsArray.length * 6;
          }

          const headerText = `Collection Register From ${
            fromDate && format(fromDate, "dd-MM-yyyy")
          } To ${toDate && format(toDate, "dd-MM-yyyy")}`;
          const textWidth = getTextWidth(headerText, 16);
          const xPos = (pageWidth - textWidth) / 2;

          doc.setFontSize(16);
          doc.setTextColor(40);
          doc.text(
            headerText,
            xPos,
            data.pageNumber === 1 ? startY + 12 : startY + 2
          );

          const footerY = doc.internal.pageSize.height - 10;
          const rightText = `Generated On: ${currentDate} ${currentTime}`;
          const middleText = `This is a computer-generated report and does not require a signature.`;

          doc.setFontSize(12);
          const rightTextWidth = getTextWidth(rightText, 10);
          doc.text(rightText, pageWidth - rightTextWidth - 5, footerY);

          const middleTextWidth = getTextWidth(middleText, 10);
          const middleXPos = (pageWidth - middleTextWidth) / 2;
          doc.setTextColor(128, 128, 128);
          doc.text(middleText, middleXPos, footerY + 5);

          doc.setTextColor(0, 0, 0);

          doc.text(
            `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
            data.settings.margin.left,
            doc.internal.pageSize.height - 5
          );

          finalY = data.cursor ? data.cursor.y : 0; // Store the final Y position of the last row
        },
      });

      // Check the remaining space for the Grand Total row
      const pageHeight = doc.internal.pageSize.height;
      const spaceLeft = pageHeight - finalY - 10; // Space left on the page
      const grandTotalRowHeight = 20; // Height of the Grand Total row (adjust as needed)

      if (spaceLeft >= grandTotalRowHeight) {
        // If there's enough space for the Grand Total on the current page
        autoTable(doc, {
          body: [
            [
              {
                content: "Grand Total",
                colSpan: 5,
                styles: { halign: "center", fontStyle: "bold" },
              },
              {
                content: totalQuantity.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalBasic.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalInsurance.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalRms.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalDrying.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalAdvance.toFixed(2),
                styles: { fontStyle: "bold" },
              },
            ],
          ],
          startY: finalY, // Start below the last row of the table
          margin: { horizontal: 6 },
          styles: {
            overflow: "linebreak",
            fontSize: 10,
            fontStyle: "bold",
            lineColor: [0, 0, 0],
            lineWidth: 0.3,
            valign: "middle",
            minCellHeight: 14,
            fillColor: [255, 255, 255],
          },
          columnStyles: {
            0: { cellWidth: 15, halign: "center" },
            1: { cellWidth: 25 },
            2: { cellWidth: 30 },
            3: { cellWidth: 40 },
            4: { cellWidth: 25 },
            5: { cellWidth: 25 },
            6: { cellWidth: 25 },
            7: { cellWidth: 25 },
            8: { cellWidth: 25 },
            9: { cellWidth: 25 },
            10: { cellWidth: 25 },
          },
        });
      } else {
        // Not enough space, so add a new page
        doc.addPage();
        grandTotalPage = true; // Mark that Grand Total is on a new page

        // Redraw the header and footer if Grand Total is on a new page
        const pageWidth = doc.internal.pageSize.width;
        const startY = 7;
        const headerText = `Collection Register From ${
          fromDate && format(fromDate, "dd-MM-yyyy")
        } To ${toDate && format(toDate, "dd-MM-yyyy")}`;
        const textWidth = getTextWidth(headerText, 16);
        const xPos = (pageWidth - textWidth) / 2;

        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.text(headerText, xPos, startY + 2);

        const footerY = doc.internal.pageSize.height - 10;
        const rightText = `Generated On: ${currentDate} ${currentTime}`;
        const middleText = `This is a computer-generated report and does not require a signature.`;

        doc.setFontSize(12);
        const rightTextWidth = getTextWidth(rightText, 10);
        doc.text(rightText, pageWidth - rightTextWidth - 5, footerY);

        const middleTextWidth = getTextWidth(middleText, 10);
        const middleXPos = (pageWidth - middleTextWidth) / 2;
        doc.setTextColor(128, 128, 128);
        doc.text(middleText, middleXPos, footerY + 5);

        doc.setTextColor(0, 0, 0);

        doc.text(
          `Page ${doc.internal.getNumberOfPages()} of ${doc.internal.getNumberOfPages()}`,
          6,
          doc.internal.pageSize.height - 5
        );

        autoTable(doc, {
          body: [
            [
              {
                content: "Grand Total",
                colSpan: 5,
                styles: { halign: "center", fontStyle: "bold" },
              },
              {
                content: totalQuantity.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalBasic.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalInsurance.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalRms.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalDrying.toFixed(2),
                styles: { fontStyle: "bold" },
              },
              {
                content: totalAdvance.toFixed(2),
                styles: { fontStyle: "bold" },
              },
            ],
          ],
          startY: 15, // Start the Grand Total row at the top of the new page
          margin: { horizontal: 6 },
          styles: {
            overflow: "linebreak",
            fontSize: 10,
            fontStyle: "bold",
            lineColor: [0, 0, 0],
            lineWidth: 0.3,
            valign: "middle",
            minCellHeight: 14,
            fillColor: [255, 255, 255],
          },
          columnStyles: {
            0: { cellWidth: 15, halign: "center" },
            1: { cellWidth: 25 },
            2: { cellWidth: 30 },
            3: { cellWidth: 40 },
            4: { cellWidth: 25 },
            5: { cellWidth: 25 },
            6: { cellWidth: 25 },
            7: { cellWidth: 25 },
            8: { cellWidth: 25 },
            9: { cellWidth: 25 },
            10: { cellWidth: 25 },
          },
        });
      }

      doc.save("collectionRegister.pdf");
    } else {
      toast.error("No data found to download");
    }
  };

  const addCollectionRegisterApiCall = async (
    item: CollectionRegisterFormData,
    orgId: number
  ) => {
    setLoading(true);

    const data = {
      org_id: orgId,
      form_date: format(item.fromDate, "yyyy-MM-dd"),
      to_date: format(item.toDate, "yyyy-MM-dd"),
    };

    try {
      const res: ApiResponse = await addCollectionRegisterAPI(data);

      if (res.status === 200) {
        setFromDate(item.fromDate);
        setToDate(item.toDate);
        form.reset();
        setCollectionRegisterTableData(res.data.details);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        setCollectionRegisterTableData([]);
        setFromDate(null);
        setToDate(null);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setCollectionRegisterTableData([]);
      setFromDate(null);
      setToDate(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    form,
    handleSubmit,
    collectionRegisterTableData,
    handleDownloadPdf,
    totalQuantity,
    totalBasic,
    totalInsurance,
    totalRms,
    totalDrying,
    totalAdvance,
  };
};
