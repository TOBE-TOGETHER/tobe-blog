import { Grid, Paper, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TimeFormat } from '../../../../../commons';
import { PlanProgress } from '../../../../../global/types';
import { PlanProgressService, PublicDataService } from '../../../../../services';
import { EditIconButton } from '../../../../components';
import { ImagesPanel } from './ImagesPanel';

interface PlanProgressItemProps {
  progress: PlanProgress;
  viewOnly: boolean;
}

export default function PlanProgressItem(props: PlanProgressItemProps) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [progress, setProgress] = useState<PlanProgress>(props.progress);
  const [editable, setEditable] = useState<boolean>(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [progressDesc, setProgressDesc] = useState<string>(props.progress.description);

  const handleEditableChange = () => {
    if (editable) {
      handleProgressUpdate();
    }
    setEditable(!editable);
  };

  useEffect(() => {
    function loadImages() {
      PublicDataService.getBySrcIdAndFileType(props.progress.id, 'PLAN_PIC').then(response => {
        let imageUrls = response.data.map((f: { downloadURL: string }) => f.downloadURL);
        setImageURLs(imageUrls);
      });
    }

    loadImages();
  }, [props.progress.id]);

  function handleProgressUpdate(): void {
    PlanProgressService.updateProgress({
      id: progress.id,
      planId: progress.planId,
      description: progressDesc,
    })
      .then(response => {
        enqueueSnackbar(t('plan-detail-page.msg.success'), {
          variant: 'success',
        });
        setProgress(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t('plan-detail-page.msg.error'), {
          variant: 'error',
        });
      });
  }

  return (
    <Paper
      sx={{
        py: 2,
        px: { sm: 2, xs: 0 },
        borderWidth: { xs: '0px', sm: '1px' },
        borderBottomWidth: { xs: '1px' },
        borderRadius: 4,
      }}
    >
      <Grid
        container
        item
        xs={12}
      >
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {TimeFormat.dateFormat(progress.createTime)} {TimeFormat.timeFormat(progress.createTime)}
          </Typography>
          {!props.viewOnly && (
            <EditIconButton
              editable={editable}
              handleEditableChange={handleEditableChange}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
        >
          {!props.viewOnly ? (
            <TextField
              fullWidth
              variant="standard"
              multiline
              minRows={2}
              maxRows={20}
              disabled={!editable}
              value={progressDesc}
              onChange={event => setProgressDesc(event.target.value)}
            />
          ) : (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {progressDesc}
            </Typography>
          )}
        </Grid>
        <ImagesPanel
          keyPrefix={props.progress.id}
          imageURLs={imageURLs}
        />
      </Grid>
    </Paper>
  );
}
