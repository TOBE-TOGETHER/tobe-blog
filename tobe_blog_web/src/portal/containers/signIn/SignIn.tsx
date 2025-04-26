import { Box, Grid, Link, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useCommonUtils } from '../../../commons/index.ts';
import { OneRow } from '../../../components';
import { loginUser, useAuthDispatch } from '../../../contexts';
import { URL } from '../../../routes';
import * as publicDataService from '../../../services/PublicDataService';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthTextField from '../../components/auth/AuthTextField';
import AuthSubmitButton from '../../components/auth/AuthSubmitButton';

export default function SignIn() {
  const dispatch = useAuthDispatch();
  const [loading, setLoading] = useState(false);
  const { t, navigate } = useCommonUtils();
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);

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
        setLoading(false);
      });
  };

  const handleResetPasswordSubmit = () => {
    if (!resetEmail || !resetEmail.includes('@')) {
      enqueueSnackbar(t('sign-in.msg.invalid-email'), {
        variant: 'error',
      });
      return;
    }

    setLoading(true);
    publicDataService.requestPasswordReset(resetEmail)
      .then(() => {
        enqueueSnackbar(t('sign-in.msg.password-reset-sent'), {
          variant: 'success',
        });
        setResetPasswordOpen(false);
        setResetEmail('');
      })
      .catch(() => {
        enqueueSnackbar(t('sign-in.msg.password-reset-error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <AuthLayout 
        title={t('sign-in.title')}
        loading={loading}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <OneRow sx={{ mb: 3 }}>
            <AuthTextField
              required
              id="email"
              label={t('sign-in.description.email')}
              name="email"
              autoComplete="email"
              autoFocus
            />
          </OneRow>
          <OneRow sx={{ mb: 4 }}>
            <AuthTextField
              required
              name="password"
              label={t('sign-in.description.password')}
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </OneRow>
          <OneRow sx={{ mb: 3 }}>
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
              {t('sign-in.sign-in-btn')}
            </AuthSubmitButton>
          </OneRow>
          <OneRow sx={{ mt: 2 }}>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={6}
                sx={{ textAlign: 'left' }}
              >
                <Link
                  onClick={() => setResetPasswordOpen(true)}
                  variant="body2"
                  sx={{
                    'color': 'text.secondary',
                    'fontSize': '0.95rem',
                    'cursor': 'pointer',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {t('sign-in.forget-pw-btn')}
                </Link>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ textAlign: 'right' }}
              >
                <Link
                  href={URL.SIGN_UP}
                  variant="body2"
                  sx={{
                    'color': 'text.secondary',
                    'fontSize': '0.95rem',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {t('sign-in.sign-up-btn')}
                </Link>
              </Grid>
            </Grid>
          </OneRow>
        </Box>
      </AuthLayout>

      {/* Password Reset Dialog */}
      <Dialog open={resetPasswordOpen} onClose={() => setResetPasswordOpen(false)}>
        <DialogTitle>{t('sign-in.reset-password-title') || 'Reset Password'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('sign-in.reset-password-message') || 'Enter your email address and we will send you a link to reset your password.'}
          </DialogContentText>
          <AuthTextField
            autoFocus
            margin="dense"
            id="reset-email"
            label={t('sign-in.description.email') || 'Email Address'}
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Link
            onClick={() => setResetPasswordOpen(false)}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              cursor: 'pointer',
              mr: 2,
            }}
          >
            {t('sign-in.cancel-btn') || 'Cancel'}
          </Link>
          <AuthSubmitButton
            onClick={handleResetPasswordSubmit}
            loading={loading}
            sx={{
              borderRadius: '8px',
              width: 'auto',
            }}
          >
            {t('sign-in.send-reset-btn') || 'Send Reset Link'}
          </AuthSubmitButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
