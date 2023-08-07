import { useState } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ApprovedProspect } from "./Approved-Prospect";
import { RejectedProspect } from "./Rejected-Prospect";
import SearchField from "../../../components/SearchField";

export const ProspectStatus = () => {
  const theme = useTheme();
  const [viewing, setViewing] = useState(true);
  const [status, setStatus] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const components = {
    true: (
      <ApprovedProspect
        status={status}
        search={search}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    ),
    false: (
      <RejectedProspect
        status={status}
        search={search}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    ),
  };

  const handleViewArchived = () => {
    setPage(0);
    setPageSize(25);
    setStatus((prev) => !prev);
  };

  return (
    <>
      <Stack
        width="auto"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <SearchField onChange={(e) => setSearch(e.target.value)} />
        <Stack flexDirection="row" alignItems="center" justifyContent="center">
          {!viewing && (
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
          </FormControl>
        </Stack>
      </Stack>
      <Stack mt={2}>{components[viewing]}</Stack>
    </>
  );
};
