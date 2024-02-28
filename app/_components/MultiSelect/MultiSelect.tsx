import { useMemo } from "react";
import Select, { CSSObjectWithLabel, MultiValue } from "react-select";
import Async from "react-select/async";
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
  loadOptions?: (inputValue: string) => Promise<Option[]>;
  options?: Option[];
  control: Control<TFieldValues>;
}

export default function MultiSelectC<TFieldValues extends FieldValues>({
  name,
  maxLength = 3,
  loadOptions,
  control,
  options,
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

  return loadOptions ? (
    <Async<Option, true>
      {...valueProps}
      {...props}
      isMulti={true}
      loadOptions={loadOptions}
    />
  ) : (
    <Select<Option, true>
      {...valueProps}
      {...props}
      isMulti={true}
      options={options}
    />
  );
}
