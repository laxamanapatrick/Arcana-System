import React, { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  Stack,
  TextField as MuiTextField,
  useTheme,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../../services/store/disclosureSlice";
import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { freebieSchema } from "../../../../schema";
import { AutoComplete, Textfield } from "../../../../components/Fields";
import {
  useCreateRequestFreebieMutation,
  useCreateUpdateFreebieInformationMutation,
  useGetItemsQuery,
} from "../../../../services/api";
import { Add, Cancel } from "@mui/icons-material";
import { setSelectedRow } from "../../../../services/store/selectedRowSlice";
import {
  BasicToast,
  InteractiveToast,
} from "../../../../components/SweetAlert-Components";

export const FreebieForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { defaultButtonStyle } = useDefaultStyles();
  const { isFreebieForm } = useSelector((state) => state.disclosure.drawers);

  const { data: itemData } = useGetItemsQuery();
  const { selectedRowData } = useSelector((state) => state.selectedRowData);

  const clientId = selectedRowData?.clientId
    ? selectedRowData?.clientId
    : selectedRowData?.id;

  const defaultFreebieValues = selectedRowData?.freebies?.map((item) => {
    const selectedItem = itemData?.data?.items?.find(
      (option) => option?.itemCode === item?.itemCode
    );

    return {
      items: selectedItem || null,
      quantity: item?.quantity || "",
    };
  });

  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(freebieSchema),
    mode: "onChange",
    defaultValues: {
      clientId: "",
      freebies: [
        {
          items: null,
          quantity: "",
        },
      ],
    },
  });

  useEffect(() => {
    setValue("clientId", clientId);
    if (selectedRowData?.freebies?.length > 0) {
      setValue("freebies", defaultFreebieValues);
    }

    return () => {
      setValue("clientId", clientId);
      setValue("freebies", [
        {
          items: null,
          quantity: "",
        },
      ]);
    };
  }, [selectedRowData]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "freebies",
  });

  const freebieData = useWatch({
    control,
    name: "freebies",
  });

  const [requestFreebie] = useCreateRequestFreebieMutation();
  const [updateFreebieInformation] =
    useCreateUpdateFreebieInformationMutation();
  const onSubmit = async (data) => {
    const addPayload = {
      clientId: data?.clientId,
      freebies: data?.freebies?.map((item) => {
        return {
          itemId: item?.items?.id,
          quantity: item?.quantity,
        };
      }),
    };
    const editPayload = {
      freebies: data?.freebies?.map((item) => {
        return {
          itemId: item?.items?.id,
          quantity: item?.quantity,
        };
      }),
    };
    const uniqueItems = new Set();
    const isDuplicate = freebieData.some((item) => {
      if (uniqueItems.has(item.items?.id)) {
        return true;
      }
      uniqueItems.add(item.items?.id);
      return false;
    });
    if (isDuplicate) {
      InteractiveToast(
        "Duplicate Items",
        "You are not allowed to provide\nduplicate products in one freebie form",
        "warning",
        "Return"
      );
      return;
    }
    try {
      if (!selectedRowData?.clientId) {
        await requestFreebie(addPayload).unwrap();
        BasicToast(
          "success",
          `Freebies requested for ${selectedRowData?.ownersName}`,
          1500
        );
      } else {
        await updateFreebieInformation({
          payload: editPayload,
          id: data?.clientId,
          freebieId: selectedRowData?.clientId ? selectedRowData?.id : "",
        }).unwrap();
        BasicToast(
          "success",
          `Freebies updated for ${selectedRowData?.ownersName}`,
          1500
        );
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(toggleDrawer("isFreebieForm"));
  };

  return (
    <Drawer
      open={isFreebieForm}
      onClose={() => {}}
      sx={{
        "& .MuiDrawer-paper": {
          width: 965,
          height: "100%",
          background: "none",
          bgcolor: "white",
          ...defaultButtonStyle,
        },
      }}
      anchor="right"
    >
      <form style={{ height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ height: "100%" }}>
          <Box
            sx={{
              height: "6%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.primary.main,
              fontWeight: "bold",
            }}
          >
            Freebie Form
          </Box>
          <Divider
            sx={{
              height: "1.5px",
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.secondary.main,
            }}
          />

          <Box
            sx={{
              height: "100%",
              p: 2,
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {fields.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  gap: 1,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Textfield
                  name={`freebies[${index}].quantity`}
                  control={control}
                  label="Quantity"
                  size="small"
                  autoComplete="off"
                  error={!!errors?.freebies?.[index]?.quantity}
                  helperText={errors?.freebies?.[index]?.quantity?.message}
                  sx={{ width: "10%" }}
                  type="number"
                  inputProps={{
                    min: 1,
                  }}
                  onWheel={(e) => e.target.blur()}
                  onKeyDown={(e) =>
                    ["E", "e", ".", "+", "-"].includes(e.key) &&
                    e.preventDefault()
                  }
                  onPaste={(e) => e.preventDefault()}
                />

                <AutoComplete
                  sx={{ width: "20%" }}
                  name={`freebies[${index}].items`}
                  control={control}
                  options={itemData?.data?.items}
                  getOptionLabel={(option) => option?.itemCode}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      label="Product Code"
                      size="small"
                      error={!!errors?.freebies?.[index]?.items}
                      helperText={errors?.freebies?.[index]?.items?.message}
                    />
                  )}
                  disablePortal
                  disableClearable
                />

                <MuiTextField
                  title={
                    item?.items?.itemDescription
                      ? `Item Category for ${item?.items?.itemCode}. This field is not editable.`
                      : ""
                  }
                  value={watch("freebies")[index]?.items?.itemDescription || ""}
                  label="Item Description"
                  size="small"
                  inputProps={{
                    readOnly: true,
                    style: {
                      cursor: "not-allowed",
                    },
                  }}
                />

                <MuiTextField
                  title={
                    item?.items?.uom
                      ? `UOM for ${item?.items?.itemCode}. This field is not editable.`
                      : ""
                  }
                  value={watch("freebies")[index]?.items?.uom || ""}
                  label="UOM"
                  size="small"
                  inputProps={{
                    readOnly: true,
                    style: {
                      cursor: "not-allowed",
                    },
                  }}
                />

                <IconButton type="button" onClick={() => remove(index)}>
                  <Cancel />
                </IconButton>
              </Box>
            ))}
            <Box display="flex" justifyContent="end" mt={2}>
              <Button
                type="button"
                disabled={fields?.length === 5}
                startIcon={
                  fields?.length === 5 ? "" : <Add sx={{ mb: "2px" }} />
                }
                sx={{
                  width: fields?.length === 5 ? "auto" : "120px",
                  fontSize: "11px",
                  color: theme.palette.common.white,
                  bgcolor: theme.palette.secondary.main,
                  ":hover": {
                    color: theme.palette.common.white,
                    bgcolor: theme.palette.primary.main,
                    variant: "contained",
                  },
                  ":disabled": {
                    color: theme.palette.common.white,
                    bgcolor: "#6c5982",
                    border: `none`,
                    "&.MuiButtonBase-root:disabled": {
                      cursor: "not-allowed",
                      pointerEvents: "auto",
                    },
                  },
                }}
                size="small"
                onClick={() => {
                  append({ items: null, quantity: "" });
                }}
              >
                {fields?.length === 5
                  ? "Only a maximum of 5 freebies allowed"
                  : "Add Freebie"}
              </Button>
            </Box>
          </Box>

          <Divider
            sx={{
              height: "1.5px",
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.secondary.main,
            }}
          />
          <ButtonGroup sx={{ gap: 1, m: 1, justifyContent: "end" }}>
            <Button
              type="submit"
              tabIndex={0}
              disabled={fields?.length === 0}
              sx={{
                fontSize: "11px",
                width: "90px",
                color: theme.palette.common.white,
                bgcolor: theme.palette.secondary.main,
                ":hover": {
                  color: theme.palette.common.white,
                  bgcolor: theme.palette.primary.main,
                  variant: "contained",
                },
                ":disabled": {
                  color: theme.palette.common.white,
                  bgcolor: "#6c5982",
                  border: `none`,
                  "&.MuiButtonBase-root:disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto",
                  },
                },
              }}
            >
              Save
            </Button>
            <Button
              className="cancelButtons"
              onClick={() => {
                reset();
                dispatch(setSelectedRow(null));
                dispatch(toggleDrawer("isFreebieForm"));
              }}
              tabIndex={0}
            >
              Close
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Drawer>
  );
};
