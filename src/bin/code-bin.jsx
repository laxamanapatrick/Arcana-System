// import React from "react";
// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Divider,
//   Drawer,
//   Stack,
//   // TextField as MuiTextField,
//   useTheme,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   // TableFooter,
//   TableHead,
//   // TablePagination,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleDrawer } from "../../../../services/store/disclosureSlice";
// import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";
// import { useGetItemsQuery } from "../../../../services/api";

// export const FreebieViewing = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const { defaultButtonStyle } = useDefaultStyles();
//   const { isFreebieViewing } = useSelector((state) => state.disclosure.drawers);

//   const { data: itemData } = useGetItemsQuery();
//   const { selectedRowData } = useSelector((state) => state.selectedRowData);

//   const clientId = selectedRowData?.clientId
//     ? selectedRowData?.clientId
//     : selectedRowData?.id;

//   const defaultFreebieValues = selectedRowData?.freebies?.map((item) => {
//     const selectedItem = itemData?.data?.items?.find(
//       (option) => option?.itemCode === item?.itemCode
//     );

//     return {
//       items: selectedItem || null,
//       quantity: item?.quantity || "",
//     };
//   });

//   return (
//     <Drawer
//       open={isFreebieViewing}
//       onClose={() => {}}
//       sx={{
//         "& .MuiDrawer-paper": {
//           width: 965,
//           height: "100%",
//           background: "none",
//           bgcolor: "white",
//           ...defaultButtonStyle,
//         },
//       }}
//       anchor="right"
//     >
//       <Stack sx={{ height: "100%" }}>
//         <Box
//           sx={{
//             height: "6%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: theme.palette.primary.main,
//             fontWeight: "bold",
//           }}
//         >
//           Freebie Form
//         </Box>
//         <Divider
//           sx={{
//             height: "1.5px",
//             color: theme.palette.secondary.main,
//             bgcolor: theme.palette.secondary.main,
//           }}
//         />

//         <Box
//           sx={{
//             height: "100%",
//             p: 2,
//             display: "flex",
//             justifyContent: "start",
//             flexDirection: "column",
//             gap: 3,
//           }}
//         >
//           <Box
//             sx={{
//               gap: 1,
//               display: "flex",
//               justifyContent: "center",
//               flexDirection: "row",
//               width: "100%",
//             }}
//           >
//             <TableContainer component={Paper} sx={{ maxHeight: "560px" }}>
//               <Table className="table" aria-label="custom pagination table">
//                 <TableHead className="tableHead">
//                   <TableRow>
//                     <TableCell className="tableHeadCell">Quantity</TableCell>
//                     <TableCell className="tableHeadCell">Item Code</TableCell>
//                     <TableCell className="tableHeadCell">
//                       Item Description
//                     </TableCell>
//                     <TableCell className="tableHeadCell">UOM</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody sx={{ maxHeight: "520px" }}>
//                   {defaultFreebieValues?.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell
//                         component="th"
//                         scope="row"
//                         className="tableBodyCell"
//                       >
//                         {row?.quantity}
//                       </TableCell>
//                       <TableCell className="tableBodyCell">
//                         {row?.items?.itemCode}
//                       </TableCell>
//                       <TableCell className="tableBodyCell">
//                         {row?.items?.itemDescription}
//                       </TableCell>
//                       <TableCell className="tableBodyCell">
//                         {row?.items?.uom}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Box>

//         <Divider
//           sx={{
//             height: "1.5px",
//             color: theme.palette.secondary.main,
//             bgcolor: theme.palette.secondary.main,
//           }}
//         />
//         <ButtonGroup sx={{ gap: 1, m: 1, justifyContent: "end" }}>
//           <Button
//             className="cancelButtons"
//             onClick={() => {
//               dispatch(toggleDrawer("isFreebieViewing"));
//             }}
//             tabIndex={0}
//           >
//             Close
//           </Button>
//         </ButtonGroup>
//       </Stack>
//     </Drawer>
//   );
// };
