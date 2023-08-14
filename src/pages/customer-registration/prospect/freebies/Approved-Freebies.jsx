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
  TextField as MuiTextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../../components/Lottie-Components";
import {
  useGetApprovedFreebiesQuery,
  useCreateUpdateApprovedFreebiesMutation,
  useGetStoreTypeQuery,
  jsonServerApi,
} from "../../../../services/api";
import { Edit, List, More } from "@mui/icons-material";
import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";
import { toggleDrawer } from "../../../../services/store/disclosureSlice";
import { setSelectedRow } from "../../../../services/store/selectedRowSlice";
import { useDispatch, useSelector } from "react-redux";
import { AutoComplete, Textfield } from "../../../../components/Fields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { prospectSchema } from "../../../../schema";
import {
  BasicToast,
  ModalToast,
} from "../../../../components/SweetAlert-Components";
import { FreebieForm } from "./Freebie-Form";
import { useDisclosure } from "../../../../hooks/useDisclosure";

export const ApprovedFreebies = ({
  status,
  search,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const { data: approvedFreebies, isLoading } = useGetApprovedFreebiesQuery(
    {
      Search: search,
      Status: status,
      PageNumber: page + 1,
      PageSize: pageSize,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const totalCount = approvedFreebies?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Stack alignItems="center">
      {isLoading ? (
        <LoadingData />
      ) : totalCount > 0 ? (
        // Table
        <TableContainer component={Paper} sx={{ maxHeight: "560px" }}>
          <Table className="table" aria-label="custom pagination table">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell className="tableHeadCell">Owner Name</TableCell>
                <TableCell className="tableHeadCell">Owner Address</TableCell>
                <TableCell className="tableHeadCell">Phone Number</TableCell>
                <TableCell className="tableHeadCell">
                  Transaction Number
                </TableCell>
                {/* <TableCell className="tableHeadCell">Store Type</TableCell> */}
                <TableCell className="tableHeadCell">Actions</TableCell>
                {/* <TableCell className="tableHeadCell">
                  Request Freebies
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: "520px" }}>
              {approvedFreebies?.data?.approvedFreebies?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableBodyCell"
                  >
                    {row?.ownersName}
                  </TableCell>
                  <TableCell className="tableBodyCell">
                    {row?.ownersAddress}
                  </TableCell>
                  <TableCell className="tableBodyCell">
                    {row?.phoneNumber}
                  </TableCell>
                  <TableCell className="tableBodyCell">
                    {row?.transactionNumber}
                  </TableCell>
                  {/* <TableCell className="tableBodyCell">
                    {row?.storeType}
                  </TableCell> */}
                  <TableCell className="tableBodyCell">
                    <ApprovedPospectActions row={row} />
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
              ? `${search} not available in for Approved Freebiess`
              : `${
                  status ? "No active records" : "No archived records"
                } for Approved Freebiess`
          }
        />
      )}
      <FreebieForm />
    </Stack>
  );
};

const ApprovedPospectActions = ({ row }) => {
  const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  const { actionMenuStyle } = useDefaultStyles();
  const anchorRef = useRef();
  const dispatch = useDispatch();

  const menuItems = [
    {
      type: "freebie",
      name: "View Freebie",
      icon: <List />,
    },
  ];

  const handleFreebie = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleDrawer("isFreebieForm"));
  };

  // const [createUpdateApprovedFreebiesStatus] =
  //   useCreateUpdateApprovedFreebiesStatusMutation();
  // const handleArchiveRestore = (id, isActive) => {
  //   ModalToast(
  //     `You are about to set this approved prospect ${
  //       isActive ? "inactive" : "active"
  //     }`,
  //     "Are you sure you want to proceed?",
  //     "question"
  //   ).then((res) => {
  //     if (res.isConfirmed) {
  //       createUpdateApprovedFreebiesStatus(id);
  //       BasicToast(
  //         "success",
  //         `Approved Freebies was ${isActive ? "archived" : "set active"}`,
  //         3500
  //       );
  //     }
  //   });
  // };

  const handleOnClick = (items) => {
    if (items.type === "freebie") {
      handleFreebie();
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
