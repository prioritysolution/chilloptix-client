"use client";

import { ReactNode } from "react";
import { Input } from "@nextui-org/react";
import { FieldValues, Control, Path } from "react-hook-form";

import { FormControl, FormField, FormItem } from "@/components/ui/form";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  type?: string;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  variant?: "bordered" | "underlined" | "flat" | "faded" | undefined;
  labelPlacement?: "inside" | "outside" | "outside-left";
  placeholder?: string;
  className?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  disabled?: boolean;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  size = "lg",
  radius = "sm",
  variant = "bordered",
  labelPlacement = "outside",
  placeholder,
  className,
  endContent,
  startContent,
  disabled = false,
  onInput,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              label={label}
              type={type}
              size={size}
              radius={radius}
              variant={variant}
              labelPlacement={labelPlacement}
              placeholder={placeholder}
              aria-label={label}
              className={className}
              endContent={endContent}
              startContent={startContent}
              isInvalid={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              isReadOnly={disabled}
              disabled={disabled}
              onInput={onInput}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default InputField;
