import React, { useRef, useState } from "react";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
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
import {
  useGetRequestedProspectQuery,
  useCreateApproveProspectRequestMutation,
  useCreateRejectProspectRequestMutation,
} from "../../../services/api";
import { ApprovalTwoTone, More, Remove, ViewAgenda } from "@mui/icons-material";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import { useDispatch } from "react-redux";
import {
  BasicToast,
  ModalToast,
  RemarksToast,
} from "../../../components/SweetAlert-Components";
import { useDisclosure } from "../../../hooks/useDisclosure";

export const ProspectApproval = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: requestedProspects, isLoading } = useGetRequestedProspectQuery({
    Search: search,
    IsActive: true,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = requestedProspects?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <>
      {/* <Stack height="100%" maxHeight="100%" width="100%"> */}
      <Paper elevation={1} sx={defaultPaperHeaderStyle}>
        <Stack flexDirection="row" alignItems="center" gap={0.5}>
          <>
            <Badge badgeContent={totalCount} color="primary">
              <Typography
                sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
              >
                Prospect Approval
              </Typography>
            </Badge>
          </>
        </Stack>
        <Stack
          width="auto"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <SearchField onChange={(e) => setSearch(e.target.value)} />
        </Stack>
      </Paper>
      {isLoading ? (
        <LoadingData />
      ) : totalCount > 0 ? (
        <Paper elevation={20} sx={defaultPaperContentStyle}>
          {/* Table */}
          <TableContainer component={Paper} sx={{ maxHeight: "590px" }}>
            <Table className="table" aria-label="custom pagination table">
              <TableHead className="tableHead">
                <TableRow>
                  <TableCell className="tableHeadCell">Owner Name</TableCell>
                  <TableCell className="tableHeadCell">Owner Address</TableCell>
                  <TableCell className="tableHeadCell">Phone Number</TableCell>
                  <TableCell className="tableHeadCell">Business Name</TableCell>
                  <TableCell className="tableHeadCell">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ maxHeight: "560px" }}>
                {requestedProspects?.data?.requestedProspect?.map((row) => (
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
                      <ProspectApprovalActions row={row} />
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
        </Paper>
      ) : (
        <ZeroRecordsFound text="No pending requests" />
      )}
      {/* </Stack> */}
    </>
  );
};

const ProspectApprovalActions = ({ row }) => {
  const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  const { actionMenuStyle } = useDefaultStyles();
  const anchorRef = useRef();

  const menuItems = [
    // {
    //   type: "view",
    //   name: "View Details",
    //   icon: <ViewAgenda />,
    // },
    {
      type: "approve",
      name: "Approve",
      icon: <ApprovalTwoTone />,
    },
    {
      type: "reject",
      name: "Reject",
      icon: <Remove />,
    },
  ];

  const [createApproveProspectRequest] =
    useCreateApproveProspectRequestMutation();
  const handleApprove = () => {
    ModalToast(
      `You are about to approve the request for prospect ${row?.ownersName}`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        createApproveProspectRequest(row.id);
        BasicToast("success", `Prospect ${row?.ownersName} approved`, 3500);
      }
    });
  };

  const [createRejectProspectRequest] =
    useCreateRejectProspectRequestMutation();
  const handleReject = () => {
    // ModalToast(
    //   `You are about to reject the request for prospect ${row?.ownersName}`,
    //   "Are you sure you want to proceed?",
    //   "question"
    // ).then((res) => {
    //   if (res.isConfirmed) {
    //     createRejectProspectRequest(row.id);
    //     BasicToast("success", `Prospect ${row?.ownersName} rejected`, 3500);
    //   }
    // });

    RemarksToast(
      "Reject Prospect",
      "You are about to reject this prospect.",
      "info",
      "",
      "Please provide a reason."
    ).then((res) => {
      if (res.isConfirmed) {
        createRejectProspectRequest({
          payload: { reason: res.value },
          id: row.id,
        });
        BasicToast("success", `Prospect ${row?.ownersName} rejected`, 3500);
      }
    });
  };

  const handleOnClick = (items) => {
    if (items.type === "approve") {
      handleApprove();
    } else if (items.type === "reject") {
      handleReject();
    }
    toggleMenu();
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={toggleMenu}>
        <More />
      </IconButton>
      <Menu
        anchorEl={anchorRef.current}
        open={isMenu}
        onClose={toggleMenu}
        PaperProps={{
          style: {
            maxHeight: 45 * 4.5,
            width: "20ch",
            ...actionMenuStyle,
          },
        }}
      >
        {menuItems?.map((items) => (
          <MenuItem
            onClick={() => handleOnClick(items)}
            key={items.type}
            sx={{ gap: 1, textAlign: "center" }}
          >
            {items.icon}
            {items.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
