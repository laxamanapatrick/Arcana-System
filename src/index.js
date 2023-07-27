import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./main/App";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { store } from "./services/store/store-config";
import { Provider } from "react-redux";

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setCurrentTheme((
      // prevTheme
      ) =>
      // prevTheme === lightTheme ? 
      darkTheme 
      // : 
      // lightTheme
    );
  };

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={currentTheme}>
          <BrowserRouter>
            <App toggleTheme={toggleTheme} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
