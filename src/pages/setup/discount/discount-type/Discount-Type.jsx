import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
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
import {
  Archive,
  Edit,
  More,
  // ViewAgenda
} from "@mui/icons-material";
import SearchField from "../../../../components/SearchField";
import {
  LoadingData,
  ZeroRecordsFound,
} from "../../../../components/Lottie-Components";
import {
  BasicToast,
  ModalToast,
} from "../../../../components/SweetAlert-Components";

import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";

import {
  useGetDiscountQuery,
  useCreateDiscountMutation,
  useUpdateDiscountMutation,
  useUpdateDiscountStatusMutation,
} from "../../../../services/api";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../../services/store/disclosureSlice";
import { discountSchema } from "../../../../schema";
import { Textfield } from "../../../../components/Fields";
import { setSelectedRow } from "../../../../services/store/selectedRowSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const DiscountType = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: discounts, isLoading } = useGetDiscountQuery({
    Search: search,
    Status: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = discounts?.data?.totalCount || 0;

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

  return (
    <>
      <Stack height="100%" maxHeight="100%" width="100%">
        <Paper elevation={1} sx={defaultPaperHeaderStyle}>
          <Stack flexDirection="row" alignItems="center" gap={0.5}>
            <>
              <Typography
                sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
              >
                Discount
              </Typography>
            </>
            {isLoading ? (
              <Skeleton variant="rectangular" />
            ) : status === true ? (
              <DiscountTypeForm />
            ) : (
              ""
            )}
          </Stack>
          <Stack
            width="auto"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
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
            <SearchField onChange={(e) => setSearch(e.target.value)} />
          </Stack>
        </Paper>
        {isLoading ? (
          <LoadingData />
        ) : totalCount > 0 ? (
          <Paper elevation={20} sx={defaultPaperContentStyle}>
            <TableContainer component={Paper}>
              <Table className="table" aria-label="custom pagination table">
                <TableHead className="tableHead">
                  <TableRow>
                    <TableCell className="tableHeadCell">Amount Minimum</TableCell>
                    <TableCell className="tableHeadCell">Amount Maximum</TableCell>
                    <TableCell className="tableHeadCell">
                      Discount Minimum
                    </TableCell>
                    <TableCell className="tableHeadCell">
                      Discount Maximum
                    </TableCell>
                    <TableCell className="tableHeadCell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {discounts?.data?.discount?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="tableBodyCell"
                      >
                        {row.lowerBound}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row.upperBound}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {`${row.commissionRateLower}%`}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {`${row.commissionRateUpper}%`}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        <DiscountTypeActions row={row} />
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
          <ZeroRecordsFound
            text={`${
              status ? "No active records" : "No archived records"
            } for DiscountType`}
          />
        )}
      </Stack>
    </>
  );
};

export default DiscountType;

