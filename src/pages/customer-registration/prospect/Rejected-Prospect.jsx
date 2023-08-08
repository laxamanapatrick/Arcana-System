import React from "react";
import {
  IconButton,
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
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";
import {
  BasicToast,
  ModalToast,
} from "../../../components/SweetAlert-Components";
import {
  useCreateUpdateRejectedProspectStatusMutation,
  useGetRejectedProspectQuery,
} from "../../../services/api";
import { Archive, Restore } from "@mui/icons-material";

export const RejectedProspect = ({
  status,
  search,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const { data: rejectedProspects, isLoading } = useGetRejectedProspectQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = rejectedProspects?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const [createUpdateRejectedProspectStatus] =
    useCreateUpdateRejectedProspectStatusMutation();
  const handleArchiveRestore = (id, isActive) => {
    ModalToast(
      `You are about to set this rejected prospect ${
        isActive ? "inactive" : "active"
      }`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        createUpdateRejectedProspectStatus(id);
        BasicToast(
          "success",
          `Rejected Prospect was ${isActive ? "archived" : "set active"}`,
          3500
        );
      }
    });
  };

  return (
    <Stack alignItems="center">
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
                <TableCell className="tableHeadCell">Reason</TableCell>
                <TableCell className="tableHeadCell">
                  {status ? "Archive" : "Restore"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: "560px" }}>
              {rejectedProspects?.data?.requestedProspect?.map((row) => (
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
                  <TableCell className="tableBodyCell">{row?.reason}</TableCell>
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
              ? `${search} not available in for Rejected Prospects`
              : `${
                  status ? "No active records" : "No archived records"
                } for Rejected Prospects`
          }
        />
      )}
    </Stack>
  );
};
