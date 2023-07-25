import React, { useState } from "react";
import {
  Button,
  Divider,
  IconButton,
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
import { useGetUserAccountsQuery } from "../../../services/api";
import { More } from "@mui/icons-material";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../components/Lottie-Components";

export const UserAccount = () => {
  const theme = useTheme();
  const {
    defaultButtonStyle,
    defaultPaperHeaderStyle,
    defaultPaperContentStyle,
    defaultTableStyle,
  } = useDefaultStyles();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data: userAccounts, isLoading } = useGetUserAccountsQuery({
    Search: "",
    Status: true,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = userAccounts?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    console.log("Page Change");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("Rows per page", event.target.value);
    setPageSize(Number(event.target.value));
  };

  const handleAdd = () => {
    console.log(userAccounts);
  };

  return (
    <>
      <Stack height="100%" maxHeight="100%" width="100%">
        <Paper elevation={1} sx={defaultPaperHeaderStyle}>
          <Stack>
            <Typography
              sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
            >
              User Accounts
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
          ) : (
            <Stack
              width="auto"
              flexDirection="row"
              sx={{ ...defaultButtonStyle }}
            >
              <Button
                onClick={handleAdd}
                sx={{ marginRight: 1 }}
                size="small"
                className={`addRowButtons`}
              >
                Add
              </Button>
              <SearchField />
            </Stack>
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
                    <TableCell className="tableHeadCell">Fullname</TableCell>
                    <TableCell className="tableHeadCell">Username</TableCell>
                    <TableCell className="tableHeadCell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userAccounts?.data?.users?.map((row) => (
                    <TableRow key={row.username}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="tableBodyCell"
                      >
                        {row.fullname}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row.username}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        <IconButton className="actionButton">
                          <More />
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
          <ZeroRecordsFound />
        )}
      </Stack>
    </>
  );
};

export default UserAccount;
