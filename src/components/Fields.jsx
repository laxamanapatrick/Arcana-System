import React from "react";
import { Controller } from "react-hook-form";
import { IconButton, TextField } from "@mui/material";
import { PatternFormat, NumericFormat } from "react-number-format";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete } from "@mui/material";
import moment from "moment";
import SignatureCanvas from "react-signature-canvas";
import Webcam from "react-webcam";
import { useDropzone } from "react-dropzone";
import { AttachFile, CameraAlt, Close } from "@mui/icons-material";

export const Textfield = ({ name, control, ...textfield }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { ref, value, onChange } = field;

        return (
          <TextField
            fullWidth
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

export const SignatureField = ({ name, control, ...signatureProps }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SignatureCanvas
          ref={(ref) => field.onChange(ref?.toDataURL())}
          {...signatureProps}
        />
      )}
    />
  );
};

export const WebcamField = ({
  name,
  control,
  screenshotFormat,
  ...webcamProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          {field.value ? (
            <Webcam
              audio={false}
              screenshotFormat={screenshotFormat ? screenshotFormat : "image/png"}
              {...webcamProps}
            />
          ) : (
            <IconButton onClick={() => field.onChange(true)}>
              <CameraAlt fontSize="50px" />
            </IconButton>
          )}
          {field.value && (
            <IconButton onClick={() => field.onChange(null)}>
              <Close />
            </IconButton>
          )}
        </div>
      )}
    />
  );
};

export const DropzoneField = ({ name, control, ...dropzoneProps }) => {
  const { getRootProps, getInputProps } = useDropzone({
    ...dropzoneProps,
    onDrop: (acceptedFiles) => {
      // Handle dropped files
    },
  });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]} // Initialize defaultValue as an empty array
      render={({ field }) => (
        <div>
          <div {...getRootProps()} style={{ border: "1px solid gray" }}>
            <AttachFile />
            <input {...getInputProps()} />
          </div>
        </div>
      )}
    />
  );
};
