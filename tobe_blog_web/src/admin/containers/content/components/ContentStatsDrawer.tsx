import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchIcon from '@mui/icons-material/Launch';
import RecommendIcon from '@mui/icons-material/Recommend';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningIcon from '@mui/icons-material/Warning';
import { 
  Box, 
  Chip, 
  Divider, 
  Grid, 
  IconButton, 
  Link, 
  Tooltip, 
  Typography,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { TimeFormat, useCommonUtils } from '../../../../commons';
import { BaseDrawer } from '../../../components';
import { IBaseUserContentDTO } from '../../../../global/types';

interface IContentStatsDrawerProps {
  content: IBaseUserContentDTO | null;
  open: boolean;
  onClose: () => void;
}

export default function ContentStatsDrawer(props: Readonly<IContentStatsDrawerProps>) {
  const { t } = useCommonUtils();
  const theme = useTheme();

  if (!props.content) {
    return null;
  }

  const content = props.content;
  const shouldShowPortalLink = content.publicToAll && !content.banned;

  // Common card style
  const cardStyle = { elevation: 0, border: `1px solid ${theme.palette.divider}`, mb: 3 };

  // Render stat item
  const renderStatItem = (icon: React.ReactElement, label: string, value: number, color: string) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {icon}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color }}>
          {value?.toLocaleString() || 0}
        </Typography>
      </Box>
    </Box>
  );

  // Render date item
  const renderDateItem = (label: string, date: string | undefined) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.75rem', mb: 0.25 }}>
        {label}
      </Typography>
      <Typography variant="body2">
        {TimeFormat.dateAndTimeFormat(date)}
      </Typography>
    </Box>
  );

  return (
    <BaseDrawer
      open={props.open}
      onClose={props.onClose}
      title={t('content-stats.title')}
      width={{ xs: '100%', sm: 400 }}
    >
      {/* Statistics */}
      <Card sx={cardStyle}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {renderStatItem(
                <VisibilityIcon sx={{ color: theme.palette.primary.main, fontSize: '2rem' }} />,
                t('content-stats.view-count'),
                content.viewCount,
                theme.palette.primary.main
              )}
            </Grid>
            <Grid item xs={6}>
              {renderStatItem(
                <FavoriteIcon sx={{ color: '#e91e63', fontSize: '2rem' }} />,
                t('content-stats.like-count'),
                content.likeCount,
                '#e91e63'
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Status */}
      <Card sx={cardStyle}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {t('content-stats.status')}
            </Typography>
            {shouldShowPortalLink && (
              <Tooltip title={t('content-stats.view-on-portal')}>
                <IconButton
                  component={Link}
                  href={`/content/${content.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ 
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                    }
                  }}
                >
                  <LaunchIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {!content.publicToAll && (
              <Chip
                label={t('content-stats.draft')}
                variant="outlined"
                size="small"
                sx={{ 
                  color: theme.palette.warning.main,
                  borderColor: theme.palette.warning.main
                }}
              />
            )}
            {content.recommended && (
              <Chip
                icon={<RecommendIcon />}
                label={t('content-stats.recommended')}
                size="small"
                sx={{ 
                  backgroundColor: '#FFD700', 
                  color: '#000',
                  fontWeight: 'bold'
                }}
              />
            )}
            {content.banned && (
              <Chip
                icon={<WarningIcon />}
                label={t('content-stats.banned')}
                color="error"
                size="small"
                sx={{ fontWeight: 'bold' }}
              />
            )}
            {content.publicToAll && !content.recommended && !content.banned && (
              <Chip
                label={t('content-stats.normal')}
                variant="outlined"
                size="small"
                sx={{ color: theme.palette.text.secondary }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />

      {/* Dates */}
      <Card sx={{ ...cardStyle, mb: 0 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            {t('content-stats.dates')}
          </Typography>
          
          {renderDateItem(t('content-stats.created-date'), content.createTime)}
          
          {content.publicToAll && renderDateItem(t('content-stats.published-date'), content.publishTime)}
          
          {renderDateItem(t('content-stats.last-updated'), content.updateTime)}
        </CardContent>
      </Card>
    </BaseDrawer>
  );
} 