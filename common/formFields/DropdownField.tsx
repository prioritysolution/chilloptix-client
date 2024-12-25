"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { FieldValues, Control, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  variant?:
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "solid"
    | "light"
    | "ghost"
    | undefined;
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
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full flex flex-col gap-[5px]">
          <FormLabel className="text-base font-normal">{label}</FormLabel>
          <FormControl>
            <Popover
              isOpen={open}
              onOpenChange={setOpen}
              backdrop="opaque"
              showArrow
              triggerScaleOnOpen={false}
              size="lg"
            >
              <PopoverTrigger asChild>
                <Button
                  variant={variant}
                  radius={radius}
                  size={size}
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground",
                    !!fieldState?.error?.message && "border-danger text-danger",
                    className
                  )}
                  onPress={() => setOpen(!open)}
                  isDisabled={disabled}
                >
                  {field.value
                    ? options.find(
                        (option) => option.Id.toString() === field.value
                      )?.[optionLabelKey]
                    : `Select ${label?.toLowerCase()}`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[300px]">
                <Command className="">
                  <CommandInput
                    placeholder={`Search ${label?.toLowerCase()}...`}
                  />
                  <CommandList>
                    <CommandEmpty>
                      No {label?.toLowerCase()} found.
                    </CommandEmpty>

                    <CommandGroup>
                      {options &&
                        options.length > 0 &&
                        options.map((option) => (
                          <CommandItem
                            key={option.Id}
                            onSelect={() => {
                              field.onChange(option.Id.toString());
                              setOpen(false);
                            }} // Save Id as value
                          >
                            {option[optionLabelKey]}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DropdownField;
