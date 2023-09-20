import React, { useState } from "react";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import { useDispatch } from "react-redux";
import {
  Button,
  Checkbox,
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
import { DirectForm } from "./Direct-Form";
import { toggleModal } from "../../../services/store/disclosureSlice";
import { Add } from "@mui/icons-material";

export const DirectRegistration = () => {
  const theme = useTheme();
  const { defaultButtonStyle } = useDefaultStyles();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const isLoading = false;
  const totalCount = 1;

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Stack height="100%" maxHeight="100%" width="100%">
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <SearchField
          onChange={(e) => console.log(`Search Field Value: ${e.target.value}`)}
        />
        <Stack flexDirection="row">
          <Checkbox
            size="small"
            checked={status === false}
            inputProps={{ "aria-label": "controlled" }}
            sx={{ color: theme.palette.secondary.main, mb: "2px", p: 0 }}
            onClick={() => console.log("Status change viewing")}
          />
          <Typography fontSize="small" mr={1}>
            Archived
          </Typography>
        </Stack>
      </Stack>
      <Stack>
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
        <Stack alignItems="end" mt={1} sx={defaultButtonStyle}>
          <Button
            onClick={() => {
              // dispatch(setSelectedRow(null));
              dispatch(toggleModal("isDirectForm"));
            }}
            startIcon={<Add sx={{ mb: "4px" }} />}
            size="small"
            className="primaryButtons"
          >
            Add
          </Button>
        </Stack>
      </Stack>
      <DirectForm />
    </Stack>
  );
};
