import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchIcon from '@mui/icons-material/Launch';
import RecommendIcon from '@mui/icons-material/Recommend';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Chip, Grid, IconButton, Link, Paper, Tooltip, Typography } from '@mui/material';
import { TimeFormat, useCommonUtils } from '../../../../commons';
import { IBaseUserContentDTO } from '../../../../global/types';
import theme from '../../../../theme';

interface IContentStatsSectionProps {
  content: IBaseUserContentDTO | null;
  visible: boolean;
}

export default function ContentStatsSection(props: Readonly<IContentStatsSectionProps>) {
  const { t } = useCommonUtils();

  if (!props.visible || !props.content || !props.content.publicToAll) {
    return null;
  }

  // Generate portal URL based on content type
  const getPortalUrl = () => {
    return `/content/${props.content!.id}`;
  };

  return (
    <Paper sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 4 }}>
      {/* Title and Portal Link Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          {t('content-stats.title')}
        </Typography>
        <Tooltip title={t('content-stats.view-on-portal')}>
          <IconButton
            component={Link}
            href={getPortalUrl()}
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
      </Box>
      
      <Grid container spacing={2}>
        {/* Reading Count */}
        <Grid item xs={12} sm={4} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VisibilityIcon sx={{ color: theme.palette.text.secondary, fontSize: '1.2rem' }} />
            <Typography variant="body2" color="text.secondary">
              {t('content-stats.view-count')}:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {props.content.viewCount?.toLocaleString() || 0}
            </Typography>
          </Box>
        </Grid>

        {/* Like Count */}
        <Grid item xs={12} sm={4} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FavoriteIcon sx={{ color: theme.palette.text.secondary, fontSize: '1.2rem' }} />
            <Typography variant="body2" color="text.secondary">
              {t('content-stats.like-count')}:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {props.content.likeCount?.toLocaleString() || 0}
            </Typography>
          </Box>
        </Grid>

        {/* Status */}
        <Grid item xs={12} sm={4} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {t('content-stats.status')}:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
              {props.content.recommended && (
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
              {props.content.banned && (
                <Chip
                  icon={<WarningIcon />}
                  label={t('content-stats.banned')}
                  size="small"
                  color="error"
                  sx={{ fontWeight: 'bold' }}
                />
              )}
              {!props.content.recommended && !props.content.banned && (
                <Chip
                  label={t('content-stats.normal')}
                  size="small"
                  variant="outlined"
                  sx={{ color: theme.palette.text.secondary }}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Additional Info */}

      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('content-stats.created-date')}:</strong> {TimeFormat.dateAndTimeFormat(props.content.createTime)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('content-stats.published-date')}:</strong> {TimeFormat.dateAndTimeFormat(props.content.publishTime)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('content-stats.last-updated')}:</strong> {TimeFormat.dateAndTimeFormat(props.content.updateTime)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
} 