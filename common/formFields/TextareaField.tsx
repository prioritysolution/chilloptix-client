"use client";

import { Textarea } from "@nextui-org/react";
import { FieldValues, Control, Path } from "react-hook-form";

import { FormControl, FormField, FormItem } from "@/components/ui/form";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  variant?: "bordered" | "underlined" | "flat" | "faded" | undefined;
  labelPlacement?: "inside" | "outside" | "outside-left";
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const TextareaField = <T extends FieldValues>({
  control,
  name,
  label,
  size = "lg",
  radius = "sm",
  variant = "bordered",
  labelPlacement = "outside",
  placeholder,
  className,
  disabled = false,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Textarea
              label={label}
              size={size}
              radius={radius}
              variant={variant}
              labelPlacement={labelPlacement}
              placeholder={placeholder}
              aria-label={label}
              className={className}
              isInvalid={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              disabled={disabled}
              isReadOnly={disabled}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TextareaField;
