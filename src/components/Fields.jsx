import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { PatternFormat, NumericFormat } from "react-number-format";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete } from "@mui/material";
import moment from "moment";

export const Textfield = ({ name, control, ...textfield }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { ref, value, onChange } = field;

        return (
          <TextField
            {...textfield}
            inputRef={ref}
            value={value}
            onChange={onChange}
          />
        );
      }}
    />
  );
};

export const Patternfield = ({ name, control, ...numberfield }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value = null, onChange } = field;

        return (
          <PatternFormat
            {...numberfield}
            customInput={TextField}
            value={value}
            onValueChange={(data) => {
              if (!data.value) return onChange(null);

              onChange(data.value);
            }}
          />
        );
      }}
    />
  );
};

export const Numberfield = ({
  name,
  control,
  keepPrefix = false,
  ...numberfield
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value = null, onChange } = field;

        return (
          <NumericFormat
            {...numberfield}
            customInput={TextField}
            value={value}
            onValueChange={(data) => {
              if (!data.value) return onChange(null);

              if (keepPrefix) return onChange(data.formattedValue);

              onChange(Number(data.value));
            }}
          />
        );
      }}
    />
  );
};

export const Datepicker = ({ name, control, ...datepicker }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value = null, onChange } = field;

        return (
          <DatePicker
            {...datepicker}
            value={value}
            onChange={(value) => {
              if (!moment(value).isValid()) return;

              onChange(moment(value).format());
            }}
          />
        );
      }}
    />
  );
};

export const AutoComplete = ({
  name,
  control,
  onChange: onValueChange,
  ...autocomplete
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value, onChange: setValue } = field;

        return (
          <Autocomplete
            {...autocomplete}
            value={value}
            onChange={(e, value) => {
              if (onValueChange) return setValue(onValueChange(e, value));

              setValue(value);
            }}
          />
        );
      }}
    />
  );
};
