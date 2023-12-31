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
import { Archive, Edit, More, TurnedInNot } from "@mui/icons-material";
import SearchField from "../../../components/SearchField";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";
import {
  BasicToast,
  ModalToast,
} from "../../../components/SweetAlert-Components";

import { useDefaultStyles } from "../../../hooks/useDefaultStyles";

import {
  useGetUserRoleQuery,
  useCreateUserRoleMutation,
  useUpdateUserRoleMutation,
  useUpdateUserRoleStatusMutation,
} from "../../../services/api";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDrawer,
  toggleModal,
} from "../../../services/store/disclosureSlice";
import { userRoleSchema } from "../../../schema";
import { Textfield } from "../../../components/Fields";
import { setSelectedRow } from "../../../services/store/selectedRowSlice";

import moment from "moment/moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Tagging from "./Tagging";

export const UserRole = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: userRoles, isLoading } = useGetUserRoleQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = userRoles?.data?.totalCount || 0;

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
                User Role
              </Typography>
            </>
            {isLoading ? (
              <Skeleton variant="rectangular" />
            ) : status === true ? (
              <UserRoleForm />
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
                      User Role Name
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
                  {userRoles?.data?.userRoles?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="tableBodyCell"
                      >
                        {row.roleName}
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
                        <UserRoleActions row={row} />
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
                      colSpan={4}
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
            } for User Role`}
          />
        )}
      </Stack>
    </>
  );
};

export default UserRole;

const UserRoleActions = ({ row }) => {
  const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  const { actionMenuStyle } = useDefaultStyles();
  const anchorRef = useRef();
  const dispatch = useDispatch();
  const { isTagging } = useSelector((state) => state.disclosure.modals);

  const menuItems = [
    {
      type: "tagging",
      name: "Tagging",
      icon: <TurnedInNot />,
    },
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

  const handleTagging = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleModal("isTagging"));
  };

  const handleEdit = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleDrawer("isUserRoleForm"));
  };

  const [updateUserRoleStatus] = useUpdateUserRoleStatusMutation();
  const handleArchive = () => {
    ModalToast(
      `You are about to set ${row?.roleName} as ${
        row?.isActive ? "inactive" : "active"
      }`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        updateUserRoleStatus(row.id);
        BasicToast(
          "success",
          `User Role ${row?.roleName} was ${
            row?.isActive ? "archived" : "set active"
          }`,
          3500
        );
      }
    });
    dispatch(setSelectedRow(null));
  };

  const handleOnClick = (items) => {
    if (items.type === "tagging") {
      handleTagging();
    } else if (items.type === "edit") {
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
      {isTagging && <Tagging />}
    </>
  );
};

const UserRoleForm = () => {
  const dispatch = useDispatch();
  const { isUserRoleForm } = useSelector((state) => state.disclosure.drawers);
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
    resolver: yupResolver(userRoleSchema),
    mode: "onChange",
    defaultValues: {
      userRoleId: "",
      roleName: "",
    },
  });

  useEffect(
    () => {
      if (selectedRowData !== null) {
        setValue("userRoleId", Number(selectedRowData?.id));
        setValue("roleName", selectedRowData?.roleName);
      }

      return () => {
        setValue("userRoleId", "");
        setValue("roleName", "");
      };
    },
    [selectedRowData, dispatch],
    setValue
  );

  const [createUserRole] = useCreateUserRoleMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const submitAddOrEditHandler = async (data) => {
    try {
      if (selectedRowData === null) {
        await createUserRole({
          roleName: data?.roleName,
        }).unwrap();
        BasicToast("success", `User Role ${data?.roleName} was created`, 1500);
      } else {
        if (selectedRowData?.roleName === data?.roleName) {
          BasicToast(
            "warning",
            `Changes not saved.
            \nYou're trying to change ${selectedRowData?.roleName} into ${data?.roleName} which is the same.`,
            3500
          );
        } else {
          await updateUserRole({ payload: data, id: selectedRowData?.id }).unwrap();
          BasicToast(
            "success",
            `User Role ${selectedRowData?.roleName}
            was changed to ${data?.roleName}`,
            1500
          );
        }
      }
    } catch (error) {
      BasicToast("error", `${error?.data?.messages[0]}`, 1500);
      console.log(error);
      return
    }
    reset()
    dispatch(setSelectedRow(null));
    dispatch(toggleDrawer("isUserRoleForm"));
  };

  return (
    <Stack width="auto" flexDirection="row" sx={{ ...defaultButtonStyle }}>
      <Button
        onClick={() => {
          reset()
          dispatch(setSelectedRow(null));
          dispatch(toggleDrawer("isUserRoleForm"));
        }}
        sx={{ marginRight: 1 }}
        size="small"
        className="addRowButtons"
      >
        Add
      </Button>
      <Drawer
        open={isUserRoleForm}
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
              {`${selectedRowData?.id ? "Edit" : "New"} User Role Form`}
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
                justifyContent: "center",
              }}
            >
              <Textfield
                name="roleName"
                control={control}
                label="User Role Name"
                size="small"
                autoComplete="off"
                error={!!errors?.roleName}
                helperText={errors?.roleName?.message}
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
                onClick={() => dispatch(toggleDrawer("isUserRoleForm"))}
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
