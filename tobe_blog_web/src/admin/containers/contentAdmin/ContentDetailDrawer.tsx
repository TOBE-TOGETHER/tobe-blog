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
  Divider
} from '@mui/material';
import {
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { useCommonUtils } from '../../../commons';
import { BaseDrawer, ContentStatsSection, ContentStatusChips, ContentDatesSection } from '../../components';
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

        {/* Statistics - using shared component */}
        <ContentStatsSection content={content} cardStyle={cardStyle} />

        {/* Status - using shared component */}
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              {t('content-stats.status')}
            </Typography>
            
            <ContentStatusChips content={content} variant="admin" />
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

        {/* Dates - using shared component */}
        <ContentDatesSection content={content} cardStyle={cardStyle} isLastCard={true} />
      </BaseDrawer>
    </>
  );
} 