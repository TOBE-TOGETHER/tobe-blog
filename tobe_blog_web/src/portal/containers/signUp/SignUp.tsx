import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Container, Grid, IconButton, Link, Paper, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import config from '../../../../customization.json';
import { useCommonUtils } from '../../../commons/index.ts';
import { Loading } from '../../../components';
import { HeaderLanguageMenu } from '../../../components/layout';
import { URL } from '../../../routes';
import * as UserService from '../../../services/UserService.ts';
import FloatingElementContainer from '../../components/FloatingElementContainer.tsx';
import { HeroSection, LogoText, PageContainer } from '../../components/StyledComponents.tsx';

export default function SignUp() {
  const { t, navigate } = useCommonUtils();
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
    <PageContainer container>
      <FloatingElementContainer />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          pb: '2vh',
          pt: { xs: '6vh', sm: '8vh' },
          minHeight: '300px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Loading open={openLoading} />
        <HeroSection>
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              my: { xs: 3, md: 3 },
              p: { xs: 5, md: 6 },
              borderRadius: 4,
              zIndex: 2,
              boxShadow: 'rgba(145, 158, 171, 0.28) 0px 0px 2px 0px, rgba(145, 158, 171, 0.16) 0px 12px 24px -4px',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <Grid
              container
              justifyContent="flex-end"
              mb={3}
              spacing={1}
            >
              <Grid item>
                <IconButton
                  href="/"
                  size="large"
                >
                  <HomeIcon color="primary" />
                </IconButton>
              </Grid>
              {config.githubLink && (
                <Grid item>
                  <IconButton
                    href={config.githubLink}
                    size="large"
                  >
                    <GitHubIcon color="primary" />
                  </IconButton>
                </Grid>
              )}
              <Grid item>
                <Box sx={{ flexGrow: 0 }}>
                  <HeaderLanguageMenu />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <LogoText variant="h1">Tobe Blog</LogoText>
              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  mt: 1,
                }}
              >
                {t('sign-up.title')}
              </Typography>
            </Box>

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
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label={t('sign-up.fields.first-name')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '14px 16px',
                      },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <TextField
                    fullWidth
                    id="lastName"
                    label={t('sign-up.fields.last-name')}
                    name="lastName"
                    autoComplete="family-name"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '14px 16px',
                      },
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '14px 16px',
                      },
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '14px 16px',
                      },
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '14px 16px',
                      },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      'borderRadius': '12px',
                      'py': 1.8,
                      'fontWeight': 600,
                      'fontSize': '1.1rem',
                      'boxShadow': '0 8px 16px rgba(0, 0, 0, 0.1)',
                      'mt': 1,
                      'mb': 2,
                      '&:hover': {
                        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    {t('sign-up.sign-up-btn')}
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ textAlign: 'center' }}
                >
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
          </Paper>
        </HeroSection>
      </Container>
    </PageContainer>
  );
}
