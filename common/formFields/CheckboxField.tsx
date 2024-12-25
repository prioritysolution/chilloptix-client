"use client";

import { Checkbox } from "@nextui-org/react";
import { FieldValues, Control, Path } from "react-hook-form";

import { FormControl, FormField, FormItem } from "@/components/ui/form";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  className?: string;
}

const CheckboxField = <T extends FieldValues>({
  control,
  name,
  label,
  color = "default",
  className,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="border-2 border-default px-6 h-12 rounded-small flex items-center text-medium gap-3 self-end">
          <FormControl>
            <Checkbox
              isSelected={field.value}
              onValueChange={field.onChange}
              isInvalid={!!fieldState?.error?.message}
              color={color}
              className={className}
            >
              {label}
            </Checkbox>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
