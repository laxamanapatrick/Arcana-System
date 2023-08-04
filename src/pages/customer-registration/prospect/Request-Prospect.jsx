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
import SearchField from "../../../components/SearchField";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";
import {
  useCreateRequestProspectMutation,
  useCreateUpdateRequestProspectMutation,
  //   useCreateUpdateRequestedProspectStatusMutation,
  useGetRequestedProspectQuery,
} from "../../../services/api";
import moment from "moment/moment";
import { Add, Archive, Edit, More } from "@mui/icons-material";
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
import { useDisclosure } from "../../../hooks/useDisclosure";

export const RequestProspect = () => {
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: requestedProspects, isLoading } = useGetRequestedProspectQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = requestedProspects?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const handleViewArchived = () => {
    setPage(0);
    setPageSize(25);
    setStatus((prev) => !prev);
  };

  return (
    <>
      <Stack
        width="auto"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <SearchField onChange={(e) => setSearch(e.target.value)} />
        {/* <Stack flexDirection="row">
          <Checkbox
            size="small"
            checked={status === false}
            onClick={handleViewArchived}
            inputProps={{ "aria-label": "controlled" }}
            sx={{ color: theme.palette.secondary.main, mb: "2px", p: 0 }}
          />
          <Typography fontSize="small" mr={1}>
            Archived
          </Typography>
        </Stack> */}
      </Stack>
      {isLoading ? (
        <LoadingData />
      ) : totalCount > 0 ? (
        <>
          {/* Table */}
          <TableContainer component={Paper} sx={{ maxHeight: "590px" }}>
            <Table className="table" aria-label="custom pagination table">
              <TableHead className="tableHead">
                <TableRow>
                  <TableCell className="tableHeadCell">Owner Name</TableCell>
                  <TableCell className="tableHeadCell">Owner Address</TableCell>
                  <TableCell className="tableHeadCell">Phone Number</TableCell>
                  <TableCell className="tableHeadCell">Business Name</TableCell>
                  <TableCell className="tableHeadCell">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ maxHeight: "560px" }}>
                {requestedProspects?.data?.requestedProspect?.map((row) => (
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
                      <RequestProspectActions row={row} />
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
                    colSpan={5}
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
        </>
      ) : (
        <ZeroRecordsFound
          text={`${
            status ? "No active records" : "No archived records"
          } for Prospect Requests`}
        />
      )}

      <Box mt={2}>{status && <RequestProspectForm />}</Box>
    </>
  );
};

const RequestProspectForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { defaultButtonStyle } = useDefaultStyles();
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
    },
  });

  useEffect(() => {
    if (selectedRowData !== null) {
      setValue("clientId", Number(selectedRowData?.id));
      setValue("ownersName", selectedRowData?.ownersName);
      setValue("ownersAddress", selectedRowData?.address);
      setValue("phoneNumber", selectedRowData?.phoneNumber);
      setValue("businessName", selectedRowData?.businessName);
    }

    return () => {
      setValue("clientId", "");
      setValue("ownersName", "");
      setValue("ownersAddress", "");
      setValue("phoneNumber", "");
      setValue("businessName", "");
    };
  }, [selectedRowData, dispatch]);

  const [createRequestProspect] = useCreateRequestProspectMutation();
  const [createUpdateRequestProspect] =
    useCreateUpdateRequestProspectMutation();
  const submitAddOrEditHandler = async (data) => {
    try {
      if (selectedRowData === null) {
        delete data["clientId"];
        await createRequestProspect(data).unwrap();
        BasicToast(
          "success",
          `Prospect ${data?.ownersName} was requested`,
          1500
        );
        data["clientId"] = "";
      } else {
        await createUpdateRequestProspect({
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
    dispatch(setSelectedRow(null));
    dispatch(toggleDrawer("isRequestProspectForm"));
  };

  return (
    <Stack
      width="auto"
      flexDirection="row"
      justifyContent="end"
      sx={{ ...defaultButtonStyle }}
    >
      <Button
        onClick={() => {
          reset();
          dispatch(setSelectedRow(null));
          dispatch(toggleDrawer("isRequestProspectForm"));
        }}
        startIcon={<Add sx={{ mb: 0.2 }} />}
        sx={{ marginRight: 1, px: 1 }}
        size="small"
        className="addRowButtons"
      >
        New Request
      </Button>
      <Drawer
        open={isRequestProspectForm}
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
                onClick={() => dispatch(toggleDrawer("isRequestProspectForm"))}
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

const RequestProspectActions = ({ row }) => {
  const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  const { actionMenuStyle } = useDefaultStyles();
  const anchorRef = useRef();
  const dispatch = useDispatch();

  const menuItems = [
    // {
    //   type: "view",
    //   name: "View More",
    //   icon: <ViewAgenda />,
    // },
    {
      type: "edit",
      name: "Edit",
      icon: <Edit />,
    },
    // {
    //   type: "archive",
    //   name: row?.isActive ? "Archive" : "Restore",
    //   icon: <Archive />,
    // },
  ];

  // const handleView = () => {
  //   console.log("View More", row);
  // };

  const handleEdit = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleDrawer("isRequestProspectForm"));
  };

  //   const [updateRequestedProspectStatus] =
  //     useCreateUpdateRequestedProspectStatusMutation();
  //   const handleArchive = () => {
  //     ModalToast(
  //       `You are about to set the request for ${row?.ownersName} as prospect to ${
  //         row?.isActive ? "inactive" : "active"
  //       }`,
  //       "Are you sure you want to proceed?",
  //       "question"
  //     ).then((res) => {
  //       if (res.isConfirmed) {
  //         updateRequestedProspectStatus(row.id);
  //         BasicToast(
  //           "success",
  //           `Request for ${row?.ownersName} as prospect was ${
  //             row?.isActive ? "archived" : "set active"
  //           }`,
  //           3500
  //         );
  //       }
  //     });
  //     dispatch(setSelectedRow(null));
  //   };

  const handleOnClick = (items) => {
    // if (items.type === "view") {
    //   handleView();
    // } else
    if (items.type === "edit") {
      handleEdit();
    }
    // else if (items.type === "archive") {
    //   handleArchive();
    // }
    toggleMenu();
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={toggleMenu}>
        <More />
      </IconButton>
      <Menu
        anchorEl={anchorRef.current}
        open={isMenu}
        onClose={toggleMenu}
        PaperProps={{
          style: {
            maxHeight: 45 * 4.5,
            width: "20ch",
            ...actionMenuStyle,
          },
        }}
      >
        {menuItems?.map((items) => (
          <MenuItem
            onClick={() => handleOnClick(items)}
            key={items.type}
            sx={{ gap: 1, textAlign: "center" }}
          >
            {items.icon}
            {items.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
