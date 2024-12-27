import { Button, Grid, Link, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import config from '../../../../customization.json';
import { OneRow } from '../../../components';
import { loginUser, useAuthDispatch } from '../../../contexts';
import { URL } from '../../../routes';
import SingleBoxLayout from '../../components/layout/SingleBoxLayout.tsx';

export default function SignIn() {
  const dispatch = useAuthDispatch();
  const [openLoading, setOpenLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpenLoading(true);

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
        setOpenLoading(false);
      });
  };

  return (
    <SingleBoxLayout
      title={t('sign-in.title') + ' ' + config.title}
      handleSubmit={handleSubmit}
      openLoading={openLoading}
    >
      <OneRow>
        <TextField
          required
          fullWidth
          id="email"
          label={t('sign-in.description.email')}
          name="email"
          autoComplete="email"
          autoFocus
        />
      </OneRow>
      <OneRow>
        <TextField
          required
          fullWidth
          name="password"
          label={t('sign-in.description.password')}
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </OneRow>
      <OneRow>
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          {t('sign-in.sign-in-btn')}
        </Button>
      </OneRow>
      <OneRow>
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
          <Grid item>
            <Link
              href={URL.SIGN_UP}
              variant="body2"
            >
              {t('sign-in.sign-up-btn')}
            </Link>
          </Grid>
        </Grid>
      </OneRow>
    </SingleBoxLayout>
  );
}
