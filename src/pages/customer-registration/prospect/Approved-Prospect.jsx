import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";
import {
  BasicToast,
  ModalToast,
} from "../../../components/SweetAlert-Components";
import { useGetApprovedProspectQuery } from "../../../services/api";

export const ApprovedProspect = ({
  status,
  search,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const { data: approvedProspects, isLoading } = useGetApprovedProspectQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = approvedProspects?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <>
      {isLoading ? (
        <LoadingData />
      ) : totalCount > 0 ? (
        // Table
        <TableContainer component={Paper} sx={{ maxHeight: "590px" }}>
          <Table className="table" aria-label="custom pagination table">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell className="tableHeadCell">Owner Name</TableCell>
                <TableCell className="tableHeadCell">Owner Address</TableCell>
                <TableCell className="tableHeadCell">Phone Number</TableCell>
                <TableCell className="tableHeadCell">Business Name</TableCell>
                <TableCell className="tableHeadCell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: "560px" }}>
              {approvedProspects?.data?.requestedProspect?.map((row) => (
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
                    {/* <RequestProspectActions row={row} /> */}
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
          text={
            search
              ? `${search} not available in for User Accounts`
              : `${
                  status ? "No active records" : "No archived records"
                } for Approved Prospects`
          }
        />
      )}
    </>
  );
};
