"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@nextui-org/react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  startYear?: number;
  endYear?: number;
  disabledDateBefore?: Date; // Optional: Disable dates before the given date
  disabledDateAfter?: Date; // Optional: Disable dates after the given date
  disabled?: boolean;
}

export function DatePickerField<T extends FieldValues>({
  control,
  name,
  label,
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  disabledDateBefore,
  disabledDateAfter,
  disabled = false,
}: DatePickerProps<T>) {
  const [open, setOpen] = React.useState(false); // State to control popover visibility

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  // Update the month in the date
  const handleMonthChange = (date: Date, month: string) => {
    return setMonth(date, months.indexOf(month));
  };

  // Update the year in the date
  const handleYearChange = (date: Date, year: string) => {
    return setYear(date, parseInt(year));
  };

  const handleSelect = (selectedData: Date | undefined) => {
    setOpen(false);
    return selectedData;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel
            className={cn(
              "text-base font-normal",
              !!fieldState?.error?.message && "text-danger"
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Popover open={open && !disabled} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  className={cn(
                    "w-full flex items-center justify-between",
                    !field.value && "text-muted-foreground",
                    !!fieldState?.error?.message && "border-danger text-danger"
                  )}
                  isDisabled={disabled}
                >
                  {field.value ? (
                    format(field.value, "dd-MM-yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                style={{
                  zIndex: 1050, // Popover content's z-index
                  position: "relative", // Ensures that the PopoverContent itself stays in place
                }}
              >
                <div className="flex justify-between p-2 gap-2">
                  <Select
                    onValueChange={(month) =>
                      field.onChange(
                        handleMonthChange(field.value || new Date(), month)
                      )
                    }
                    value={months[getMonth(field.value || new Date())]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        zIndex: 1200, // Ensure that the dropdown appears above the popover content
                        position: "absolute", // Ensures it does not get overlapped by other content
                      }}
                    >
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(year) =>
                      field.onChange(
                        handleYearChange(field.value || new Date(), year)
                      )
                    }
                    value={getYear(field.value || new Date()).toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        zIndex: 1200, // Ensure that the dropdown appears above the popover content
                        position: "absolute", // Ensures it does not get overlapped by other content
                      }}
                    >
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(selectedDate) =>
                    field.onChange(handleSelect(selectedDate))
                  }
                  initialFocus
                  month={field.value || new Date()}
                  onMonthChange={(date) => field.onChange(date)}
                  disabled={(date) => {
                    if (disabledDateBefore && date < disabledDateBefore)
                      return true;
                    if (disabledDateAfter && date > disabledDateAfter)
                      return true;
                    return false;
                  }}
                />
              </PopoverContent>
            </Popover>
          </FormControl>

          {fieldState?.error && (
            <FormMessage className="text-danger text-sm font-normal" />
          )}
        </FormItem>
      )}
    />
  );
}
