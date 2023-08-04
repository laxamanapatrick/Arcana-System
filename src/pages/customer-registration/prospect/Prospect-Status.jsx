import React, { useEffect, useRef, useState } from "react";
import {
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
import { useGetUOMQuery } from "../../../services/api";
import moment from "moment/moment";

export const ProspectStatus = () => {
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

  return (
    <>
      Status
    </>
  );
};
