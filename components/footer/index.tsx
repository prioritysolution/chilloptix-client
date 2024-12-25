"use client";

import getCookieData from "@/utils/getCookieData";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setStartDate(
        getCookieData<string | null>("chilloptixClientFinStartDate")
      );
      setEndDate(getCookieData<string | null>("chilloptixClientFinEndDate"));
    }
  }, []);

  const currentDate = new Date();

  return (
    <div className="w-full h-[60px] bg-primary text-white flex items-center justify-between gap-1 px-2 text-xs sm:text-base lg:text-lg">
      <div>
        <p className="">
          Design and developed by :{" "}
          <Link
            href={`https://prioritysolutions.in`}
            target="_blank"
            size="lg"
            underline="hover"
            className="font-medium text-white"
          >
            Priority Solution
          </Link>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <span>Financial year : </span>
        {!startDate ? (
          <Skeleton className="h-[20px] w-[50px] bg-secondary" />
        ) : (
          startDate?.slice(0, 4)
        )}{" "}
        -{" "}
        {!endDate ? (
          <Skeleton className="h-[20px] w-[50px] bg-secondary" />
        ) : (
          endDate?.slice(0, 4)
        )}
      </div>
      <p>
        Date :{" "}
        <span>{currentDate.toString().slice(0, 15).replace(/ /g, ", ")}</span>
      </p>
    </div>
  );
};

export default Footer;
