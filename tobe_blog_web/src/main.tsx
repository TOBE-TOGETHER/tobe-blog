import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// import { MainRouter } from './routes';/

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    {/*<ThemeProvider theme={theme}>*/}
    {/*  <CssBaseline />*/}
    {/*  <SnackbarProvider*/}
    {/*    maxSnack={3}*/}
    {/*    anchorOrigin={{*/}
    {/*      vertical: 'bottom',*/}
    {/*      horizontal: 'right',*/}
    {/*    }}*/}
    {/*  >*/}
    {/*    <BasicLayout>*/}
    {/*      /!*<MainRouter />*!/*/}
    {/*      <AppFooter />*/}
    {/*    </BasicLayout>*/}
    {/*  </SnackbarProvider>*/}
    {/*</ThemeProvider>*/}
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
