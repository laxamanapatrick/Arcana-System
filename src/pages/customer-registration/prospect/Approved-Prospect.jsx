import React from "react";
import {
  IconButton,
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
import {
  useCreateUpdateApprovedProspectStatusMutation,
  useGetApprovedProspectQuery,
} from "../../../services/api";
import { Archive, Restore } from "@mui/icons-material";

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

  const [createUpdateApprovedProspectStatus] =
    useCreateUpdateApprovedProspectStatusMutation();
  const handleArchiveRestore = (id, isActive) => {
    ModalToast(
      `You are about to set this approved prospect ${
        isActive ? "inactive" : "active"
      }`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        createUpdateApprovedProspectStatus(id);
        BasicToast(
          "success",
          `Approved Prospect was ${isActive ? "archived" : "set active"}`,
          3500
        );
      }
    });
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
                <TableCell className="tableHeadCell">
                  {status ? "Archive" : "Restore"}
                </TableCell>
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
                    <IconButton
                      onClick={() => handleArchiveRestore(row.id, row.isActive)}
                    >
                      {status ? <Archive /> : <Restore />}
                    </IconButton>
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
              ? `${search} not available in for Approved Prospects`
              : `${
                  status ? "No active records" : "No archived records"
                } for Approved Prospects`
          }
        />
      )}
    </>
  );
};
