import React, { useEffect, useRef, useState } from "react";
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
  useGetRequestedFreebieQuery,
  useCreateApproveFreebieRequestMutation,
  useCreateRejectFreebieRequestMutation,
  jsonServerApi,
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
import { FreebieForm } from "../../customer-registration/prospect/freebies/Freebie-Form";
import { setSelectedRow } from "../../../services/store/selectedRowSlice";
import { toggleDrawer } from "../../../services/store/disclosureSlice";

export const FreebieApproval = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const {
    data: requestedFreebies,
    isLoading,
    refetch,
  } = useGetRequestedFreebieQuery({
    Search: search,
    IsActive: true,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = requestedFreebies?.data?.totalCount || 0;

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      refetch();
    }, 60000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [refetch]);

  return (
    <>
      <Stack height="100%" maxHeight="100%" width="100%">
        <Paper elevation={1} sx={defaultPaperHeaderStyle}>
          <Stack flexDirection="row" alignItems="center" gap={0.5}>
            <>
              <Badge badgeContent={totalCount} color="primary">
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.secondary.main,
                  }}
                >
                  Freebie Approval
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
            <TableContainer component={Paper} sx={{ maxHeight: "560px" }}>
              <Table className="table" aria-label="custom pagination table">
                <TableHead className="tableHead">
                  <TableRow>
                    <TableCell className="tableHeadCell">Owner Name</TableCell>
                    <TableCell className="tableHeadCell">
                      Owner Address
                    </TableCell>
                    <TableCell className="tableHeadCell">
                      Phone Number
                    </TableCell>
                    <TableCell className="tableHeadCell">
                      Transaction Number
                    </TableCell>
                    <TableCell className="tableHeadCell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ maxHeight: "520px" }}>
                  {requestedFreebies?.data?.freebieRequest?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="tableBodyCell"
                      >
                        {row?.ownersName}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row?.ownersAddress}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row?.phoneNumber}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row?.transactionNumber}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        <FreebieApprovalActions row={row} />
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
          </Paper>
        ) : (
          <ZeroRecordsFound text="No pending requests" />
        )}
      </Stack>
      <FreebieForm />
    </>
  );
};

const FreebieApprovalActions = ({ row }) => {
  const dispatch = useDispatch();
  const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  const { actionMenuStyle } = useDefaultStyles();
  const anchorRef = useRef();

  const menuItems = [
    {
      type: "view",
      name: "View Freebies",
      icon: <ViewAgenda />,
    },
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

  const handleView = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleDrawer("isFreebieForm"));
  };

  const [createApproveFreebieRequest] =
    useCreateApproveFreebieRequestMutation();
  const handleApprove = () => {
    ModalToast(
      `You are about to approve the request for prospect ${row?.ownersName}`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        createApproveFreebieRequest(row.id);
        BasicToast("success", `Freebie ${row?.ownersName} approved`, 3500);
      }
    });
    dispatch(jsonServerApi.util.invalidateTags(["Approved Freebie"]));
  };

  const formatOptionsForRemarksToast = (options) => {
    return options.reduce((formattedOptions, option) => {
      formattedOptions[option.name] = option.name;
      return formattedOptions;
    }, {});
  };

  const temporaryInputOptions = [
    { id: 1, name: "Invalid Address" },
    { id: 2, name: "Invalid Contact Number" },
    { id: 3, name: "No DTI Permit" },
  ];

  const formattedOptions = formatOptionsForRemarksToast(temporaryInputOptions);

  const [createRejectFreebieRequest] = useCreateRejectFreebieRequestMutation();
  const handleReject = () => {
    RemarksToast(
      "Reject Freebie",
      "You are about to reject this prospect.",
      "info",
      "select",
      formattedOptions,
      "Please provide a reason."
    ).then((res) => {
      if (res.isConfirmed) {
        createRejectFreebieRequest({
          payload: { reason: res.value },
          id: row.id,
        });
        BasicToast("success", `Freebie ${row?.ownersName} rejected`, 3500);
      }
    });
    dispatch(jsonServerApi.util.invalidateTags(["Rejected Freebie"]));
  };

  const handleOnClick = (items) => {
    if (items.type === "view") {
      handleView();
    } else if (items.type === "approve") {
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
