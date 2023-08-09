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
  TextField as MuiTextField,
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
  useGetItemsQuery,
  useCreateItemsMutation,
  useUpdateItemsMutation,
  useUpdateItemsStatusMutation,
  // useGetProductCategoryQuery,
  useGetUOMQuery,
  useGetMeatTypeQuery,
  useGetProductSubCategoryQuery,
} from "../../../../services/api";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../../services/store/disclosureSlice";
import { itemsSchema } from "../../../../schema";
import { AutoComplete, Textfield } from "../../../../components/Fields";
import { setSelectedRow } from "../../../../services/store/selectedRowSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const Items = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data: items, isLoading } = useGetItemsQuery({
    Search: search,
    IsActive: status,
    PageNumber: page + 1,
    PageSize: pageSize,
  });
  const totalCount = items?.data?.totalCount || 0;

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
                Products
              </Typography>
            </>
            {isLoading ? (
              <Skeleton variant="rectangular" />
            ) : status === true ? (
              <ItemsForm />
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
                    <TableCell className="tableHeadCell">Item Code</TableCell>
                    <TableCell className="tableHeadCell">
                      Items Description
                    </TableCell>
                    <TableCell className="tableHeadCell">UOM</TableCell>
                    <TableCell className="tableHeadCell">
                      Product Category
                    </TableCell>
                    <TableCell className="tableHeadCell">
                      Product Sub Category
                    </TableCell>
                    <TableCell className="tableHeadCell">Meat Type</TableCell>
                    <TableCell className="tableHeadCell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items?.data?.items?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="tableBodyCell"
                      >
                        {row.itemCode}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row.itemDescription}
                      </TableCell>
                      <TableCell className="tableBodyCell">{row.uom}</TableCell>
                      <TableCell className="tableBodyCell">
                        {row.productCategory}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row.productSubCategoryName}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        {row.meatType}
                      </TableCell>
                      <TableCell className="tableBodyCell">
                        <ItemsActions row={row} />
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
                      colSpan={7}
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
            } for Items`}
          />
        )}
      </Stack>
    </>
  );
};

export default Items;

const ItemsActions = ({ row }) => {
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
    dispatch(toggleDrawer("isItemsForm"));
  };

  const [updateItemsStatus] = useUpdateItemsStatusMutation();
  const handleArchive = () => {
    ModalToast(
      `You are about to set ${row?.itemCode} as ${
        row?.isActive ? "inactive" : "active"
      }`,
      "Are you sure you want to proceed?",
      "question"
    ).then((res) => {
      if (res.isConfirmed) {
        updateItemsStatus(row.id);
        BasicToast(
          "success",
          `Item ${row?.itemCode} was ${
            row?.isActive ? "archived" : "set active"
          }`,
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

const ItemsForm = () => {
  const dispatch = useDispatch();
  const { data: uoms } = useGetUOMQuery();
  const { data: productSubCategories } = useGetProductSubCategoryQuery();
  const { data: meatTypes } = useGetMeatTypeQuery();
  const { isItemsForm } = useSelector((state) => state.disclosure.drawers);
  const { selectedRowData } = useSelector((state) => state.selectedRowData);

  const theme = useTheme();
  const { defaultButtonStyle } = useDefaultStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(itemsSchema),
    mode: "onChange",
    defaultValues: {
      id: "",
      itemCode: "",
      itemDescription: "",
      // productCategory: null,
      productSubCategory: null,
      uom: null,
      meatType: null,
    },
  });

  useEffect(() => {
    if (selectedRowData !== null) {
      setValue("id", selectedRowData?.id);
      setValue("itemCode", selectedRowData?.itemCode);
      setValue("itemDescription", selectedRowData?.itemDescription);
      setValue(
        "productSubCategory",
        productSubCategories?.data?.productSubCategories?.find((item) => {
          if (
            item?.productSubCategoryName ===
            selectedRowData?.productSubCategoryName
          )
            return item;
          return null;
        })
      );
      setValue(
        "uom",
        uoms?.data?.uom?.find((item) => {
          if (item?.uomCode === selectedRowData?.uom) return item;
          return null;
        })
      );
      setValue(
        "meatType",
        meatTypes?.data?.meatTypes?.find((item) => {
          if (item?.meatTypeName === selectedRowData?.meatType) return item;
          return null;
        })
      );
    }

    return () => {
      setValue("id", "");
      setValue("itemCode", "");
      setValue("itemDescription", "");
      setValue("productSubCategory", null);
      setValue("uom", null);
      setValue("meatType", null);
    };
  }, [selectedRowData, dispatch]);

  const [createItems] = useCreateItemsMutation();
  const [updateItems] = useUpdateItemsMutation();
  const submitAddOrEditHandler = async (data) => {
    const addPayload = {
      itemCode: data?.itemCode,
      itemDescription: data?.itemDescription,
      uomId: data?.uom?.id,
      productSubCategoryId: data?.productSubCategory?.id,
      meatTypeId: data?.meatType?.id,
    };
    const editPayload = {
      // id: data?.id,
      // itemCode: data?.itemCode,
      itemDescription: data?.itemDescription,
      uomId: data?.uom?.id,
      productSubCategoryId: data?.productSubCategory?.id,
      meatTypeId: data?.meatType?.id,
    };
    try {
      if (selectedRowData === null) {
        console.log("Add Payload", addPayload);
        await createItems(addPayload).unwrap();
        BasicToast("success", `Item Code ${data?.itemCode} was created`, 1500);
      } else {
        console.log("Edit Payload", editPayload);
        await updateItems({
          payload: editPayload,
          id: selectedRowData?.id,
        }).unwrap();
        BasicToast("success", `Item successfully updated!`, 1500);
      }
    } catch (error) {
      BasicToast("error", `${error?.data?.messages[0]}`, 1500);
      console.log(error);
      return;
    }
    reset();
    dispatch(setSelectedRow(null));
    dispatch(toggleDrawer("isItemsForm"));
  };

  const getProductSubCategoryObject = getValues("productSubCategory");
  const productSubCategoryNameDisplay =
    getProductSubCategoryObject?.productSubCategoryName;
  const productCategoryNameDisplay =
    getProductSubCategoryObject?.productCategoryName;

  return (
    <Stack width="auto" flexDirection="row" sx={{ ...defaultButtonStyle }}>
      <Button
        onClick={() => {
          reset();
          dispatch(setSelectedRow(null));
          dispatch(toggleDrawer("isItemsForm"));
        }}
        sx={{ marginRight: 1 }}
        size="small"
        className="addRowButtons"
      >
        Add
      </Button>
      <Drawer
        open={isItemsForm}
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
              {`${selectedRowData?.id ? "Edit" : "New"} Products Form`}
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
                name="itemCode"
                control={control}
                label="Item Code"
                size="small"
                autoComplete="off"
                error={!!errors?.itemCode}
                helperText={errors?.itemCode?.message}
                title={
                  selectedRowData !== null
                    ? "Item Code is not an editable field"
                    : ""
                }
                inputProps={{
                  readOnly: selectedRowData !== null ? true : false,
                  style: {
                    cursor: selectedRowData !== null ? "not-allowed" : "",
                  },
                }}
              />

              <Textfield
                name="itemDescription"
                control={control}
                label="Item Description"
                size="small"
                autoComplete="off"
                error={!!errors?.itemDescription}
                helperText={errors?.itemDescription?.message}
              />

              <AutoComplete
                name="uom"
                control={control}
                options={uoms?.data?.uom}
                getOptionLabel={(option) => option?.uomCode}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    label="UOM"
                    size="small"
                    error={!!errors?.uom}
                    helperText={errors?.uom?.message}
                  />
                )}
                disablePortal
                disableClearable
              />

              <AutoComplete
                name="productSubCategory"
                control={control}
                options={productSubCategories?.data?.productSubCategories}
                getOptionLabel={(option) => option?.productSubCategoryName}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    label="Product Sub Category"
                    size="small"
                    error={!!errors?.productSubCategory}
                    helperText={errors?.productSubCategory?.message}
                  />
                )}
                disablePortal
                disableClearable
              />

              {watch("productSubCategory") !== null && (
                <MuiTextField
                  title={
                    productSubCategoryNameDisplay
                      ? `Product Category for ${productSubCategoryNameDisplay}. This field is not editable.`
                      : ""
                  }
                  value={productCategoryNameDisplay}
                  label="Product Category"
                  size="small"
                  inputProps={{
                    readOnly: true,
                    style: {
                      cursor: "not-allowed",
                    },
                  }}
                />
              )}

              <AutoComplete
                name="meatType"
                control={control}
                options={meatTypes?.data?.meatTypes}
                getOptionLabel={(option) => option?.meatTypeName}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    label="Meat Type"
                    size="small"
                    error={!!errors?.meatType}
                    helperText={errors?.meatType?.message}
                  />
                )}
                disablePortal
                disableClearable
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
                onClick={() => dispatch(toggleDrawer("isItemsForm"))}
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
