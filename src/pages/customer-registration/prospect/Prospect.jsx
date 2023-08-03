import React, { useEffect, useRef, useState } from "react";
import {
  Checkbox,
  Divider,
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
import SearchField from "../../../components/SearchField";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import { useGetUOMQuery } from "../../../services/api";
import moment from "moment/moment";
import { prospectNavbar } from "../../../routes/navigationData";

export const Prospect = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: uoms, isLoading } = useGetUOMQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = uoms?.data?.totalCount || 0;

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

  const [viewing, setViewing] = useState("");

  return (
    <>
      <Stack height="100%" maxHeight="100%" width="100%">
        <Paper elevation={1} sx={defaultPaperHeaderStyle}>
          {prospectNavbar?.map((item, i) => (
            <Stack
              sx={{ cursor: "pointer", alignItems: "center", width: "160px" }}
              key={i}
              onClick={() => setViewing(Number(item.case))}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.secondary.main,
                  textAlign: "center",
                }}
              >
                {item.name}
              </Typography>
              {item.case === viewing && (
                <Divider
                  sx={{
                    background: theme.palette.secondary.main,
                    width: "160px",
                    height: "1.5px",
                    transition: "width 0.8s ease-in-out",
                  }}
                />
              )}
            </Stack>
          ))}
        </Paper>

        <Paper elevation={20} sx={defaultPaperContentStyle}>
          {isLoading ? (
            <LoadingData />
          ) : totalCount > 0 ? (
            <>
              <Stack mx={1} mb={2}>
                <Typography>Buttons</Typography>
              </Stack>
              {/* Table */}
              <TableContainer component={Paper} sx={{ maxHeight: "590px" }}>
                <Table className="table" aria-label="custom pagination table">
                  <TableHead className="tableHead">
                    <TableRow>
                      <TableCell className="tableHeadCell">THEAD 1</TableCell>
                      <TableCell className="tableHeadCell">THEAD 2</TableCell>
                      <TableCell className="tableHeadCell">THEAD 3</TableCell>
                      <TableCell className="tableHeadCell">THEAD 4</TableCell>
                      <TableCell className="tableHeadCell">THEAD 5</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ maxHeight: "560px" }}>
                    {uoms?.data?.uom?.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          className="tableBodyCell"
                        >
                          {row.uomCode}
                        </TableCell>
                        <TableCell className="tableBodyCell">
                          {row?.uomDescription}
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
                          {/* <UOMActions row={row} /> */}
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
            </>
          ) : (
            <ZeroRecordsFound
              text={`${
                status ? "No active records" : "No archived records"
              } for UOM`}
            />
          )}
        </Paper>
      </Stack>
    </>
  );
};

export default Prospect;
