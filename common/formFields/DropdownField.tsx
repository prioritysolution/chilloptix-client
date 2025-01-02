"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { FieldValues, Control, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  variant?: "bordered" | "flat" | "faded" | undefined;
  className?: string;
  options: Array<{ [key: string]: any; Id: string | number }>;
  optionLabelKey?: string; // Dynamic label field key
  disabled?: boolean;
}

const DropdownField = <T extends FieldValues>({
  control,
  name,
  label = "Option",
  size = "lg",
  radius = "sm",
  variant = "bordered",
  className,
  options,
  optionLabelKey = "Option_Value", // Dynamic label field key
  disabled = false,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full flex flex-col gap-[5px]">
          <FormLabel className="text-base font-normal">{label}</FormLabel>
          <FormControl>
            <Autocomplete
              className={cn("w-full ", className)}
              defaultItems={options}
              label={`Select ${label?.toLowerCase()}`}
              labelPlacement="outside"
              variant={variant}
              radius={radius}
              size={size}
              isDisabled={disabled}
              isInvalid={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              selectedKey={field.value} // Set the selected value
              onSelectionChange={(key) => field.onChange(key?.toString())} // Convert key to string
              listboxProps={{ emptyContent: `No ${label.toLowerCase()} found` }}
            >
              {(item) => (
                <AutocompleteItem key={item.Id} value={item.Id.toString()}>
                  {item[optionLabelKey]}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DropdownField;
