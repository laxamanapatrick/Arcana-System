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
  useGetMeatTypeQuery,
  useCreateMeatTypeMutation,
  useUpdateMeatTypeMutation,
  useUpdateMeatTypeStatusMutation,
} from "../../../../services/api";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../../services/store/disclosureSlice";
import { meatTypeSchema, uomSchema } from "../../../../schema";
import { Textfield } from "../../../../components/Fields";
import { setSelectedRow } from "../../../../services/store/selectedRowSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const MeatType = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: meatTypes, isLoading } = useGetMeatTypeQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = meatTypes?.data?.totalCount || 0;

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
                Meat Type
              </Typography>
            </>
            {isLoading ? (
              <Skeleton variant="rectangular" />
            ) : status === true ? (
              <MeatTypeForm />
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
                    <TableCell className="tableHeadCell">
                      Meat Type Name
                    </TableCell>
                    <TableCell className="tableHeadCell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {meatTypes?.data?.meatTypes?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="tableBodyCell"
                      >
                        {row.meatTypeName}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        <MeatTypeActions row={row} />
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
                      colSpan={2}
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
            } for Meat Type`}
          />
        )}
      </Stack>
    </>
  );
};

export default MeatType;

const MeatTypeActions = ({ row }) => {
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
    dispatch(toggleDrawer("isMeatTypeForm"));
  };

  const [updateMeatTypeStatus] =
    useUpdateMeatTypeStatusMutation();
  const handleArchive = () => {
    ModalToast(
      `You are about to set ${row?.meatTypeName} as ${
        row?.isActive ? "inactive" : "active"
      }`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        updateMeatTypeStatus(row.id);
        BasicToast(
          "success",
          `Meat Type ${row?.meatTypeName} was ${
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

const MeatTypeForm = () => {
  const dispatch = useDispatch();
  const { isMeatTypeForm } = useSelector(
    (state) => state.disclosure.drawers
  );
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
    resolver: yupResolver(meatTypeSchema),
    mode: "onChange",
    defaultValues: {
      meatTypeId: "",
      meatTypeName: "",
    },
  });

  useEffect(() => {
    if (selectedRowData !== null) {
      setValue("meatTypeId", selectedRowData?.id);
      setValue("meatTypeName", selectedRowData?.meatTypeName);
    }

    return () => {
      setValue("meatTypeId", "");
      setValue("meatTypeName", "");
    };
  }, [selectedRowData, dispatch]);

  const [createMeatType] = useCreateMeatTypeMutation();
  const [updateMeatType] = useUpdateMeatTypeMutation();
  const submitAddOrEditHandler = async (data) => {
    try {
      if (selectedRowData === null) {
        await createMeatType(data).unwrap();
        BasicToast(
          "success",
          `Meat Type ${data?.meatTypeName} was created`,
          1500
        );
      } else {
        if (
          selectedRowData?.meatTypeName === data?.meatTypeName
        ) {
          BasicToast(
            "warning",
            `Changes not saved.
            \nYou're not making any changes.`,
            3500
          );
        } else {
          await updateMeatType({
            payload: data,
            id: selectedRowData?.id,
          }).unwrap();
          BasicToast("success", `Meat Type successfully updated!`, 1500);
        }
      }
    } catch (error) {
      BasicToast("error", `${error?.data?.messages[0]}`, 1500);
      console.log(error);
    }
    reset();
    dispatch(setSelectedRow(null));
    dispatch(toggleDrawer("isMeatTypeForm"));
  };

  return (
    <Stack width="auto" flexDirection="row" sx={{ ...defaultButtonStyle }}>
      <Button
        onClick={() => {
          reset();
          dispatch(setSelectedRow(null));
          dispatch(toggleDrawer("isMeatTypeForm"));
        }}
        sx={{ marginRight: 1 }}
        size="small"
        className="addRowButtons"
      >
        Add
      </Button>
      <Drawer
        open={isMeatTypeForm}
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
              {`${selectedRowData?.id ? "Edit" : "New"} Meat Type Form`}
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
                name="meatTypeName"
                control={control}
                label="Meat Type Name"
                size="small"
                autoComplete="off"
                error={!!errors?.meatTypeName}
                helperText={errors?.meatTypeName?.message}
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
                onClick={() => dispatch(toggleDrawer("isMeatTypeForm"))}
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
