import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  css,
} from "@mui/material/styles";
import { Global } from "@emotion/react";
import "./App.css";

import { ProductProvider } from "./context/ProductContext";
import { BrowserRouter, Routes } from "react-router";
import Router from "./Route";

const theme = createTheme({
  typography: {
    fontFamily: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  },
});

const globalStyles = css`
  body {
    margin: 0;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* Same as theme fontFamily */
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Global styles={globalStyles} />
        <ProductProvider>
          <div className="App">
            <Router />
          </div>
        </ProductProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
