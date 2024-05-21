import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppFooter } from './components/footer';
import { BasicLayout } from './components/layout';
// import './i18n';
// import './index.css';
import reportWebVitals from './reportWebVitals';
// import {AuthProvider} from "./contexts";
import { MainRouter } from './routes';
// import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
// import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <BasicLayout>
          <MainRouter />
          <AppFooter />
        </BasicLayout>
      
      </SnackbarProvider>
      {/*</LocalizationProvider>*/}
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
