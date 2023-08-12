import React, { useRef, useState } from "react";
import {
  Button,
  Checkbox,
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
  useCreateUpdateRequestedProspectStatusMutation,
  useGetRequestedProspectQuery,
} from "../../../services/api";
// import moment from "moment/moment";
import { Add, Archive, Edit, More } from "@mui/icons-material";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import { toggleDrawer } from "../../../services/store/disclosureSlice";
import { setSelectedRow } from "../../../services/store/selectedRowSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  BasicToast,
  ModalToast,
} from "../../../components/SweetAlert-Components";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { RequestProspectForm } from "./Prospect-Form";

export const RequestProspect = () => {
  const theme = useTheme();
  const { defaultButtonStyle } = useDefaultStyles();
  const dispatch = useDispatch();

  // const { isRequestProspectForm } = useSelector(
  //   (state) => state.disclosure.drawers
  // );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: requestedProspects, isLoading } = useGetRequestedProspectQuery({
    Search: search,
    IsActive: status,
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
    <Stack height="100%" maxHeight="100%" width="100%">
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <SearchField onChange={(e) => setSearch(e.target.value)} />
        <Stack flexDirection="row">
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
        </Stack>
      </Stack>
      <Stack alignItems="center" mb={2}>
        {isLoading ? (
          <LoadingData />
        ) : totalCount > 0 ? (
          <TableContainer component={Paper}>
            <Table className="table" aria-label="custom pagination table">
              <TableHead className="tableHead">
                <TableRow>
                  <TableCell className="tableHeadCell">Owner Name</TableCell>
                  <TableCell className="tableHeadCell">Owner Address</TableCell>
                  <TableCell className="tableHeadCell">Phone Number</TableCell>
                  <TableCell className="tableHeadCell">Business Name</TableCell>
                  <TableCell className="tableHeadCell">Store Type</TableCell>
                  <TableCell className="tableHeadCell">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
                      {row?.storeType}
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
            text={`${
              status ? "No active records" : "No archived records"
            } for Prospect Requests`}
          />
        )}
      </Stack>
      <Stack alignItems="end" sx={defaultButtonStyle}>
        <Button
          onClick={() => {
            dispatch(setSelectedRow(null));
            dispatch(toggleDrawer("isRequestProspectForm"));
          }}
          startIcon={<Add sx={{ mb: "4px" }} />}
          size="small"
          className="primaryButtons"
        >
          Add
        </Button>
      </Stack>

      <RequestProspectForm />
    </Stack>
  );
};

const RequestProspectActions = ({ row }) => {
  const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  const { actionMenuStyle } = useDefaultStyles();
  const anchorRef = useRef();
  const dispatch = useDispatch();

  const menuItems = [
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

  const handleEdit = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleDrawer("isRequestProspectForm"));
  };

  const [updateRequestedProspectStatus] =
    useCreateUpdateRequestedProspectStatusMutation();
  const handleArchive = () => {
    ModalToast(
      `You are about to set the request for ${row?.ownersName} as prospect ${
        row?.isActive ? "inactive" : "active"
      }`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        updateRequestedProspectStatus(row.id);
        BasicToast(
          "success",
          `Request for ${row?.ownersName} as prospect was ${
            row?.isActive ? "archived" : "set active"
          }`,
          3500
        );
      }
    });
    dispatch(setSelectedRow(null));
  };

  const handleOnClick = (items) => {
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
