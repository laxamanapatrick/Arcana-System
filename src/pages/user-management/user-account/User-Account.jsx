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
  TextField as MuiTextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Archive,
  Edit,
  More,
  // ViewAgenda
} from "@mui/icons-material";
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
  useGetUserAccountsQuery,
  useCreateUserAccountMutation,
  useUpdateUserAccountMutation,
  useUpdateUserAccountStatusMutation,
  useGetCompanyQuery,
  useGetDepartmentQuery,
  useGetLocationQuery,
  useGetUserRoleQuery,
} from "../../../services/api";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../services/store/disclosureSlice";
import { userAccountSchema } from "../../../schema";
import { AutoComplete, Textfield } from "../../../components/Fields";
import { setSelectedRow } from "../../../services/store/selectedRowSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const UserAccount = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: userAccountsData, isLoading } = useGetUserAccountsQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = userAccountsData?.data?.totalCount || 0;

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
                User Account
              </Typography>
            </>
            {isLoading ? (
              <Skeleton variant="rectangular" />
            ) : status === true ? (
              <UserAccountForm />
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
                    <TableCell className="tableHeadCell">Fullname</TableCell>
                    <TableCell className="tableHeadCell">Username</TableCell>
                    {/* <TableCell className="tableHeadCell">Password</TableCell> */}
                    <TableCell className="tableHeadCell">Role</TableCell>
                    <TableCell className="tableHeadCell">Company</TableCell>
                    <TableCell className="tableHeadCell">Department</TableCell>
                    <TableCell className="tableHeadCell">Location</TableCell>
                    <TableCell className="tableHeadCell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userAccountsData?.data?.users?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="tableBodyCell"
                      >
                        {row.fullname}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row.username}
                      </TableCell>
                      {/* <TableCell className="tableBodyCell">
                        {row?.password ? "*********" : ""}
                      </TableCell> */}
                      <TableCell className="tableBodyCell">
                        {row?.roleName}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row?.companyName}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row?.departmentName}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row?.locationName}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        <UserAccountActions row={row} />
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
                      colSpan={8}
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
            text={
              search
                ? `${search} not available in for User Accounts`
                : `${
                    status ? "No active records" : "No archived records"
                  } for User Account`
            }
          />
        )}
      </Stack>
    </>
  );
};

export default UserAccount;

