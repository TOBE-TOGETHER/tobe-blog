import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';
import config from '../../../../customization.json';
import { Loading } from '../../../components';
import { HeaderLanguageMenu } from '../../../components/layout';
import FloatingElementContainer from '../../components/FloatingElementContainer.tsx';
import { HeroSection, LogoText, PageContainer } from '../../components/StyledComponents.tsx';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  loading: boolean;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, loading, children }: Readonly<AuthLayoutProps>) {

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
        <Loading open={loading} />
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
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mt: 1,
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>

            {children}
          </Paper>
        </HeroSection>
      </Container>
    </PageContainer>
  );
} 