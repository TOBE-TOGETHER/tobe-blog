import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Container, Grid, IconButton, Link, Paper, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import config from '../../../../customization.json';
import { useCommonUtils } from '../../../commons/index.ts';
import { Loading, OneRow } from '../../../components';
import { HeaderLanguageMenu } from '../../../components/layout';
import { loginUser, useAuthDispatch } from '../../../contexts';
import { URL } from '../../../routes';
import FloatingElementContainer from '../../components/FloatingElementContainer.tsx';
import { HeroSection, LogoText, PageContainer } from '../../components/StyledComponents.tsx';

export default function SignIn() {
  const dispatch = useAuthDispatch();
  const [openLoading, setOpenLoading] = useState(false);
  const { t, navigate } = useCommonUtils();

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
                {t('sign-in.title')}
              </Typography>
            </Box>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <OneRow sx={{ mb: 3 }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('sign-in.description.email')}
                  name="email"
                  autoComplete="email"
                  autoFocus
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
              </OneRow>
              <OneRow sx={{ mb: 4 }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t('sign-in.description.password')}
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
              </OneRow>
              <OneRow sx={{ mb: 3 }}>
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
                    '&:hover': {
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  {t('sign-in.sign-in-btn')}
                </Button>
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
                      href="#"
                      variant="body2"
                      sx={{
                        'color': 'text.secondary',
                        'fontSize': '0.95rem',
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
          </Paper>
        </HeroSection>
      </Container>
    </PageContainer>
  );
}
