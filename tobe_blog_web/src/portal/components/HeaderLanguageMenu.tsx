import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { changeLanguage } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE } from '../../i18n';

export default function HeaderLanguageMenu(props: { color: string }) {
  const availableLangs: Array<{ label: string; value: string }> = [
    { label: 'app-header.language.options.zh', value: LANGUAGE.ZH },
    { label: 'app-header.language.options.en', value: LANGUAGE.EN },
  ];
  
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null,
  );
  
  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLangMenu = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ): void => {
    if (validateLanguage(value)) {
      changeLanguage(value);
    }
    setAnchorElLang(null);
  };
  
  function validateLanguage(target: string): boolean {
    if (Object.values(LANGUAGE).indexOf(target) > -1) {
      return true;
    }
    return false;
  }
  
  const { t } = useTranslation();
  return (
    <Grid container>
      <Button
        size="small"
        key={'language-switch'}
        aria-label={t('app-header.language.btn-tooltip')}
        aria-controls="menu-header"
        aria-haspopup="true"
        onClick={handleOpenLangMenu}
        sx={{
          color: props.color,
          fontSize: 18,
          borderRadius: 0,
          borderBottom: '3px solid transparent',
          fontFamily: 'PingFang SC,Roboto, Helvetica, Arial, sans-serif',
          fontWeight: 700,
          '&:hover': {
            borderBottom: '3px solid ' + props.color,
          },
        }}
      >
        {t('app-header.language.btn-label')}
      </Button>
      <Menu
        id="menu-header"
        anchorEl={anchorElLang}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElLang)}
        onClose={handleCloseLangMenu}
      >
        {availableLangs.map((language) => (
          <MenuItem
            key={language.label}
            onClick={(e) => handleCloseLangMenu(e, language.value)}
          >
            <Typography textAlign="center">{t(language.label)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
}
