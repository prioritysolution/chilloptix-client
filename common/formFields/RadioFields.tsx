"use client";

import { Radio, RadioGroup } from "@nextui-org/react";
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
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  orientation?: "vertical" | "horizontal" | undefined;
  className?: string;
  options: Array<{ value: string; label: string }>;
}

const RadioField = <T extends FieldValues>({
  control,
  name,
  label = "Option",
  size = "lg",
  color = "primary",
  orientation = "vertical",
  className,
  options,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("w-full ", className)}>
          <FormLabel
            className={cn(
              "text-base font-normal",
              !!fieldState?.error?.message && "text-danger"
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <div className="border-2 rounded-small border-default py-2 px-3 gap-3">
              <RadioGroup
                isInvalid={!!fieldState?.error?.message}
                value={field.value}
                onValueChange={field.onChange}
                color={color}
                size={size}
                orientation={orientation}
              >
                {options.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioField;
