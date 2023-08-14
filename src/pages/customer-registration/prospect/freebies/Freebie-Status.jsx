import { useState } from "react";
import {
  Badge,
  Breadcrumbs,
  Button,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import SearchField from "../../../../components/SearchField";
import {
  useGetApprovedFreebiesQuery,
  useGetRejectedFreebiesQuery,
} from "../../../../services/api";
import { ApprovedFreebies } from "./Approved-Freebies";
import { RejectedFreebies } from "./Rejected-Freebies";

export const FreebieStatus = () => {
  const theme = useTheme();
  const [viewing, setViewing] = useState(true);
  const [status, setStatus] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const components = {
    true: (
      <ApprovedFreebies
        status={status}
        search={search}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    ),
    false: (
      <RejectedFreebies
        status={status}
        search={search}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    ),
  };

  const { data: approved } = useGetApprovedFreebiesQuery({ status: true });
  const { data: rejected } = useGetRejectedFreebiesQuery({ status: true });

  const totalApproved = approved?.data?.totalCount || 0;
  const totalRejected = rejected?.data?.totalCount || 0;

  // const handleViewArchived = () => {};

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
          )} */}
          {/* <FormControl size="small">  
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
                badgeContent={totalApproved}
                color="primary"
                invisible={viewing}
              >
                <Button
                  sx={{ color: theme.palette.secondary.main }}
                  onClick={() => setViewing(true)}
                >
                  Approved
                </Button>
              </Badge>
              {viewing && (
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
                badgeContent={totalRejected}
                color="primary"
                invisible={!viewing}
              >
                <Button
                  sx={{ color: theme.palette.secondary.main }}
                  onClick={() => setViewing(false)}
                >
                  Rejected
                </Button>
              </Badge>
              {!viewing && (
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
      <Stack mt={2}>{components[viewing]}</Stack>
    </>
  );
};
