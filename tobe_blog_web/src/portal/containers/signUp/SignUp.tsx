import { Button, Link, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import config from '../../../../customization.json';
import { HalfRow, OneRow } from '../../../components';
import { URL } from '../../../routes';
import * as UserService from '../../../services/UserService.ts';
import SingleBoxLayout from '../../components/layout/SingleBoxLayout.tsx';

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
    let passwordLength = data.get('password')?.toString().length ?? 0;
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
    <SingleBoxLayout
      title={t('sign-up.title') + ' ' + config.projectName}
      handleSubmit={handleSubmit}
      openLoading={openLoading}
    >
      <HalfRow>
        <TextField
          autoComplete="given-name"
          name="firstName"
          fullWidth
          id="firstName"
          label={t('sign-up.fields.first-name')}
        />
      </HalfRow>
      <HalfRow>
        <TextField
          fullWidth
          id="lastName"
          label={t('sign-up.fields.last-name')}
          name="lastName"
          autoComplete="family-name"
        />
      </HalfRow>
      <OneRow>
        <TextField
          required
          fullWidth
          id="email"
          label={t('sign-up.fields.email')}
          name="email"
          autoComplete="email"
        />
      </OneRow>
      <OneRow>
        <TextField
          required
          fullWidth
          name="password"
          label={t('sign-up.fields.password')}
          type="password"
          id="password"
          autoComplete="new-password"
        />
      </OneRow>
      <OneRow>
        <TextField
          required
          fullWidth
          name="password-confirm"
          label={t('sign-up.fields.password-confirm')}
          type="password"
          id="password-confirm"
          autoComplete="new-password"
        />
      </OneRow>
      <OneRow>
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          {t('sign-up.sign-up-btn')}
        </Button>
      </OneRow>
      <OneRow>
        <Link
          href={URL.SIGN_IN}
          variant="body2"
        >
          {t('sign-up.sign-in-btn')}
        </Link>
      </OneRow>
    </SingleBoxLayout>
  );
}
