import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, SxProps, Toolbar, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import config from '../../../../customization.json';
import { useCommonUtils } from '../../../commons/index.ts';
import StrokeText from '../../../components/common/StrokeText.tsx';
import HeaderLanguageMenu from '../../../components/layout/HeaderLanguageMenu.tsx';
import HeaderUserMenu from '../../../components/layout/HeaderUserMenu.tsx';
import { NotificationButton } from '../../../components/layout';
import { validateUrl } from '../../../routes';
import theme from '../../../theme.ts';
import { publicPages } from './configs.ts';

const PortalHeader = (props: { styles?: SxProps }) => {
  const [showFixedHeader, setShowFixedHeader] = useState<boolean>(false);
  const scrollTopRef = useRef<number>(0);
  const shouldShowHeaderRef = useRef<boolean>(false);
  const showFixedHeaderRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    const currentTop = document.documentElement.scrollTop;
    const previousTop = scrollTopRef.current;
    const isScrollingDown = currentTop - previousTop > 0;
    const isAtTop = currentTop <= 0;

    if (currentTop > 80) {
      shouldShowHeaderRef.current = true;
    }

    if (isAtTop) {
      shouldShowHeaderRef.current = false;
    }

    const nextShowFixedHeader = !isScrollingDown && !isAtTop && shouldShowHeaderRef.current;
    if (nextShowFixedHeader !== showFixedHeaderRef.current) {
      showFixedHeaderRef.current = nextShowFixedHeader;
      setShowFixedHeader(nextShowFixedHeader);
    }

    scrollTopRef.current = currentTop;
  }, []);

  const handleScrollWithRaf = useCallback(() => {
    if (rafIdRef.current !== null) {
      return;
    }

    rafIdRef.current = window.requestAnimationFrame(() => {
      handleScroll();
      rafIdRef.current = null;
    });
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollWithRaf, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollWithRaf);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [handleScrollWithRaf]);

  return (
    <>
      <AppBar
        sx={{
          boxShadow: 'none',
          color: theme.palette.primary.main,
          backgroundColor: 'white',
          borderBottom: 'none',
          position: 'absolute',
          ...props.styles,
        }}
      >
        <HeaderContent />
      </AppBar>
      <AppBar
        sx={{
          boxShadow: 'none',
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.background.paper,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          opacity: 0.85,
          position: 'fixed',
          display: showFixedHeader ? 'block' : 'none',
        }}
      >
        <HeaderContent />
      </AppBar>
    </>
  );
};

const HeaderContent = () => {
  const { t, navigate } = useCommonUtils();
  let location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (_event: React.MouseEvent<HTMLElement>, url: string | null): void => {
    let target = url ?? '';
    if (validateUrl(target)) {
      navigate(target, { replace: false });
    }
    setAnchorElNav(null);
  };

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Grid
          onClick={() => navigate('/')}
          sx={{
            width: '180px',
            height: '64px',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: 40,
            fontFamily: 'Times New Roman, fantasy, San Francisco, sans-serif',
          }}
        >
          <StrokeText text={config.title} />
        </Grid>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          {
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {publicPages.map(page => (
                <MenuItem
                  key={page.label}
                  onClick={event => handleCloseNavMenu(event, page.url)}
                >
                  <Typography textAlign="center">{t(page.label)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          }
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {publicPages.map(page => (
            <Button
              key={page.label}
              size="small"
              onClick={event => handleCloseNavMenu(event, page.url)}
              sx={{
                'color': theme.palette.primary.main,
                'borderBottom': location.pathname === page.url ? '3px solid ' + theme.palette.primary.main : '3px solid transparent',
                'fontSize': 18,
                'borderRadius': 0,
                'fontFamily': 'PingFang SC,Roboto, Helvetica, Arial, sans-serif',
                'fontWeight': 700,
                '&:hover': {
                  borderBottom: '3px solid ' + theme.palette.primary.main,
                },
              }}
            >
              {t(page.label)}
            </Button>
          ))}
        </Box>

        {config.githubLink && (
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="large"
              title="Github"
              sx={{ color: theme.palette.primary.main }}
              href={config.githubLink}
            >
              <GitHubIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Box>
        )}

        {/* Notification icon - only show when user is logged in */}
        <Box sx={{ flexGrow: 0 }}>
          <NotificationButton size="large" />
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <HeaderLanguageMenu />
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <HeaderUserMenu />
        </Box>
      </Toolbar>
    </Container>
  );
};

export default PortalHeader;
