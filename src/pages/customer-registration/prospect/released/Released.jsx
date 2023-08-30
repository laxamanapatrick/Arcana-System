import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
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
} from "@mui/material";
import SearchField from "../../../../components/SearchField";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../../components/Lottie-Components";
import { List, AppRegistration, Image, More } from "@mui/icons-material";
import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { setSelectedRow } from "../../../../services/store/selectedRowSlice";
import {
  toggleDrawer,
  toggleModal,
} from "../../../../services/store/disclosureSlice";
import { useGetAllReleasedProspectQuery } from "../../../../services/api";
import { FreebieViewing } from "../freebies/Freebie-Viewing";
import { ReleasedToDirectForm } from "./Released-Direct-Form";

export const Released = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const {
    data: releasedProspects,
    isLoading,
    refetch,
  } = useGetAllReleasedProspectQuery({
    Search: search,
    IsActive: true,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = releasedProspects?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      refetch();
    }, 60000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [refetch]);

  return (
    <>
      <Stack height="100%" maxHeight="100%" width="100%">
        <Stack
          width="auto"
          flexDirection="row"
          alignItems="center"
          justifyContent="start"
          mb={2}
        >
          <SearchField onChange={(e) => setSearch(e.target.value)} />
        </Stack>
        {isLoading ? (
          <LoadingData />
        ) : totalCount > 0 ? (
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
                  <TableCell className="tableHeadCell">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ maxHeight: "520px" }}>
                {releasedProspects?.data?.releasedProspecting?.map((row) => (
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
                      {row?.transactionNumber}
                    </TableCell>
                    <TableCell className="tableBodyCell">
                      <ReleasedActions row={row} />
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
          <ZeroRecordsFound text="No pending requests" />
        )}
      </Stack>
      <FreebieViewing />
      <ReleasedToDirectForm />
    </>
  );
};

const ReleasedActions = ({ row }) => {
  const dispatch = useDispatch();
  const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  const { actionMenuStyle } = useDefaultStyles();
  const anchorRef = useRef();

  const menuItems = [
    {
      type: "view freebies",
      name: "View Freebies",
      icon: <List />,
    },
    {
      type: "direct",
      name: "Register as Direct",
      icon: <AppRegistration />,
    },
  ];

  const handleViewFreebies = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleModal("isFreebieViewing"));
  };

  const handleDirectRegistration = () => {
    dispatch(toggleDrawer("isReleasedToDirectForm"));
  };

  const handleOnClick = (items) => {
    if (items.type === "view freebies") {
      handleViewFreebies();
    } else if (items.type === "direct") {
      handleDirectRegistration();
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
