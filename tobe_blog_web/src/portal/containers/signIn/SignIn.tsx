import { Box, Button, Container, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Loading from '../../../components/loading/Loading.tsx';
import { loginUser, useAuthDispatch } from '../../../contexts';
import { URL } from '../../../routes';

export default function SignIn() {
  const dispatch = useAuthDispatch();
  const [openLoading, updateOpenLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateOpenLoading(true);

    loginUser(dispatch, {
      username: data.get('email'),
      password: data.get('password'),
    })
      .then(() => {
        enqueueSnackbar(t('sign-in.msg.success'), {
          variant: 'success',
        });
        navigate(URL.HOME);
      })
      .catch(() => {
        enqueueSnackbar(t('sign-in.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        updateOpenLoading(false);
      });
  };

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
          {t('sign-in.title')}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('sign-in.description.email')}
            name="email"
            autoComplete="email"
            autoFocus
            variant="standard"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('sign-in.description.password')}
            type="password"
            id="password"
            autoComplete="current-password"
            variant="standard"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('sign-in.sign-in-btn')}
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href="#"
                variant="body2"
              >
                {t('sign-in.forget-pw-btn')}
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href={URL.SIGN_UP} variant="body2">
                {t("sign-in.sign-up-btn")}
              </Link>
            </Grid> */}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
