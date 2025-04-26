import { Box, Grid, Link } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useCommonUtils } from '../../../commons/index.ts';
import { URL } from '../../../routes';
import * as UserService from '../../../services/UserService.ts';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthTextField from '../../components/auth/AuthTextField';
import AuthSubmitButton from '../../components/auth/AuthSubmitButton';

export default function SignUp() {
  const { t, navigate } = useCommonUtils();
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!validateForm(data)) {
      return;
    }

    setLoading(true);

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
        setLoading(false);
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
    <AuthLayout 
      title={t('sign-up.title')} 
      loading={loading}
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <AuthTextField
              autoComplete="given-name"
              name="firstName"
              id="firstName"
              label={t('sign-up.fields.first-name')}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <AuthTextField
              id="lastName"
              label={t('sign-up.fields.last-name')}
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <AuthTextField
              required
              id="email"
              label={t('sign-up.fields.email')}
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <AuthTextField
              required
              name="password"
              label={t('sign-up.fields.password')}
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <AuthTextField
              required
              name="password-confirm"
              label={t('sign-up.fields.password-confirm')}
              type="password"
              id="password-confirm"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, mb: 3 }}>
          <AuthSubmitButton
            type="submit"
            loading={loading}
            sx={{
              py: 1.8,
              fontSize: '1.1rem',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            {t('sign-up.sign-up-btn')}
          </AuthSubmitButton>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link 
              href={URL.SIGN_IN} 
              variant="body2"
              sx={{
                'color': 'text.secondary',
                'fontSize': '0.95rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {t('sign-up.sign-in-btn')}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}
