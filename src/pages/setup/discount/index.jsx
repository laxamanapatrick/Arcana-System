import React from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom'
import { toggleDrawer } from '../../../services/store/disclosureSlice';
import { Box } from '@mui/material';
import { OpenDiscount } from '../../../components/Lottie-Components';

const Discount = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/discount";
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
          <OpenDiscount text={'Open Discount Modules'} />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Discount