import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";
import {
  useGetApprovedProspectQuery,
  useCreateUpdateApprovedProspectMutation,
} from "../../../services/api";
import { Edit } from "@mui/icons-material";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import { toggleDrawer } from "../../../services/store/disclosureSlice";
import { setSelectedRow } from "../../../services/store/selectedRowSlice";
import { useDispatch, useSelector } from "react-redux";
import { Textfield } from "../../../components/Fields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { prospectSchema } from "../../../schema";
import {
  BasicToast,
  ModalToast,
} from "../../../components/SweetAlert-Components";

export const ApprovedProspect = ({
  status,
  search,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const { data: approvedProspects, isLoading } = useGetApprovedProspectQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  }, {
    refetchOnMountOrArgChange: true
  });
  const totalCount = approvedProspects?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  // const [createUpdateApprovedProspectStatus] =
  //   useCreateUpdateApprovedProspectStatusMutation();
  // const handleArchiveRestore = (id, isActive) => {
  //   ModalToast(
  //     `You are about to set this approved prospect ${
  //       isActive ? "inactive" : "active"
  //     }`,
  //     "Are you sure you want to proceed?",
  //     "question"
  //   ).then((res) => {
  //     if (res.isConfirmed) {
  //       createUpdateApprovedProspectStatus(id);
  //       BasicToast(
  //         "success",
  //         `Approved Prospect was ${isActive ? "archived" : "set active"}`,
  //         3500
  //       );
  //     }
  //   });
  // };

  return (
    <Stack alignItems="center">
      {isLoading ? (
        <LoadingData />
      ) : totalCount > 0 ? (
        // Table
        <TableContainer component={Paper} sx={{ maxHeight: "590px" }}>
          <Table className="table" aria-label="custom pagination table">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell className="tableHeadCell">Owner Name</TableCell>
                <TableCell className="tableHeadCell">Owner Address</TableCell>
                <TableCell className="tableHeadCell">Phone Number</TableCell>
                <TableCell className="tableHeadCell">Business Name</TableCell>
                <TableCell className="tableHeadCell">Edit Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: "560px" }}>
              {approvedProspects?.data?.requestedProspect?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableBodyCell"
                  >
                    {row?.ownersName}
                  </TableCell>
                  <TableCell className="tableBodyCell">
                    {row?.address}
                  </TableCell>
                  <TableCell className="tableBodyCell">
                    {row?.phoneNumber}
                  </TableCell>
                  <TableCell className="tableBodyCell">
                    {row?.businessName}
                  </TableCell>
                  <TableCell className="tableBodyCell">
                    <ApprovedProspectForm row={row} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  className="tablePagination"
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "All", value: totalCount },
                  ]}
                  colSpan={6}
                  count={totalCount}
                  page={page}
                  rowsPerPage={pageSize}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <ZeroRecordsFound
          text={
            search
              ? `${search} not available in for Approved Prospects`
              : `${
                  status ? "No active records" : "No archived records"
                } for Approved Prospects`
          }
        />
      )}
    </Stack>
  );
};

const ApprovedProspectForm = ({ row }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { defaultButtonStyle } = useDefaultStyles();
  const { isApprovedProspectForm } = useSelector(
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
      storeType: "",
    },
  });

  useEffect(() => {
    if (selectedRowData !== null) {
      setValue("clientId", Number(selectedRowData?.id));
      setValue("ownersName", selectedRowData?.ownersName);
      setValue("ownersAddress", selectedRowData?.address);
      setValue("phoneNumber", selectedRowData?.phoneNumber);
      setValue("businessName", selectedRowData?.businessName);
      setValue("storeType", selectedRowData?.storeType);
    }

    return () => {
      setValue("clientId", "");
      setValue("ownersName", "");
      setValue("ownersAddress", "");
      setValue("phoneNumber", "");
      setValue("businessName", "");
      setValue("storeType", "");
    };
  }, [dispatch, selectedRowData]);

  const [createUpdateApprovedProspect] =
    useCreateUpdateApprovedProspectMutation();
  const submitAddOrEditHandler = (data) => {
    ModalToast(
      "Edited request will be subject again for approval.",
      "Are you sure you want to proceed?",
      "question"
    ).then(async (res) => {
      if (res.isConfirmed) {
        try {
          if (selectedRowData?.id) {
            await createUpdateApprovedProspect({
              payload: data,
              id: selectedRowData?.id,
            }).unwrap();
            BasicToast("success", `Prospect Request Updated`, 1500);
          }
        } catch (error) {
          BasicToast("error", `${error?.data?.messages[0]}`, 1500);
          console.log(error);
          return;
        }
        reset();
        dispatch(toggleDrawer("isApprovedProspectForm"));
      }
    });
  };

  return (
    <Stack width="auto" display="flex" alignItems="start">
      <IconButton
        onClick={() => {
          dispatch(setSelectedRow(row));
          dispatch(toggleDrawer("isApprovedProspectForm"));
        }}
        sx={{ marginRight: 1, px: 1 }}
        size="small"
      >
        <Edit />
      </IconButton>
      <Drawer
        open={isApprovedProspectForm}
        onClose={() => {}}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
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
              {`Edit Prospect Request`}
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
              <Textfield
                name="ownersName"
                control={control}
                label="Owner Name"
                size="small"
                autoComplete="off"
                error={!!errors?.ownersName}
                helperText={errors?.ownersName?.message}
              />

              <Textfield
                name="ownersAddress"
                control={control}
                label="Owner Address"
                size="small"
                autoComplete="off"
                error={!!errors?.ownersAddress}
                helperText={errors?.ownersAddress?.message}
              />

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

              <Textfield
                name="storeType"
                control={control}
                label="Store Type"
                size="small"
                autoComplete="off"
                error={!!errors?.storeType}
                helperText={errors?.storeType?.message}
              />
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
                Add
              </Button>
              <Button
                className="cancelButtons"
                onClick={() => dispatch(toggleDrawer("isApprovedProspectForm"))}
                tabIndex={0}
              >
                Close
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Drawer>
    </Stack>
  );
};
