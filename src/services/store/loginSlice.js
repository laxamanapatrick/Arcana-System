import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import { saltkey } from "../saltkey";

const storedFullname = sessionStorage.getItem("Full Name")

const initialState = {
  fullname: storedFullname || "",
  token: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setFullname: (state, action) => {
      state.fullname = action.payload;
      sessionStorage.setItem("Full Name", action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(action.payload),
        saltkey
      ).toString();
      sessionStorage.setItem("Token", ciphertext);
    },
  },
});

export const { setFullname, setToken } = loginSlice.actions;

export default loginSlice.reducer;

// export const decodeUser = () => {
//     let userDatadecrypted;
//     if (sessionStorage.getItem('userData')) {
//         const userData = sessionStorage.getItem('userData');
//         const deciphertext = CryptoJS.AES.decrypt(userData, saltkey)
//         userDatadecrypted = JSON.parse(deciphertext.toString(CryptoJS.enc.Utf8))
//     }

//     return userDatadecrypted
// }