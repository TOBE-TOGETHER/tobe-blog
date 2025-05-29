import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchIcon from '@mui/icons-material/Launch';
import RecommendIcon from '@mui/icons-material/Recommend';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
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
  useTheme,
  Button
} from '@mui/material';
import { useState, useCallback } from 'react';
import { TimeFormat, useCommonUtils } from '../../../../commons';
import { BaseDrawer } from '../../../components';
import Dialogx from '../../../components/dialog/Dialogx';
import { IBaseUserContentDTO } from '../../../../global/types';
import BaseContentService from '../BaseContentService';

interface IContentStatsDrawerProps {
  content: IBaseUserContentDTO | null;
  open: boolean;
  onClose: () => void;
  service?: BaseContentService;
  onDelete?: () => void;
}

export default function ContentStatsDrawer(props: Readonly<IContentStatsDrawerProps>) {
  const { t, navigate, enqueueSnackbar } = useCommonUtils();
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDeleteClick = useCallback((): void => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback((): void => {
    if (!props.content || !props.service) return;
    
    setDeleteLoading(true);
    props.service.deleteById(props.content.id)
      .then(() => {
        enqueueSnackbar(t('content-admin.delete-success'), { variant: 'success' });
        setDeleteDialogOpen(false);
        props.onClose();
        if (props.onDelete) {
          props.onDelete();
        } else {
          navigate(-1);
        }
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { variant: 'error' });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }, [props.content, props.service, props.onClose, props.onDelete, navigate, t, enqueueSnackbar]);

  const handleDeleteCancel = useCallback((): void => {
    setDeleteDialogOpen(false);
  }, []);

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

  // Render action buttons
  const renderActionButtons = () => {
    if (!props.service) return null;

    return (
      <Button
        variant="outlined"
        size="small"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteClick}
        disabled={deleteLoading}
        sx={{ fontSize: '0.75rem', flexGrow: 1 }}
      >
        {t('components.standard-button.delete')}
      </Button>
    );
  };

  return (
    <>
      <BaseDrawer
        open={props.open}
        onClose={props.onClose}
        title={t('content-stats.title')}
        width={{ xs: '100%', sm: 400 }}
        actionButtons={renderActionButtons()}
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

      {/* Delete Confirmation Dialog */}
      <Dialogx
        title={t('content-admin.actions.delete')}
        content={t('content-admin.delete-confirm')}
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        closeBtnText={t('dialog.cancel')}
        onAction={handleDeleteConfirm}
        actionBtnText={t('dialog.confirm')}
      />
    </>
  );
} 