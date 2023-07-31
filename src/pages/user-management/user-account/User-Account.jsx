import React, { useRef, useState } from "react";
import {
  Button,
  Divider,
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
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import SearchField from "../../../components/SearchField";
import { useGetUserAccountsQuery } from "../../../services/api";
import { Archive, Edit, More, ViewAgenda } from "@mui/icons-material";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";
import { useDisclosure } from "../../../hooks/useDisclosure";

export const UserAccount = () => {
  const theme = useTheme();
  const {
    defaultButtonStyle,
    defaultPaperHeaderStyle,
    defaultPaperContentStyle,
    defaultTableStyle,
  } = useDefaultStyles();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data: userAccounts, isLoading } = useGetUserAccountsQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = userAccounts?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    console.log("Page Change");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("Rows per page", event.target.value);
    setPageSize(Number(event.target.value));
  };

  const handleAddUserAccount = () => {
    console.log("Add New User Handler");
  };

  return (
    <>
      <Stack height="100%" maxHeight="100%" width="100%">
        <Paper elevation={1} sx={defaultPaperHeaderStyle}>
          <Stack>
            <Typography
              sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
            >
              User Accounts
            </Typography>
            <Divider
              sx={{
                height: "1.5px",
                color: theme.palette.secondary.main,
                bgcolor: theme.palette.secondary.main,
              }}
            />
          </Stack>
          {isLoading ? (
            <Skeleton variant="rectangular" />
          ) : totalCount > 0 ? (
            <Stack
              width="auto"
              flexDirection="row"
              sx={{ ...defaultButtonStyle }}
            >
              <Button
                onClick={handleAddUserAccount}
                sx={{ marginRight: 1 }}
                size="small"
                className={`addRowButtons`}
              >
                Add
              </Button>
              <SearchField />
            </Stack>
          ) : ''}
        </Paper>
        {isLoading ? (
          <LoadingData />
        ) : totalCount > 0 ? (
          <Paper elevation={20} sx={defaultPaperContentStyle}>
            <TableContainer component={Paper} sx={defaultTableStyle}>
              <Table className="table" aria-label="custom pagination table">
                <TableHead className="tableHead">
                  <TableRow>
                    <TableCell className="tableHeadCell">Fullname</TableCell>
                    <TableCell className="tableHeadCell">Username</TableCell>
                    <TableCell className="tableHeadCell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userAccounts?.data?.users?.map((row) => (
                    <TableRow key={row.username}>
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
                        { label: "All", value: 2000 },
                      ]}
                      colSpan={3}
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
          <ZeroRecordsFound text={'Current have no records'} />
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

  const menuItems = [
    {
      type: "view",
      name: "View More",
      icon: <ViewAgenda />,
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

  const handleView = () => {
    console.log("View More", row);
  };

  const handleEdit = () => {
    console.log("Edit User", row);
  };

  const handleArchive = () => {
    console.log("Archive or Restore", row);
  };

  const handleOnClick = (items) => {
    if (items.type === "view") {
      handleView();
    } else if (items.type === "edit") {
      handleEdit();
    } else if (items.type === "archive") {
      handleArchive();
    }
    toggleMenu()
  };

  return (
    <>
      <IconButton className="actionButton" ref={anchorRef} onClick={toggleMenu}>
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
