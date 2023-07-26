import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
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
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import SearchField from "../../../components/SearchField";
import { useGetCompanyQuery } from "../../../services/api";
import { Archive, Edit, More, ViewAgenda } from "@mui/icons-material";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";
import { useDisclosure } from "../../../hooks/useDisclosure";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../services/store/disclosureSlice";

export const Company = () => {
  const theme = useTheme();
  const {
    defaultButtonStyle,
    defaultPaperHeaderStyle,
    defaultPaperContentStyle,
    defaultTableStyle,
  } = useDefaultStyles();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data: companies, isLoading } = useGetCompanyQuery({
    Search: "",
    Status: true,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = companies?.data?.totalCount || 0;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <>
      <Stack height="100%" maxHeight="100%" width="100%">
        <Paper elevation={1} sx={defaultPaperHeaderStyle}>
          <Stack>
            <Typography
              sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
            >
              Company
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
              <CompanyForm />
              <SearchField />
            </Stack>
          ) : (
            ""
          )}
        </Paper>
        {isLoading ? (
          <LoadingData />
        ) : totalCount > 0 ? (
          <Paper elevation={20} sx={defaultPaperContentStyle}>
            <TableContainer component={Paper} sx={defaultTableStyle}>
              <Table className="table" aria-label="custom pagination table">
                <TableHead className="tableHead">
                  <TableRow>
                    <TableCell className="tableHeadCell">
                      Company Name
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
                  {companies?.data?.companies?.map((row) => (
                    <TableRow key={row.companyName}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="tableBodyCell"
                      >
                        {row.companyName}
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
                        <CompanyActions row={row} />
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
          <ZeroRecordsFound text={"Current have no records"} />
        )}
      </Stack>
    </>
  );
};

export default Company;

const CompanyActions = ({ row }) => {
  const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  const { actionMenuStyle } = useDefaultStyles();
  const anchorRef = useRef();
  const dispatch = useDispatch()

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
    dispatch(toggleDrawer("isCompanyForm"))
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
    toggleMenu();
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

const CompanyForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { isCompanyForm } = useSelector((state) => state.disclosure.drawers);
  const { defaultButtonStyle } = useDefaultStyles();

  return (
    <Stack width="auto" flexDirection="row" sx={{ ...defaultButtonStyle }}>
      <Button
        onClick={() => dispatch(toggleDrawer("isCompanyForm"))}
        sx={{ marginRight: 1 }}
        size="small"
        className="addRowButtons"
      >
        Add
      </Button>
      <Drawer
        open={isCompanyForm}
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
            New Company Form
          </Box>
          <Divider
            sx={{
              height: "1.5px",
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.secondary.main,
            }}
          />
          <Box sx={{ height: "100%", p: 2 }}>Form Here</Box>

          <Divider
            sx={{
              height: "1.5px",
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.secondary.main,
            }}
          />
          <ButtonGroup sx={{ gap: 1, m: 1, justifyContent: "end" }}>
            <Button
              className="primaryButtons"
              onClick={() => dispatch(toggleDrawer("isCompanyForm"))}
              tabIndex={0}
            >
              Add
            </Button>
            <Button
              className="cancelButtons"
              // sx={{ color: "black" }}
              onClick={() => dispatch(toggleDrawer("isCompanyForm"))}
              tabIndex={0}
            >
              Close
            </Button>
          </ButtonGroup>
        </Stack>
      </Drawer>
    </Stack>
  );
};