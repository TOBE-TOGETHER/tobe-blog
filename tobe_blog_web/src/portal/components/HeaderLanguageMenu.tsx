import TranslateIcon from '@mui/icons-material/Translate';
import { Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { changeLanguage } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE } from '../../i18n';
import theme from '../../theme';

export default function HeaderLanguageMenu() {
  const availableLangs: Array<{ label: string; value: string }> = [
    { label: 'app-header.language.options.zh', value: LANGUAGE.ZH },
    { label: 'app-header.language.options.en', value: LANGUAGE.EN },
  ];

  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLangMenu = (_: React.MouseEvent<HTMLElement>, value: string): void => {
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
      <IconButton
        size="large"
        key={'language-switch'}
        aria-controls="menu-header"
        aria-haspopup="true"
        onClick={handleOpenLangMenu}
        title={t('app-header.language.btn-label')}
        sx={{ color: theme.palette.secondary.main }}
      >
        <TranslateIcon />
      </IconButton>
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
        {availableLangs.map(language => (
          <MenuItem
            key={language.label}
            onClick={e => handleCloseLangMenu(e, language.value)}
          >
            <Typography textAlign="center">{t(language.label)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
}
