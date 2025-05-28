import { 
  Box, 
  Typography, 
  Avatar, 
  Card, 
  CardContent,
  useTheme,
  Button,
  Chip,
  Tooltip,
  IconButton,
  Grid,
  Divider
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Favorite as FavoriteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Launch as LaunchIcon,
  Recommend as RecommendIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { useCommonUtils, TimeFormat } from '../../../commons';
import { BaseDrawer } from '../../components';
import { IBaseUserContentDTO } from '../../../global/types';
import * as ContentAdminService from './ContentAdminService';

interface IContentDetailDrawerProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly content: IBaseUserContentDTO | null;
  readonly onBan?: (id: number | string) => void;
  readonly onUnban?: (id: number | string) => void;
  readonly onRecommend?: (id: number | string) => void;
  readonly onUnrecommend?: (id: number | string) => void;
}

export default function ContentDetailDrawer({ 
  open, 
  onClose, 
  content, 
  onBan, 
  onUnban, 
  onRecommend, 
  onUnrecommend 
}: IContentDetailDrawerProps) {
  const { t, navigate, enqueueSnackbar } = useCommonUtils();
  const theme = useTheme();
  
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const handleBan = useCallback((): void => {
    if (!content) return;
    setActionLoading(true);
    ContentAdminService.banContent(content.id.toString())
      .then(() => {
        onBan?.(content.id);
        enqueueSnackbar(t('content-admin.ban-success'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { variant: 'error' });
      })
      .finally(() => {
        setActionLoading(false);
      });
  }, [content, onBan, t, enqueueSnackbar]);

  const handleUnban = useCallback((): void => {
    if (!content) return;
    setActionLoading(true);
    ContentAdminService.unbanContent(content.id.toString())
      .then(() => {
        onUnban?.(content.id);
        enqueueSnackbar(t('content-admin.unban-success'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { variant: 'error' });
      })
      .finally(() => {
        setActionLoading(false);
      });
  }, [content, onUnban, t, enqueueSnackbar]);

  const handleRecommend = useCallback((): void => {
    if (!content) return;
    setActionLoading(true);
    ContentAdminService.recommendContent(content.id.toString())
      .then(() => {
        onRecommend?.(content.id);
        enqueueSnackbar(t('content-admin.recommend-success'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { variant: 'error' });
      })
      .finally(() => {
        setActionLoading(false);
      });
  }, [content, onRecommend, t, enqueueSnackbar]);

  const handleUnrecommend = useCallback((): void => {
    if (!content) return;
    setActionLoading(true);
    ContentAdminService.unrecommendContent(content.id.toString())
      .then(() => {
        onUnrecommend?.(content.id);
        enqueueSnackbar(t('content-admin.unrecommend-success'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { variant: 'error' });
      })
      .finally(() => {
        setActionLoading(false);
      });
  }, [content, onUnrecommend, t, enqueueSnackbar]);

  const handleViewOnPortal = useCallback((): void => {
    if (!content) return;
    const shouldShowPortalLink = content.publicToAll && !content.banned;
    if (shouldShowPortalLink) {
      navigate(`/content/${content.id}`);
    }
  }, [content, navigate]);

  // 如果没有内容，显示空状态而不是早期返回
  if (!content) {
    return (
      <BaseDrawer
        open={open}
        onClose={onClose}
        title={t('content-admin.actions.view-details')}
        width={{ xs: '100%', sm: 400 }}
      >
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {t('content-admin.no-content-selected')}
          </Typography>
        </Box>
      </BaseDrawer>
    );
  }

  const shouldShowPortalLink = content.publicToAll && !content.banned;

  // Common card style - reused from ContentStatsDrawer
  const cardStyle = { elevation: 0, border: `1px solid ${theme.palette.divider}`, mb: 3 };

  const getContentTypeColor = (contentType: string) => {
    switch (contentType?.toLowerCase()) {
      case 'article':
        return '#2196F3';
      case 'plan':
        return '#4CAF50';
      case 'vocabulary':
        return '#FF9800';
      case 'collection':
        return '#9C27B0';
      default:
        return '#757575';
    }
  };

  // Render stat item - reused from ContentStatsDrawer
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

  // Render date item - reused from ContentStatsDrawer
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

  const renderActionButtons = () => (
    <>
      {content.banned ? (
        <Button
          variant="outlined"
          size="small"
          startIcon={<CheckCircleIcon />}
          onClick={handleUnban}
          disabled={actionLoading}
          sx={{ fontSize: '0.75rem', flexGrow: 1 }}
        >
          {t('content-admin.actions.unban')}
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="error"
          startIcon={<BlockIcon />}
          onClick={handleBan}
          disabled={actionLoading}
          sx={{ fontSize: '0.75rem', flexGrow: 1 }}
        >
          {t('content-admin.actions.ban')}
        </Button>
      )}
      
      {content.recommended ? (
        <Button
          variant="outlined"
          size="small"
          startIcon={<StarBorderIcon />}
          onClick={handleUnrecommend}
          disabled={actionLoading}
          sx={{ fontSize: '0.75rem', flexGrow: 1 }}
        >
          {t('content-admin.actions.unrecommend')}
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          startIcon={<StarIcon />}
          onClick={handleRecommend}
          disabled={actionLoading}
          sx={{ fontSize: '0.75rem', flexGrow: 1, color: '#FFD700', borderColor: '#FFD700' }}
        >
          {t('content-admin.actions.recommend')}
        </Button>
      )}
    </>
  );

  return (
    <>
      <BaseDrawer
        open={open}
        onClose={onClose}
        title={t('content-admin.actions.view-details')}
        width={{ xs: '100%', sm: 400 }}
        actionButtons={renderActionButtons()}
      >
        {/* Content Header */}
        <Card sx={cardStyle}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <Avatar
                src={content.avatarUrl}
                sx={{ width: 60, height: 60, mr: 2 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {content.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {t('user-detail.fields.author')}: {content.ownerName}
                </Typography>
                <Chip
                  label={t(`admin-table.content-types.${content.contentType?.toLowerCase()}`)}
                  size="small"
                  sx={{
                    backgroundColor: getContentTypeColor(content.contentType),
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
              {shouldShowPortalLink && (
                <Tooltip title={t('content-admin.actions.view-on-portal')}>
                  <IconButton
                    onClick={handleViewOnPortal}
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

            {content.description && (
              <Typography variant="body2" color="text.secondary">
                {content.description}
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Statistics - reused design from ContentStatsDrawer */}
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              {t('content-stats.title')}
            </Typography>
            
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

        {/* Status - reused design from ContentStatsDrawer */}
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              {t('content-stats.status')}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              {!content.publicToAll && (
                <Chip
                  label={t('content-admin.status.draft')}
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
                  label={t('content-admin.status.recommended')}
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
                  label={t('content-admin.status.banned')}
                  color="error"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              )}
              {content.publicToAll && !content.recommended && !content.banned && (
                <Chip
                  label={t('components.general-card-view.published')}
                  variant="outlined"
                  size="small"
                  sx={{ color: theme.palette.success.main, borderColor: theme.palette.success.main }}
                />
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                {t('topic.label')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {content.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag.label}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Dates - reused design from ContentStatsDrawer */}
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
    </>
  );
} 