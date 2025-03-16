import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  css,
} from "@mui/material/styles";
import { Global } from "@emotion/react";
import "./App.css";

import { MusicProvider } from "./context/MusicContext";
import Router from "./Route";

const theme = createTheme({
  typography: {
    fontFamily: `'Commissioner', sans-serif !important`,
  },
});

const globalStyles = css`
  body {
    margin: 0;
    font-family: 'Commissioner', sans-serif !important; 
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Global styles={globalStyles} />
        <MusicProvider>
          <div className="App">
            <Router />
          </div>
        </MusicProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
