import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { useCommonUtils } from '../../../../commons';
import { IBaseUserContentDTO } from '../../../../global/types';
import ContentStatItem from './ContentStatItem';

interface IContentStatsSectionProps {
  readonly content: IBaseUserContentDTO;
  readonly cardStyle?: object;
}

export default function ContentStatsSection({ content, cardStyle }: IContentStatsSectionProps) {
  const { t } = useCommonUtils();
  const theme = useTheme();

  const defaultCardStyle = { elevation: 0, border: `1px solid ${theme.palette.divider}`, mb: 3 };
  const finalCardStyle = cardStyle ?? defaultCardStyle;

  return (
    <Card sx={finalCardStyle}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          {t('content-stats.title')}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ContentStatItem
              icon={<VisibilityIcon sx={{ color: theme.palette.primary.main, fontSize: '2rem' }} />}
              label={t('content-stats.view-count')}
              value={content.viewCount}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={6}>
            <ContentStatItem
              icon={<FavoriteIcon sx={{ color: '#e91e63', fontSize: '2rem' }} />}
              label={t('content-stats.like-count')}
              value={content.likeCount}
              color="#e91e63"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
} 