import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  Box, 
  Divider, 
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
import { useCommonUtils } from '../../../../commons';
import { BaseDrawer, ContentStatsSection, ContentStatusChips, ContentDatesSection } from '../../../components';
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
        <ContentStatsSection content={content} cardStyle={cardStyle} />

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
            
            <ContentStatusChips content={content} variant="stats" />
          </CardContent>
        </Card>

        <Divider sx={{ my: 3 }} />

        {/* Dates */}
        <ContentDatesSection content={content} cardStyle={cardStyle} isLastCard={true} />
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