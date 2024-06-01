import React from "react";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import theme from "../../theme";
import { URL, validateUrl } from "../../routes";
import { useAuthState } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pages } from "./configs";
import { authed, enabled } from "../../commons";

export default function HeaderUserMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (
    event: React.MouseEvent<HTMLElement>,
    url: string | null
  ): void => {
    let target = url || "";
    if (validateUrl(target)) {
      navigate(target, { replace: false });
    }
    setAnchorElUser(null);
  };

  const authContext = useAuthState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authedPages = pages.filter(
    (pageItem) =>
      authed(pageItem.requiredRoles) && enabled(pageItem.requiredFeature)
  );

  return (
    <>
      {authContext.user ? (
        <Tooltip title={t("app-header.settings.btn-tooltip")}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
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
            color: theme.palette.secondary.main,
            fontSize: 18,
            borderRadius: 0,
            borderBottom: "3px solid transparent",
            fontFamily: "PingFang SC,Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 700,
            "&:hover": {
              borderBottom: "3px solid " + theme.palette.secondary.main,
            },
          }}
        >
          {t("app-header.sign-in-btn")}
        </Button>
      )}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {authedPages.map((page) => (
          <MenuItem
            key={page.label}
            onClick={(e) => handleCloseUserMenu(e, page.url)}
          >
            <Typography textAlign="center">{t(page.label)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
