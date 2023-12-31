import React from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { toggleDrawer } from "../../services/store/disclosureSlice";
import { OpenCustomerRegistration } from "../../components/Lottie-Components";

const CustomerRegistration = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/customer-registration";
  return (
    <>
      {isHomePage ? (
        <Box
          onClick={() => dispatch(toggleDrawer("isSidebar"))}
          sx={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <OpenCustomerRegistration
            text={"Customer Registration"}
          />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default CustomerRegistration;




// import { useState } from "react";
// import {
//   Badge,
//   Divider,
//   Paper,
//   Stack,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
// import { RequestProspect } from "./Request-Prospect";
// import { ProspectStatus } from "./Prospect-Status";
// import { Released } from "./released/Released";
// import { FreebieStatus } from "./freebies/Freebie-Status";
// import { RequestFreebies } from "./freebies/Request-Freebies";
// import {
//   useGetApprovedFreebiesQuery,
//   useGetApprovedProspectQuery,
//   useGetRejectedFreebiesQuery,
//   useGetRejectedProspectQuery,
//   useGetRequestedFreebieQuery,
//   useGetRequestedProspectQuery,
// } from "../../../services/api";

// export const Prospect = () => {
//   const theme = useTheme();
//   const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
//     useDefaultStyles();
//   const [viewing, setViewing] = useState(0);

//   const { data: requested } = useGetRequestedProspectQuery({ IsActive: true });
//   const { data: approved } = useGetApprovedProspectQuery({ status: true });
//   const { data: rejected } = useGetRejectedProspectQuery({ status: true });
//   const { data: requestedFreebies } = useGetRequestedFreebieQuery({
//     Status: true,
//   });
//   const { data: approvedFreebies } = useGetApprovedFreebiesQuery({
//     Status: true,
//   });
//   const { data: rejectedFreebies } = useGetRejectedFreebiesQuery({
//     Status: true,
//   });

//   const totalRequest = requested?.data?.totalCount || 0;
//   const totalApproved = approved?.data?.totalCount || 0;
//   const totalRejected = rejected?.data?.totalCount || 0;

//   const totalRequestedFreebies = requestedFreebies?.data?.totalCount || 0;
//   const totalApprovedFreebies = approvedFreebies?.data?.totalCount || 0;
//   const totalRejectedFreebies = rejectedFreebies?.data?.totalCount || 0;

//   const prospectNavbar = [
//     {
//       case: 1,
//       name: "Request Prospect",
//       badge: totalRequest || 0,
//     },
//     {
//       case: 2,
//       name: "Prospect Status",
//       badge: totalApproved || totalRejected || 0,
//     },
//     {
//       case: 3,
//       name: "Requested Freebies",
//       badge: totalRequestedFreebies || 0,
//     },
//     {
//       case: 4,
//       name: "Freebie Status",
//       badge: totalApprovedFreebies || totalRejectedFreebies || 0,
//     },
//     {
//       case: 5,
//       name: "Released",
//     },
//   ];

//   const components = {
//     1: <RequestProspect />,
//     2: <ProspectStatus />,
//     3: <RequestFreebies />,
//     4: <FreebieStatus />,
//     5: <Released />,
//   };

//   return (
//     <>
//       <Paper
//         elevation={1}
//         sx={{
//           ...defaultPaperHeaderStyle,
//           // justifyContent: "start",
//           //to remove ^ when freebie is coded
//         }}
//       >
//         {prospectNavbar?.map((item, i) => (
//           <Stack
//             sx={{ cursor: "pointer", alignItems: "center", width: "160px" }}
//             key={i}
//             onClick={() => setViewing(Number(item.case))}
//           >
//             <Badge
//               badgeContent={item.badge}
//               color="primary"
//               invisible={item.case === viewing}
//             >
//               <Typography
//                 sx={{
//                   fontSize: "14.5px",
//                   fontWeight: "bold",
//                   color: theme.palette.secondary.main,
//                   textAlign: "center",
//                 }}
//               >
//                 {item.name}
//               </Typography>
//             </Badge>
//             {item.case === viewing && (
//               <Divider
//                 sx={{
//                   background: theme.palette.secondary.main,
//                   width: "160px",
//                   height: "1.5px",
//                   transition: "width 0.8s ease-in-out",
//                 }}
//               />
//             )}
//           </Stack>
//         ))}
//       </Paper>
//       <Paper
//         elevation={20}
//         sx={{ ...defaultPaperContentStyle, maxHeight: "85%" }}
//       >
//         {components[viewing] || ""}
//       </Paper>
//     </>
//   );
// };
