import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchIcon from '@mui/icons-material/Launch';
import RecommendIcon from '@mui/icons-material/Recommend';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningIcon from '@mui/icons-material/Warning';
import { 
  Box, 
  Chip, 
  Divider, 
  Drawer, 
  Grid, 
  IconButton, 
  Link, 
  Tooltip, 
  Typography 
} from '@mui/material';
import { TimeFormat, useCommonUtils } from '../../../../commons';
import { IBaseUserContentDTO } from '../../../../global/types';
import theme from '../../../../theme';

interface IContentStatsDrawerProps {
  content: IBaseUserContentDTO | null;
  open: boolean;
  onClose: () => void;
}

export default function ContentStatsDrawer(props: Readonly<IContentStatsDrawerProps>) {
  const { t } = useCommonUtils();

  if (!props.content) {
    return null;
  }

  // Generate portal URL based on content type
  const getPortalUrl = () => {
    return `/content/${props.content!.id}`;
  };

  // Check if portal link should be shown (published and not banned)
  const shouldShowPortalLink = props.content.publicToAll && !props.content.banned;

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          p: 3,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          {t('content-stats.title')}
        </Typography>
        <IconButton
          onClick={props.onClose}
          size="small"
          sx={{ 
            color: theme.palette.text.secondary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Statistics */}
      <Grid container spacing={3}>
        {/* Reading Count */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <VisibilityIcon sx={{ color: theme.palette.primary.main, fontSize: '2rem' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('content-stats.view-count')}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                {props.content.viewCount?.toLocaleString() || 0}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Like Count */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <FavoriteIcon sx={{ color: '#e91e63', fontSize: '2rem' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('content-stats.like-count')}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#e91e63' }}>
                {props.content.likeCount?.toLocaleString() || 0}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Status and Portal Link */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {t('content-stats.status')}
              </Typography>
              {!props.content.publicToAll && (
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
                  color="error"
                  size="small"
                  sx={{ 
                    fontWeight: 'bold'
                  }}
                />
              )}
              {props.content.publicToAll && !props.content.recommended && !props.content.banned && (
                <Chip
                  label={t('content-stats.normal')}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    color: theme.palette.text.secondary
                  }}
                />
              )}
            </Box>
            {shouldShowPortalLink && (
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
            )}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Dates */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
            {t('content-stats.dates')}
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              {t('content-stats.created-date')}
            </Typography>
            <Typography variant="body1">
              {TimeFormat.dateAndTimeFormat(props.content.createTime)}
            </Typography>
          </Box>
        </Grid>
        
        {props.content.publicToAll && (
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                {t('content-stats.published-date')}
              </Typography>
              <Typography variant="body1">
                {TimeFormat.dateAndTimeFormat(props.content.publishTime)}
              </Typography>
            </Box>
          </Grid>
        )}
        
        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              {t('content-stats.last-updated')}
            </Typography>
            <Typography variant="body1">
              {TimeFormat.dateAndTimeFormat(props.content.updateTime)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
} 