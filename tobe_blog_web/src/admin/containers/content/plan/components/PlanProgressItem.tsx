import { Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { TimeFormat, useCommonUtils } from '../../../../../commons';
import { IPlanProgress } from '../../../../../global/types';
import { EditIconButton } from '../../../../components';
import * as PlanProgressService from './PlanProgressService.ts';

interface IPlanProgressItemProps {
  progress: IPlanProgress;
  viewOnly: boolean;
}

export default function PlanProgressItem(props: Readonly<IPlanProgressItemProps>) {
  const { t, enqueueSnackbar } = useCommonUtils();
  const [progress, setProgress] = useState<IPlanProgress>(props.progress);
  const [editable, setEditable] = useState<boolean>(false);
  const [progressDesc, setProgressDesc] = useState<string>(props.progress.description);

  const handleEditableChange = () => {
    if (editable) {
      handleProgressUpdate();
    }
    setEditable(!editable);
  };

  function handleProgressUpdate(): void {
    PlanProgressService.updateProgress({
      id: progress.id,
      planId: progress.planId,
      description: progressDesc,
    })
      .then(response => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        setProgress(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      });
  }

  return (
    <Paper
      sx={{
        py: 3,
        px: { sm: 3, xs: 2 },
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
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              {progressDesc}
            </Typography>
          )}
        </Grid>
        {/* <ImagesPanel
          keyPrefix={props.progress.id}
          imageURLs={imageURLs}
        /> */}
      </Grid>
    </Paper>
  );
}
