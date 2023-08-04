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
import { ApprovedFreebies } from "../freebies/Approved-Freebies";
import { RejectedFreebies } from "../freebies/Rejected-Freebies";

export const FreebieStatus = () => {
  const theme = useTheme();
  const [viewing, setViewing] = useState(true);
  const [status, setStatus] = useState(true);

  const components = {
    true: <ApprovedFreebies />,
    false: <RejectedFreebies />,
  };

  return (
    <Stack>
      <Stack flexDirection="row" justifyContent="space-between">
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
        <Stack flexDirection="row" alignItems="center" justifyContent="center">
          <Checkbox
            size="small"
            checked={status === false}
            onClick={() => setStatus((prev) => !prev)}
            inputProps={{ "aria-label": "controlled" }}
            sx={{ color: theme.palette.secondary.main, mb: "2px", p: 0 }}
          />
          <Typography fontSize="small" mr={1}>
            Archived
          </Typography>
        </Stack>
      </Stack>
      <Stack mt={2}>{components[viewing]}</Stack>
    </Stack>
  );
};