const DiscountTypeActions = ({ row }) => {
  const { isOpen: isMenu, onToggle: toggleMenu } = useDisclosure();
  const { actionMenuStyle } = useDefaultStyles();
  const anchorRef = useRef();
  const dispatch = useDispatch();

  const menuItems = [
    // {
    //   type: "view",
    //   name: "View More",
    //   icon: <ViewAgenda />,
    // },
    {
      type: "edit",
      name: "Edit",
      icon: <Edit />,
    },
    {
      type: "archive",
      name: row?.isActive ? "Archive" : "Restore",
      icon: <Archive />,
    },
  ];

  // const handleView = () => {
  //   console.log("View More", row);
  // };

  const handleEdit = () => {
    dispatch(setSelectedRow(row));
    dispatch(toggleDrawer("isDiscountForm"));
  };

  const [updateDiscountStatus] = useUpdateDiscountStatusMutation();
  const handleArchive = () => {
    ModalToast(
      `You are about to set this discount type as ${
        row?.isActive ? "inactive" : "active"
      }`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        updateDiscountStatus(row.id);
        BasicToast(
          "success",
          `Discount Type was ${row?.isActive ? "archived" : "set active"}`,
          3500
        );
      }
    });
    dispatch(setSelectedRow(null));
  };

  const handleOnClick = (items) => {
    // if (items.type === "view") {
    //   handleView();
    // } else
    if (items.type === "edit") {
      handleEdit();
    } else if (items.type === "archive") {
      handleArchive();
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

const DiscountTypeForm = () => {
  const dispatch = useDispatch();
  const { isDiscountForm } = useSelector((state) => state.disclosure.drawers);
  const { selectedRowData } = useSelector((state) => state.selectedRowData);

  const theme = useTheme();
  const { defaultButtonStyle } = useDefaultStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(discountSchema),
    mode: "onChange",
    defaultValues: {
      id: "",
      lowerBound: "",
      upperBound: "",
      commissionRateLower: "",
      commissionRateUpper: "",
    },
  });

  useEffect(
    () => {
      if (selectedRowData !== null) {
        setValue("id", Number(selectedRowData?.id));
        setValue("lowerBound", Number(selectedRowData?.lowerBound));
        setValue("upperBound", Number(selectedRowData?.upperBound));
        setValue(
          "commissionRateLower",
          Number(selectedRowData?.commissionRateLower)
        );
        setValue(
          "commissionRateUpper",
          Number(selectedRowData?.commissionRateUpper)
        );
      }

      return () => {
        setValue("id", "");
        setValue("lowerBound", "");
        setValue("upperBound", "");
        setValue("commissionRateLower", "");
        setValue("commissionRateUpper", "");
      };
    },
    [selectedRowData, dispatch],
    setValue
  );

  const [createDiscount] = useCreateDiscountMutation();
  const [updateDiscount] = useUpdateDiscountMutation();
  const submitAddOrEditHandler = async (data) => {
    try {
      if (selectedRowData === null) {
        await createDiscount(data).unwrap();
        BasicToast("success", `Discount type was created!`, 1500);
      } else {
        await updateDiscount({
          payload: data,
          id: selectedRowData?.id,
        }).unwrap();
        BasicToast("success", `Discount type successfully updated!`, 1500);
      }
    } catch (error) {
      BasicToast("error", `${error?.data?.messages[0]}`, 1500);
      console.log(error);
      return
    }
    reset();
    dispatch(setSelectedRow(null));
    dispatch(toggleDrawer("isDiscountForm"));
  };

  return (
    <Stack width="auto" flexDirection="row" sx={{ ...defaultButtonStyle }}>
      <Button
        onClick={() => {
          reset();
          dispatch(setSelectedRow(null));
          dispatch(toggleDrawer("isDiscountForm"));
        }}
        sx={{ marginRight: 1 }}
        size="small"
        className="addRowButtons"
      >
        Add
      </Button>
      <Drawer
        open={isDiscountForm}
        onClose={() => {}}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            height: "100%",
            background: "none",
            bgcolor: "white",
            ...defaultButtonStyle,
          },
        }}
        anchor="right"
      >
        <form
          style={{ height: "100%" }}
          onSubmit={handleSubmit(submitAddOrEditHandler)}
        >
          <Stack sx={{ height: "100%" }}>
            <Box
              sx={{
                height: "6%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.primary.main,
                fontWeight: "bold",
              }}
            >
              {`${selectedRowData?.id ? "Edit" : "New"} DiscountType Form`}
            </Box>
            <Divider
              sx={{
                height: "1.5px",
                color: theme.palette.secondary.main,
                bgcolor: theme.palette.secondary.main,
              }}
            />
            <Box
              sx={{
                height: "100%",
                p: 2,
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Textfield
                name="lowerBound"
                control={control}
                label="Amount Minimum"
                size="small"
                autoComplete="off"
                error={!!errors?.lowerBound}
                helperText={errors?.lowerBound?.message}
                type="number"
                inputProps={{
                  min: 0,
                }}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) =>
                  ["E", "e", ".", "+", "-"].includes(e.key) &&
                  e.preventDefault()
                }
                onPaste={(e) => e.preventDefault()}
              />

              <Textfield
                name="upperBound"
                control={control}
                label="Amount Maximum"
                size="small"
                autoComplete="off"
                error={!!errors?.upperBound}
                helperText={errors?.upperBound?.message}
                type="number"
                inputProps={{
                  min: 1,
                }}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) =>
                  ["E", "e", ".", "+", "-"].includes(e.key) &&
                  e.preventDefault()
                }
                onPaste={(e) => e.preventDefault()}
              />

              <Textfield
                name="commissionRateLower"
                control={control}
                label="Discount Minimum Percentage"
                size="small"
                autoComplete="off"
                error={!!errors?.commissionRateLower}
                helperText={errors?.commissionRateLower?.message}
                type="number"
                inputProps={{
                  min: 1,
                }}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) =>
                  ["E", "e", ".", "+", "-"].includes(e.key) &&
                  e.preventDefault()
                }
                onPaste={(e) => e.preventDefault()}
              />

              <Textfield
                name="commissionRateUpper"
                control={control}
                label="Discount Maximum Percentage"
                size="small"
                autoComplete="off"
                error={!!errors?.commissionRateUpper}
                helperText={errors?.commissionRateUpper?.message}
                type="number"
                inputProps={{
                  min: 1,
                }}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) =>
                  ["E", "e", ".", "+", "-"].includes(e.key) &&
                  e.preventDefault()
                }
                onPaste={(e) => e.preventDefault()}
              />
            </Box>

            <Divider
              sx={{
                height: "1.5px",
                color: theme.palette.secondary.main,
                bgcolor: theme.palette.secondary.main,
              }}
            />
            <ButtonGroup sx={{ gap: 1, m: 1, justifyContent: "end" }}>
              <Button className="primaryButtons" type="submit" tabIndex={0}>
                Add
              </Button>
              <Button
                className="cancelButtons"
                onClick={() => dispatch(toggleDrawer("isDiscountForm"))}
                tabIndex={0}
              >
                Close
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Drawer>
    </Stack>
  );
};
