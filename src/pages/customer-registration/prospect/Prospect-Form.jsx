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
} from "@mui/material";
import {
  jsonServerApi,
  useCreateRequestProspectMutation,
  useCreateUpdateRequestProspectMutation,
  useGetStoreTypeQuery,
} from "../../../services/api";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import { toggleDrawer } from "../../../services/store/disclosureSlice";
import { setSelectedRow } from "../../../services/store/selectedRowSlice";
import { useDispatch, useSelector } from "react-redux";
import { AutoComplete, Textfield } from "../../../components/Fields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { prospectSchema } from "../../../schema";
import { BasicToast } from "../../../components/SweetAlert-Components";

export const RequestProspectForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { defaultButtonStyle } = useDefaultStyles();

  const { data: storeTypes } = useGetStoreTypeQuery({ Status: true });

  const { isRequestProspectForm } = useSelector(
    (state) => state.disclosure.drawers
  );
  const { selectedRowData } = useSelector((state) => state.selectedRowData);

  const {
    formState: { errors },
    control,
    setValue,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(prospectSchema),
    mode: "onChange",
    defaultValues: {
      clientId: "",
      ownersName: "",
      ownersAddress: "",
      phoneNumber: "",
      businessName: "",
      storeType: null,
    },
  });

  useEffect(() => {
    if (selectedRowData !== null) {
      setValue("clientId", Number(selectedRowData?.id));
      setValue("ownersName", selectedRowData?.ownersName);
      setValue("ownersAddress", selectedRowData?.address);
      setValue("phoneNumber", selectedRowData?.phoneNumber);
      setValue("businessName", selectedRowData?.businessName);
      setValue(
        "storeType",
        storeTypes?.data?.storeTypes?.find((item) => {
          if (item?.storeTypeName === selectedRowData?.storeType) return item;
          return null;
        })
      );
    }

    return () => {
      setValue("clientId", "");
      setValue("ownersName", "");
      setValue("ownersAddress", "");
      setValue("phoneNumber", "");
      setValue("businessName", "");
      setValue("storeType", null);
    };
  }, [selectedRowData, dispatch]);

  const [createRequestProspect] = useCreateRequestProspectMutation();
  const [createUpdateRequestProspect] =
    useCreateUpdateRequestProspectMutation();
  const submitAddOrEditHandler = async (data) => {
    const addPayload = {
      ownersName: data?.ownersName,
      ownersAddress: data?.ownersAddress,
      phoneNumber: data?.phoneNumber,
      businessName: data?.businessName,
      storeTypeId: data?.storeType?.id,
    };
    const editPayload = {
      clientId: data?.clientId,
      ownersName: data?.ownersName,
      ownersAddress: data?.ownersAddress,
      phoneNumber: data?.phoneNumber,
      businessName: data?.businessName,
      storeTypeId: data?.storeType?.id,
    };

    try {
      if (selectedRowData === null) {
        delete data["clientId"];
        const res = await createRequestProspect(addPayload).unwrap();
        BasicToast(
          "success",
          `Prospect ${data?.ownersName} was requested`,
          1500
        );
        data["clientId"] = "";
        // dispatch(setSelectedRow(res?.data));
        console.log(res?.data)
        dispatch(toggleDrawer("isFreebieForm"))
      } else {
        await createUpdateRequestProspect({
          payload: editPayload,
          id: selectedRowData?.id,
        }).unwrap();
        BasicToast("success", `Prospect Request Updated`, 1500);
        dispatch(setSelectedRow(null));
      }
    } catch (error) {
      BasicToast("error", `${error?.data?.messages[0]}`, 1500);
      console.log(error);
      return;
    }
    reset();
    dispatch(jsonServerApi.util.invalidateTags(["Request Prospect"]));
    dispatch(jsonServerApi.util.invalidateTags(["Approved Prospect"]));
    dispatch(jsonServerApi.util.invalidateTags(["Rejected Prospect"]));
    dispatch(toggleDrawer("isRequestProspectForm"));
  };

  return (
    <Drawer
      open={isRequestProspectForm}
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
      <form
        style={{ height: "100%" }}
        onSubmit={handleSubmit(submitAddOrEditHandler)}
      >
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
            {`${selectedRowData?.id ? "Edit" : "New"} Prospect Request`}
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
            <Box width="49%" display="flex">
              <Textfield
                name="ownersName"
                control={control}
                label="Owner Name"
                size="small"
                autoComplete="off"
                error={!!errors?.ownersName}
                helperText={errors?.ownersName?.message}
              />
            </Box>

            <Textfield
              name="ownersAddress"
              control={control}
              label="Owner Address"
              size="small"
              autoComplete="off"
              error={!!errors?.ownersAddress}
              helperText={errors?.ownersAddress?.message}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Textfield
                name="phoneNumber"
                control={control}
                label="Phone Number"
                size="small"
                autoComplete="off"
                error={!!errors?.phoneNumber}
                helperText={errors?.phoneNumber?.message}
              />

              <Textfield
                name="businessName"
                control={control}
                label="Business Name"
                size="small"
                autoComplete="off"
                error={!!errors?.businessName}
                helperText={errors?.businessName?.message}
              />
            </Box>

            <Box width="24%">
              <AutoComplete
                name="storeType"
                control={control}
                options={storeTypes?.data?.storeTypes}
                getOptionLabel={(option) => option?.storeTypeName}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    label="Store Type"
                    size="small"
                    error={!!errors?.storeType}
                    helperText={errors?.storeType?.message}
                  />
                )}
                disablePortal
                disableClearable
              />
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
            <Button className="primaryButtons" type="submit" tabIndex={0}>
              {selectedRowData?.id ? 'Save' : 'Add'}
            </Button>
            <Button
              className="cancelButtons"
              onClick={() => dispatch(toggleDrawer("isRequestProspectForm"))}
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
