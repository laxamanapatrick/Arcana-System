import React, { useEffect, useRef, useState } from "react";
import {
  // Box,
  // Button,
  // ButtonGroup,
  Checkbox,
  // Divider,
  // Drawer,
  IconButton,
  // Menu,
  // MenuItem,
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
import SearchField from "../../../../components/SearchField";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../../components/Lottie-Components";
import {
  useGetRequestedFreebieQuery,
  // useCreateRequestFreebieMutation,
  // useCreateUpdateRequestFreebieMutation,
} from "../../../../services/api";
// import moment from "moment/moment";
import {
  ProductionQuantityLimits,
  // Add, Archive, Edit, More,
  // ViewAgenda
} from "@mui/icons-material";
// import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";
import { toggleDrawer } from "../../../../services/store/disclosureSlice";
import { setSelectedRow } from "../../../../services/store/selectedRowSlice";
import {
  useDispatch,
  // useSelector
} from "react-redux";
// import { Textfield } from "../../../../components/Fields";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { prospectSchema } from "../../../../schema";
// import {
//   BasicToast,
//   ModalToast,
// } from "../../../../components/SweetAlert-Components";
// import { useDisclosure } from "../../../../hooks/useDisclosure";
import { FreebieForm } from "./Freebie-Form";

export const RequestFreebies = () => {
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: requestedFreebies, isLoading } = useGetRequestedFreebieQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = requestedFreebies?.data?.totalCount || 0;

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
                  <TableCell className="tableHeadCell">
                    Transaction Number
                  </TableCell>
                  <TableCell className="tableHeadCell">
                    {/* Actions */}
                    Freebies
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestedFreebies?.data?.freebieRequest?.map((row) => (
                  <TableRow key={row.id}>
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
                    <TableCell className="tableBodyCell">
                      <RequestFreebiesActions row={row} />
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
        ) : (
          <ZeroRecordsFound
            text={`${
              status ? "No active records" : "No archived records"
            } for Freebie Requests`}
          />
        )}
      </Stack>
      <FreebieForm />
    </Stack>
  );
};

const RequestFreebiesActions = ({ row }) => {
  // const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  // const { actionMenuStyle } = useDefaultStyles();
  // const anchorRef = useRef();
  const dispatch = useDispatch();

  // const menuItems = [
  //   {
  //     type: "view",
  //     name: "View Freebies",
  //     icon: <ViewAgenda />,
  //   },
  // ];

  const handleView = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleDrawer("isFreebieForm"));
  };

  // const handleOnClick = (items) => {
  //   if (items.type === "view") {
  //     handleView();
  //   }
  //   toggleMenu();
  // };

  return (
    <>
      <IconButton title="View freebies?" onClick={handleView}>
        <ProductionQuantityLimits />
      </IconButton>
      {/* <IconButton ref={anchorRef}
       onClick={toggleMenu}
       >
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
      </Menu> */}
    </>
  );
};
