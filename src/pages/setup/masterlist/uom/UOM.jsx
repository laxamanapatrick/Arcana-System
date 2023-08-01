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
  Skeleton,
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
  Archive,
  Edit,
  More,
  // ViewAgenda
} from "@mui/icons-material";
import SearchField from "../../../../components/SearchField";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../../components/Lottie-Components";
import {
  BasicToast,
  ModalToast,
} from "../../../../components/SweetAlert-Components";

import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";

import {
  useGetUOMQuery,
  useCreateUOMMutation,
  useUpdateUOMMutation,
  useUpdateUOMStatusMutation,
} from "../../../../services/api";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../../services/store/disclosureSlice";
import { uomSchema } from "../../../../schema";
import { Textfield } from "../../../../components/Fields";
import { setSelectedRow } from "../../../../services/store/selectedRowSlice";

import moment from "moment/moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const UOM = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: uoms, isLoading } = useGetUOMQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = uoms?.data?.totalCount || 0;

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
      <Stack height="100%" maxHeight="100%" width="100%">
        <Paper elevation={1} sx={defaultPaperHeaderStyle}>
          <Stack flexDirection="row" alignItems="center" gap={0.5}>
            <>
              <Typography
                sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
              >
                UOM
              </Typography>
            </>
            {isLoading ? (
              <Skeleton variant="rectangular" />
            ) : status === true ? (
              <UOMForm />
            ) : (
              ""
            )}
          </Stack>
          <Stack
            width="auto"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
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
            <SearchField onChange={(e) => setSearch(e.target.value)} />
          </Stack>
        </Paper>
        {isLoading ? (
          <LoadingData />
        ) : totalCount > 0 ? (
          <Paper elevation={20} sx={defaultPaperContentStyle}>
            <TableContainer component={Paper}>
              <Table className="table" aria-label="custom pagination table">
                <TableHead className="tableHead">
                  <TableRow>
                    <TableCell className="tableHeadCell">UOM Code</TableCell>
                    <TableCell className="tableHeadCell">
                      UOM Description
                    </TableCell>
                    <TableCell className="tableHeadCell">
                      Created Date
                    </TableCell>
                    <TableCell className="tableHeadCell">
                      Updated Date
                    </TableCell>
                    <TableCell className="tableHeadCell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uoms?.data?.uom?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="tableBodyCell"
                      >
                        {row.uomCode}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row?.uomDescription}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {moment(row?.createdAt).format("yyyy-MM-DD")}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row?.updatedAt
                          ? moment(row?.updatedAt).format("yyyy-MM-DD")
                          : "No updates yet"}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        <UOMActions row={row} />
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
          </Paper>
        ) : (
          <ZeroRecordsFound
            text={`${
              status ? "No active records" : "No archived records"
            } for UOM`}
          />
        )}
      </Stack>
    </>
  );
};

export default UOM;

const UOMActions = ({ row }) => {
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
    {
      type: "archive",
      name: row?.isActive ? "Archive" : "Restore",
      icon: <Archive />,
    },
  ];

  // const handleView = () => {
  //   console.log("View More", row);
  // };

  const handleEdit = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleDrawer("isUOMForm"));
  };

  const [updateUOMStatus] = useUpdateUOMStatusMutation();
  const handleArchive = () => {
    ModalToast(
      `You are about to set ${row?.uomDescription} as ${
        row?.isActive ? "inactive" : "active"
      }`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        updateUOMStatus(row.id);
        BasicToast(
          "success",
          `UOM ${row?.uomDescription} was ${
            row?.isActive ? "archived" : "set active"
          }`,
          3500
        );
      }
    });
    dispatch(setSelectedRow(null));
  };

  const handleOnClick = (items) => {
    // if (items.type === "view") {
    //   handleView();
    // } else
    if (items.type === "edit") {
      handleEdit();
    } else if (items.type === "archive") {
      handleArchive();
    }
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

const UOMForm = () => {
  const dispatch = useDispatch();
  const { isUOMForm } = useSelector((state) => state.disclosure.drawers);
  const { selectedRowData } = useSelector((state) => state.selectedRowData);

  const theme = useTheme();
  const { defaultButtonStyle } = useDefaultStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(uomSchema),
    mode: "onChange",
    defaultValues: {
      uomId: "",
      uomCode: "",
      uomDescription: "",
    },
  });

  useEffect(() => {
    if (selectedRowData !== null) {
      setValue("uomId", selectedRowData?.id);
      setValue("uomCode", selectedRowData?.uomCode);
      setValue("uomDescription", selectedRowData?.uomDescription);
    }

    return () => {
      setValue("uomId", "");
      setValue("uomCode", "");
      setValue("uomDescription", "");
    };
  }, [selectedRowData, dispatch]);

  const [createUOM] = useCreateUOMMutation();
  const [updateUOM] = useUpdateUOMMutation();
  const submitAddOrEditHandler = async (data) => {
    try {
      if (selectedRowData === null) {
        await createUOM(data).unwrap();
        BasicToast("success", `UOM ${data?.uomDescription} was created`, 1500);
      } else {
        if (
          selectedRowData?.uomDescription === data?.uomDescription &&
          selectedRowData?.uomCode === data?.uomCode
        ) {
          BasicToast(
            "warning",
            `Changes not saved.
            \nYou're not making any changes.`,
            3500
          );
        } else {
          await updateUOM({ payload: data, id: selectedRowData?.id });
          BasicToast("success", `UOM successfully updated!`, 1500);
        }
      }
    } catch (error) {
      BasicToast("error", `${error?.data?.messages[0]}`, 1500);
      console.log(error);
    }
    reset();
    dispatch(setSelectedRow(null));
    dispatch(toggleDrawer("isUOMForm"));
  };

  return (
    <Stack width="auto" flexDirection="row" sx={{ ...defaultButtonStyle }}>
      <Button
        onClick={() => {
          reset();
          dispatch(setSelectedRow(null));
          dispatch(toggleDrawer("isUOMForm"));
        }}
        sx={{ marginRight: 1 }}
        size="small"
        className="addRowButtons"
      >
        Add
      </Button>
      <Drawer
        open={isUOMForm}
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
              {`${selectedRowData?.id ? "Edit" : "New"} UOM Form`}
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
                name="uomCode"
                control={control}
                label="UOM Code"
                size="small"
                autoComplete="off"
                error={!!errors?.uomCode}
                helperText={errors?.uomCode?.message}
              />
              <Textfield
                name="uomDescription"
                control={control}
                label="UOM Description"
                size="small"
                autoComplete="off"
                error={!!errors?.uomDescription}
                helperText={errors?.uomDescription?.message}
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
                onClick={() => dispatch(toggleDrawer("isUOMForm"))}
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
