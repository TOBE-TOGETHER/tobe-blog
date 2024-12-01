import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function NoContentNewsItem() {
  const { t } = useTranslation();
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      alignContent="center"
      sx={{ my: 1, minHeight: '100px' }}
    >
      <Typography
        color="text.secondary"
        variant="body2"
      >
        {t('home-page.no-content')}
      </Typography>
    </Grid>
  );
}
