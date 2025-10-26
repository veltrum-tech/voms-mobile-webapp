import type { HTMLAttributes } from "react";
import { useField, type FieldHookConfig, Field, type FieldProps } from "formik";

import { Input, CheckBox, InputWithIcon, Textarea } from "./input";
import { TypographySmall } from "./typography";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "../../../lib/utils";
import type {
  FnWithNoArgAndVoidReturnType,
  IconPositionType,
  IconType,
  LabelPositionType,
  SelectOption,
} from "../../models";

type FieldInputProps = FieldHookConfig<string> & {
  label?: string;
  labelPosition?: LabelPositionType;
  placeholder?: string;
  as?: string;
  rows?: number;
  showIcon?: boolean;
  icon?: IconType;
  iconPosition?: IconPositionType;
  onIconClick?: FnWithNoArgAndVoidReturnType;
  containerClassName?: string;
  errors?: string[];
};

const FieldInput = ({
  label,
  as = "vertical",
  className,
  containerClassName,
  ...props
}: FieldInputProps) => {
  const [field, meta] = useField(props);
  const {
    id,
    name,
    type,
    disabled,
    placeholder,
    showIcon = false,
    iconPosition = "right",
    onIconClick,
  } = props;

  return (
    <div
      className={cn(
        "flex",
        {
          "flex-col gap-1.5": as === "vertical",
        },
        containerClassName
      )}
    >
      {label && (
        <label htmlFor={id || name} className="text-sm">
          {label}
        </label>
      )}

      {showIcon && props?.icon ? (
        <InputWithIcon
          {...field}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          icon={props?.icon}
          iconPosition={iconPosition}
          onIconClick={onIconClick}
          className={className}
        />
      ) : (
        <Input
          {...field}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
        />
      )}

      {meta.touched && meta.error && (
        <TypographySmall className="text-red-400">
          {meta.error}
        </TypographySmall>
      )}
    </div>
  );
};

const CheckBoxFieldInput = ({
  label,
  labelPosition = "right",
  className,
  containerClassName,
  ...props
}: FieldInputProps) => {
  const [field, meta] = useField(props);
  const { id, name, disabled } = props;

  return (
    <div className={cn(containerClassName)}>
      {label ? (
        <span className="flex items-center gap-1.5">
          <CheckBox
            {...field}
            id={id}
            name={name}
            disabled={disabled}
            className={className}
          />
          <label
            htmlFor={id || name}
            className={cn("text-sm", {
              "-order-1": labelPosition === "left",
            })}
          >
            {label}
          </label>
        </span>
      ) : (
        <CheckBox
          {...field}
          id={id}
          name={name}
          disabled={disabled}
          className={className}
        />
      )}

      {meta.touched && meta.error && (
        <TypographySmall className="mt-1.5 text-accent-6">
          {meta.error}
        </TypographySmall>
      )}
    </div>
  );
};

const SelectFieldInput = ({
  name,
  label,
  placeholder,
  options,
  className,
  containerClassName,
}: FieldInputProps & { options: SelectOption[] }) => {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      {label && <label className="text-sm">{label}</label>}
      <Field name={name}>
        {({ form, meta }: FieldProps) => (
          <div>
            <Select
              value={form["values"][name]}
              onValueChange={(value) => form.setFieldValue(name, value)}
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {!options?.length ? (
                  <SelectGroup>
                    <SelectLabel>No options</SelectLabel>
                  </SelectGroup>
                ) : (
                  options.map((option: SelectOption) => (
                    <SelectGroup key={option.id}>
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    </SelectGroup>
                  ))
                )}
              </SelectContent>
            </Select>

            {meta.touched && meta.error && (
              <TypographySmall className="text-accent-6">
                {meta.error}
              </TypographySmall>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

const TextareaFieldInput = ({
  label,
  disabled,
  placeholder,
  rows = 3,
  as = "vertical",
  className,
  containerClassName,
  ...props
}: FieldInputProps) => {
  const [field, meta] = useField(props);
  const { id, name } = props;

  return (
    <div
      className={cn(
        "flex",
        {
          "flex-col gap-1.5": as === "vertical",
        },
        containerClassName
      )}
    >
      {label && (
        <label htmlFor={id || name} className="text-sm">
          {label}
        </label>
      )}

      <Textarea
        {...field}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={className}
      />

      {meta.touched && meta.error && (
        <TypographySmall className="text-accent-6">
          {meta.error}
        </TypographySmall>
      )}
    </div>
  );
};

const FieldSkeleton = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <label>&nbsp;</label>
      {children}
    </div>
  );
};

export {
  FieldInput,
  CheckBoxFieldInput,
  SelectFieldInput,
  TextareaFieldInput,
  FieldSkeleton,
};