const UserAccountActions = ({ row }) => {
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
    dispatch(toggleDrawer("isUserAccountForm"));
  };

  const [updateUserAccountStatus] = useUpdateUserAccountStatusMutation();
  const handleArchive = () => {
    ModalToast(
      `You are about to set ${row?.fullname} as ${
        row?.isActive ? "inactive" : "active"
      }`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        updateUserAccountStatus(row.id);
        BasicToast(
          "success",
          `User ${row?.fullname} was ${
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

const UserAccountForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { defaultButtonStyle } = useDefaultStyles();
  const { isUserAccountForm } = useSelector(
    (state) => state.disclosure.drawers
  );
  const { data: userRoleData } = useGetUserRoleQuery();
  const { data: companyData } = useGetCompanyQuery();
  const { data: departmentData } = useGetDepartmentQuery();
  const { data: locationData } = useGetLocationQuery();
  const { selectedRowData } = useSelector((state) => state.selectedRowData);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(userAccountSchema),
    mode: "onChange",
    defaultValues: {
      userAccountId: "",
      fullname: "",
      username: "",
      password: "",
      userRole: null,
      company: null,
      department: null,
      location: null,
    },
  });

  useEffect(() => {
    if (selectedRowData !== null) {
      setValue("userAccountId", Number(selectedRowData?.id));
      setValue("fullname", selectedRowData?.fullname);
      setValue("username", selectedRowData?.username);
      setValue("password", selectedRowData?.password);
      setValue(
        "userRole",
        userRoleData?.data?.userRoles?.find((item) => {
          if (item?.roleName === selectedRowData?.roleName) return item;
          return null;
        })
      );

      setValue(
        "company",
        companyData?.data?.companies?.find((item) => {
          if (item?.companyName === selectedRowData?.companyName) return item;
          return null;
        })
      );

      setValue(
        "department",
        departmentData?.data?.department?.find((item) => {
          if (item?.departmentName === selectedRowData?.departmentName)
            return item;
          return null;
        })
      );

      setValue(
        "location",
        locationData?.data?.result?.find((item) => {
          if (item?.locationName === selectedRowData?.locationName) return item;
          return null; // Add an explicit return statement for cases where the condition is not met
        })
      );
    }

    return () => {
      setValue("userAccountId", "");
      setValue("fullname", "");
      setValue("username", "");
      setValue("password", "");
      setValue("userRole", null);
      setValue("company", null);
      setValue("department", null);
      setValue("location", null);
    };
  }, [selectedRowData, dispatch]);

  const [createUserAccount] = useCreateUserAccountMutation();
  const [updateUserAccount] = useUpdateUserAccountMutation();
  const submitAddOrEditHandler = async (data) => {
    const addPayload = {
      fullname: data?.fullname,
      username: data?.username,
      password: data?.password,
      userRoleId: data?.userRole?.id,
      companyId: data?.company?.id,
      departmentId: data?.department?.id,
      locationId: data?.location?.id,
    };
    const editPayload = {
      fullname: data?.fullname,
      username: data?.username,
      userRoleId: data?.userRole?.id,
      companyId: data?.company?.id,
      departmentId: data?.department?.id,
      locationId: data?.location?.id,
    };
    try {
      if (selectedRowData === null) {
        await createUserAccount(addPayload).unwrap()
        BasicToast("success", `User ${data?.fullname} was created`, 1500);
      } else {
        await updateUserAccount({
          payload: editPayload,
          id: selectedRowData?.id,
        }).unwrap()
        BasicToast("success", `User Updated`, 1500);
      }
    } catch (error) {
      BasicToast("error", `${error?.data?.messages[0]}`, 1500);
      console.log(error);
      return
    }
    reset();
    dispatch(setSelectedRow(null));
    dispatch(toggleDrawer("isUserAccountForm"));
  };

  return (
    <Stack width="auto" flexDirection="row" sx={{ ...defaultButtonStyle }}>
      <Button
        onClick={() => {
          reset();
          dispatch(setSelectedRow(null));
          dispatch(toggleDrawer("isUserAccountForm"));
        }}
        sx={{ marginRight: 1 }}
        size="small"
        className="addRowButtons"
      >
        Add
      </Button>
      <Drawer
        open={isUserAccountForm}
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
              {`${selectedRowData?.id ? "Edit" : "New"} User Account Form`}
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
                name="fullname"
                control={control}
                label="Full Name"
                size="small"
                autoComplete="off"
                error={!!errors?.fullname}
                helperText={errors?.fullname?.message}
              />

              <Textfield
                name="username"
                control={control}
                label="Username"
                size="small"
                autoComplete="off"
                error={!!errors?.username}
                helperText={errors?.username?.message}
              />

              {!selectedRowData?.id && (
                <Textfield
                  name="password"
                  control={control}
                  label="Password"
                  size="small"
                  autoComplete="off"
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                  type="password"
                />
              )}

              <AutoComplete
                name="userRole"
                control={control}
                options={userRoleData?.data?.userRoles}
                getOptionLabel={(option) => option?.roleName}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <MuiTextField {...params} label="User Role" size="small" />
                )}
                disablePortal
                disableClearable
              />

              <AutoComplete
                name="company"
                control={control}
                options={companyData?.data?.companies}
                getOptionLabel={(option) => option?.companyName}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <MuiTextField {...params} label="Company" size="small" />
                )}
                disablePortal
                disableClearable
              />

              <AutoComplete
                name="department"
                control={control}
                options={departmentData?.data?.department}
                getOptionLabel={(option) => option?.departmentName}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <MuiTextField {...params} label="Department" size="small" />
                )}
                disablePortal
                disableClearable
              />

              <AutoComplete
                name="location"
                control={control}
                options={locationData?.data?.result}
                getOptionLabel={(option) => option.locationName}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <MuiTextField {...params} label="Location" size="small" />
                )}
                disablePortal
                disableClearable
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
                onClick={() => dispatch(toggleDrawer("isUserAccountForm"))}
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
