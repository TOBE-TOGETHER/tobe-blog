import { Box, Button, Container, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Loading from '../../../components/loading/Loading.tsx';
import { URL } from '../../../routes';
import { UserService } from '../../../services';

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!validateForm(data)) {
      return;
    }

    setOpenLoading(true);

    UserService.createUser({
      firstName: data.get('firstName')?.toString(),
      lastName: data.get('lastName')?.toString(),
      email: data.get('email')?.toString(),
      password: data.get('password')?.toString(),
    })
      .then(() => {
        enqueueSnackbar(t('sign-up.msg.success'), {
          variant: 'success',
        });
        navigate(URL.SIGN_IN);
      })
      .catch(() => {
        enqueueSnackbar(t('sign-up.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setOpenLoading(false);
      });
  };

  function validateForm(data: FormData): boolean {
    // validate email template
    const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!emailReg.test(data.get('email')?.toString() || '')) {
      warn('sign-up.msg.warning.invalid-email-format');
      return false;
    }
    // validate the two password
    if (data.get('password')?.toString() !== data.get('password-confirm')?.toString()) {
      warn('sign-up.msg.warning.two-password-dismatch');
      return false;
    }
    // validate password length
    const passwordLength = data.get('password')?.toString().length || 0;
    if (passwordLength < 6 || passwordLength > 64) {
      warn('sign-up.msg.warning.invalid-password-length');
      return false;
    }
    return true;
  }

  function warn(warningMsg: string): void {
    enqueueSnackbar(t(warningMsg), {
      variant: 'warning',
    });
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mb: 4, mt: '15vh' }}
    >
      <Loading open={openLoading} />
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
        >
          {t('sign-up.title')}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={6}
            >
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label={t('sign-up.fields.first-name')}
                variant="standard"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                fullWidth
                id="lastName"
                label={t('sign-up.fields.last-name')}
                name="lastName"
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                id="email"
                label={t('sign-up.fields.email')}
                name="email"
                autoComplete="email"
                variant="standard"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                name="password"
                label={t('sign-up.fields.password')}
                type="password"
                id="password"
                autoComplete="new-password"
                variant="standard"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                name="password-confirm"
                label={t('sign-up.fields.password-confirm')}
                type="password"
                id="password-confirm"
                autoComplete="new-password"
                variant="standard"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('sign-up.sign-up-btn')}
          </Button>
          <Grid
            container
            justifyContent="flex-end"
          >
            <Grid item>
              <Link
                href={URL.SIGN_IN}
                variant="body2"
              >
                {t('sign-up.sign-in-btn')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
