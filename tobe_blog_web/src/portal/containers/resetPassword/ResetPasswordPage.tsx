import { Box } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCommonUtils } from '../../../commons/index.ts';
import { OneRow } from '../../../components';
import { URL } from '../../../routes';
import * as publicDataService from '../../../services/PublicDataService';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthTextField from '../../components/auth/AuthTextField';
import AuthSubmitButton from '../../components/auth/AuthSubmitButton';

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [isValidLink, setIsValidLink] = useState(true);
  const { t } = useCommonUtils();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    const tokenParam = queryParams.get('token');

    if (!emailParam || !tokenParam) {
      setIsValidLink(false);
      enqueueSnackbar(t('reset-password.msg.token-expired'), {
        variant: 'error',
      });
      return;
    }

    setEmail(emailParam);
    setToken(tokenParam);
  }, [location, t]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      enqueueSnackbar(t('reset-password.msg.passwords-not-match'), {
        variant: 'error',
      });
      return;
    }

    if (newPassword.length < 6) {
      enqueueSnackbar(t('reset-password.msg.invalid-password-length'), {
        variant: 'error',
      });
      return;
    }

    setLoading(true);
    
    publicDataService.resetPassword(email, token, newPassword)
      .then((response) => {
        if (response.data) {
          enqueueSnackbar(t('reset-password.msg.success'), {
            variant: 'success',
          });
          // Redirect to login page after successful password reset
          setTimeout(() => {
            navigate(URL.SIGN_IN);
          }, 1500);
        } else {
          enqueueSnackbar(t('reset-password.msg.token-expired'), {
            variant: 'error',
          });
        }
      })
      .catch(() => {
        enqueueSnackbar(t('reset-password.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthLayout
      title={t('reset-password.title')}
      subtitle={t('reset-password.subtitle')}
      loading={loading}
    >
      {isValidLink ? (
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <OneRow sx={{ mb: 3 }}>
            <AuthTextField
              required
              name="newPassword"
              label={t('reset-password.new-password')}
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </OneRow>
          <OneRow sx={{ mb: 4 }}>
            <AuthTextField
              required
              name="confirmPassword"
              label={t('reset-password.confirm-password')}
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {t('reset-password.submit-btn')}
            </AuthSubmitButton>
          </OneRow>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <AuthSubmitButton
            onClick={() => navigate(URL.SIGN_IN)}
            sx={{
              py: 1.8,
              fontSize: '1.1rem',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            {t('reset-password.back-to-login')}
          </AuthSubmitButton>
        </Box>
      )}
    </AuthLayout>
  );
} 