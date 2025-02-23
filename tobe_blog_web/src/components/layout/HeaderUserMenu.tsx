import { Avatar, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { authed, enabled, useCommonUtils } from '../../commons';
import { useAuthState } from '../../contexts';
import { pages } from '../../portal/components/layout/configs';
import { URL, validateUrl } from '../../routes';
import theme from '../../theme';

export default function HeaderUserMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (_event: React.MouseEvent<HTMLElement>, url: string | null): void => {
    let target = url ?? '';
    if (validateUrl(target)) {
      navigate(target, { replace: false });
    }
    setAnchorElUser(null);
  };

  const authContext = useAuthState();
  const { t, navigate } = useCommonUtils();

  const authedPages = pages.filter(pageItem => authed(pageItem.requiredRoles) && enabled(pageItem.requiredFeature));

  return (
    <>
      {authContext.user ? (
        <Tooltip title={t('app-header.settings.btn-tooltip')}>
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0.5 }}
          >
            <Avatar
              alt={authContext.user.firstName}
              src={authContext.user.avatarUrl}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          key={URL.SIGN_IN}
          onClick={() => navigate(URL.SIGN_IN)}
          size="small"
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
          {t('app-header.sign-in-btn')}
        </Button>
      )}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {authedPages.map(page => (
          <MenuItem
            key={page.label}
            onClick={e => handleCloseUserMenu(e, page.url)}
          >
            <Typography textAlign="center">{t(page.label)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
