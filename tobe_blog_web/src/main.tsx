import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppFooter } from './components/footer';
import { BasicLayout } from './components/layout';
import { AuthProvider } from './contexts';
import { MainRouter } from './routes';
import theme from './theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}></ThemeProvider>
    <CssBaseline />
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <BasicLayout>
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
        <AppFooter />
      </BasicLayout>
    </SnackbarProvider>
  </React.StrictMode>
);
