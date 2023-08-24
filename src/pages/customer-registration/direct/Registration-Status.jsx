import React, { useState } from "react";
import {
  Badge,
  Breadcrumbs,
  Button,
  Divider,
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
  useTheme,
} from "@mui/material";
import SearchField from "../../../components/SearchField";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";

export const RegistrationStatus = () => {
  const theme = useTheme();
  const [viewing, setViewing] = useState("approved");
  const [status, setStatus] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const components = {
    approved: (
      <ApprovedDirect
        status={status}
        search={search}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    ),
    rejected: (
      <RejectedDirect
        status={status}
        search={search}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    ),
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
        <Stack flexDirection="row" alignItems="center" justifyContent="center">
          {/* {!viewing && (
            <>
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
            </>
          )}
          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={viewing}
              label="Status"
              onChange={(e) => setViewing(e.target.value)}
            >
              <MenuItem value={true}>Approved</MenuItem>
              <MenuItem value={false}>Rejected</MenuItem>
            </Select>
          </FormControl> */}
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ color: theme.palette.secondary.main }}
          >
            <Stack alignItems="center">
              <Badge
                badgeContent={2}
                color="primary"
                invisible={viewing === "approved"}
              >
                <Button
                  sx={{ color: theme.palette.secondary.main }}
                  onClick={() => setViewing("approved")}
                >
                  Approved
                </Button>
              </Badge>
              {viewing === "approved" && (
                <Divider
                  sx={{
                    background: theme.palette.secondary.main,
                    width: "90px",
                    height: "1.2px",
                    transition: "width 0.8s ease-in-out",
                  }}
                />
              )}
            </Stack>
            <Stack alignItems="center">
              <Badge
                badgeContent={1}
                color="primary"
                invisible={viewing === "rejected"}
              >
                <Button
                  sx={{ color: theme.palette.secondary.main }}
                  onClick={() => setViewing("rejected")}
                >
                  Rejected
                </Button>
              </Badge>
              {viewing === "rejected" && (
                <Divider
                  sx={{
                    background: theme.palette.secondary.main,
                    width: "90px",
                    height: "1.2px",
                    transition: "width 0.8s ease-in-out",
                  }}
                />
              )}
            </Stack>
          </Breadcrumbs>
        </Stack>
      </Stack>
      <Stack>{components[viewing]}</Stack>
    </Stack>
  );
};

const ApprovedDirect = ({
  status,
  search,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const isLoading = false;
  const totalCount = 1;

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Head Cell</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                {
                  name: "Table Body",
                },
              ]?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
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
        <ZeroRecordsFound text="text here" />
      )}
    </>
  );
};

const RejectedDirect = ({
  status,
  search,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const isLoading = false;
  const totalCount = 1;

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Head Cell</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                {
                  name: "Table Body",
                },
              ]?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
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
        <ZeroRecordsFound />
      )}
    </>
  );
};

const ActionsMenu = () => {};
