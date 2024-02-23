import { useMemo, useState } from "react";
import Select, {
  CSSObjectWithLabel,
  InputActionMeta,
  MultiValue,
} from "react-select";
import {
  Control,
  FieldValues,
  useController,
  FieldPath,
  PathValue,
  Path,
} from "react-hook-form";
import classNames from "classnames";
import styles from "./MultiSelect.module.scss";
import { Option } from "@/app/lib/types";

export interface MultiSelectProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  className?: string;
  maxLength?: number;
  isLoading?: boolean;
  inputValue?: string;
  onInputChange?: (inputText: string, meta: InputActionMeta) => void;
  options?: Option[];
  control: Control<TFieldValues>;
}

export default function MultiSelect<TFieldValues extends FieldValues>({
  name,
  maxLength = 3,
  control,
  options,
  isLoading,
  inputValue,
  onInputChange,
  className,
}: MultiSelectProps<TFieldValues>) {
  const {
    field: { onChange, value },
  } = useController<TFieldValues>({
    control,
    name,
  });

  const valueProps = {
    value,
    isOptionDisabled: () => value.length >= maxLength,
  };

  const props = useMemo(
    () => ({
      name,
      ["aria-label"]: `${name}_multiselect`,
      inputId: name,
      className: classNames([styles.container, className]),
      filterOption: null,
      styles: {
        control: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          borderColor: "black",
        }),
      },
      onChange: (newValue: MultiValue<Option>) => {
        const newValues = newValue.map(({ value, label }) => ({
          value,
          label,
        }));
        onChange(newValues as PathValue<TFieldValues, Path<TFieldValues>>);
      },
    }),
    [className, name, onChange]
  );

  return (
    <Select<Option, true>
      {...valueProps}
      {...props}
      isMulti={true}
      options={options}
      onInputChange={onInputChange}
      inputValue={inputValue}
      isLoading={isLoading}
    />
  );
}
