import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import plan from '../../../package.json';
import { validateUrl } from '../../routes';
import theme from '../../theme';
import HeaderLanguageMenu from './HeaderLanguageMenu';
import HeaderUserMenu from './HeaderUserMenu';
import { publicPages } from './configs';

const PortalHeader = () => {
  const [yIndex, setYIndex] = useState<number>(0);
  const [showFixedHeader, setShowFixedHeader] = useState<boolean>(false);
  const [shouldShowHeader, setShouldShowHeader] = useState<boolean>(false);

  function handleScroll() {
    // if scroll down more than 80, it should show header when scroll up
    if (document.documentElement.scrollTop > 80) {
      setShouldShowHeader(true);
    }
    // if scroll to the top, then reset the shouldShowHeader flag
    if (document.documentElement.scrollTop === 0) {
      setShouldShowHeader(false);
    }
    if (document.documentElement.scrollTop - yIndex > 0 || (document.documentElement.scrollTop - yIndex < 0 && document.documentElement.scrollTop <= 0)) {
      setShowFixedHeader(false);
    } else {
      if (shouldShowHeader) {
        setShowFixedHeader(true);
      }
    }
    setYIndex(document.documentElement.scrollTop);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      <AppBar
        sx={{
          boxShadow: 'none',
          color: theme.palette.primary.main,
          backgroundColor: 'white',
          borderBottom: 'none',
          position: 'absolute',
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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (_event: React.MouseEvent<HTMLElement>, url: string | null): void => {
    let target = url || '';
    if (validateUrl(target)) {
      navigate(target, { replace: false });
    }
    setAnchorElNav(null);
  };

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h5"
          noWrap
          component="a"
          onClick={() => navigate('/')}
          sx={{
            mr: 2,
            color: theme.palette.primary.main,
            display: { xs: 'none', md: 'flex' },
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          {plan.name.toUpperCase()}
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="small"
            sx={{ border: '1px solid rgba(0,0,0,0.12)', borderRadius: '4px' }}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="secondary"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
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
                'fontSize': 18,
                'borderRadius': 0,
                'borderBottom': '3px solid transparent',
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
        <Box sx={{ flexGrow: 0 }}>
          <HeaderLanguageMenu color={theme.palette.secondary.main} />
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <HeaderUserMenu />
        </Box>
      </Toolbar>
    </Container>
  );
};

export default PortalHeader;
