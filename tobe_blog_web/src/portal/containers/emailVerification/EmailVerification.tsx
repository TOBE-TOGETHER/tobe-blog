import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCommonUtils } from '../../../commons/index.ts';
import { URL } from '../../../routes';
import * as EmailVerificationService from '../../../services/EmailVerificationService';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthSubmitButton from '../../components/auth/AuthSubmitButton';

interface VerificationResponse {
  success: boolean;
  message: string;
  alreadyVerified?: boolean;
}

export default function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useCommonUtils();
  const [loading, setLoading] = useState<boolean>(true);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'already-verified' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setVerificationStatus('error');
      setErrorMessage(t('email-verification.error.invalid-link'));
      setLoading(false);
      return;
    }

    verifyEmail(email, token);
  }, [location.search, t]);

  const verifyEmail = async (email: string, token: string) => {
    try {
      setLoading(true);
      const response = await EmailVerificationService.verifyEmail(email, token);
      const data: VerificationResponse = response.data;
      
      if (data.success) {
        if (data.alreadyVerified) {
          setVerificationStatus('already-verified');
        } else {
          setVerificationStatus('success');
          enqueueSnackbar(t('email-verification.msg.success'), {
            variant: 'success',
          });
        }
      } else {
        setVerificationStatus('error');
        setErrorMessage(data.message || t('email-verification.error.verification-failed'));
      }
    } catch (error: any) {
      setVerificationStatus('error');
      const errorData = error.response?.data;
      if (typeof errorData === 'object' && errorData.message) {
        setErrorMessage(errorData.message);
      } else if (typeof errorData === 'string') {
        setErrorMessage(errorData);
      } else {
        setErrorMessage(t('email-verification.error.verification-error'));
      }
      console.error('Email verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigate(URL.SIGN_IN);
  };

  const handleResendEmail = () => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    
    if (email) {
      EmailVerificationService.resendVerificationEmail(email)
        .then(() => {
          enqueueSnackbar(t('email-verification.msg.resend-success'), {
            variant: 'success',
          });
        })
        .catch((error: any) => {
          enqueueSnackbar(t('email-verification.msg.resend-error') + ': ' + (error.response?.data?.message || t('email-verification.error.unknown')), {
            variant: 'error',
          });
        });
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" py={4}>
          <CircularProgress 
            size={50} 
            sx={{ 
              mb: 3,
              color: 'primary.main' 
            }} 
          />
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: 500 
            }}
          >
            {t('email-verification.loading')}
          </Typography>
        </Box>
      );
    }

    if (verificationStatus === 'success') {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" py={2}>
          <Alert 
            severity="success"
            icon={false}
            sx={{ 
              mb: 4, 
              width: '100%',
              borderRadius: 2,
              '& .MuiAlert-message': {
                width: '100%'
              }
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {t('email-verification.success.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('email-verification.success.description')}
            </Typography>
          </Alert>
          
          <AuthSubmitButton
            onClick={handleGoToLogin}
            sx={{
              py: 1.8,
              fontSize: '1.1rem',
              minWidth: '200px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            {t('email-verification.btn.go-to-login')}
          </AuthSubmitButton>
        </Box>
      );
    }

    if (verificationStatus === 'already-verified') {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" py={2}>
          <Alert 
            severity="info"
            icon={false}
            sx={{ 
              mb: 4, 
              width: '100%',
              borderRadius: 2,
              '& .MuiAlert-message': {
                width: '100%'
              }
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {t('email-verification.already-verified.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('email-verification.already-verified.description')}
            </Typography>
          </Alert>
          
          <AuthSubmitButton
            onClick={handleGoToLogin}
            sx={{
              py: 1.8,
              fontSize: '1.1rem',
              minWidth: '200px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            {t('email-verification.btn.go-to-login')}
          </AuthSubmitButton>
        </Box>
      );
    }

    if (verificationStatus === 'error') {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" py={2}>
          <Alert 
            severity="error"
            icon={false}
            sx={{ 
              mb: 4, 
              width: '100%',
              borderRadius: 2,
              '& .MuiAlert-message': {
                width: '100%'
              }
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {t('email-verification.error.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {errorMessage}
            </Typography>
          </Alert>
          
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            <Button
              variant="outlined"
              onClick={handleResendEmail}
              sx={{ 
                px: 3, 
                py: 1.2,
                textTransform: 'none',
                fontSize: '1rem',
                borderRadius: 2
              }}
            >
              {t('email-verification.btn.resend')}
            </Button>
            
            <AuthSubmitButton
              onClick={handleGoToLogin}
              sx={{ 
                px: 3, 
                py: 1.2,
                fontSize: '1rem',
                minWidth: '140px'
              }}
            >
              {t('email-verification.btn.back-to-login')}
            </AuthSubmitButton>
          </Box>
        </Box>
      );
    }

    return null;
  };

  return (
    <AuthLayout 
      title={t('email-verification.title')} 
      subtitle={t('email-verification.subtitle')}
      loading={loading}
    >
      {renderContent()}
    </AuthLayout>
  );
} 