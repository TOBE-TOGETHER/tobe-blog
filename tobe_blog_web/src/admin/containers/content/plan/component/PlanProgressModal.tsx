import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, {
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileService,
  PlanProgressService,
} from '../../../../../services';
import { InputFileUploadButton } from '../../../../components';
import { ImagesPanel } from './ImagesPanel';
import PlanProgressItems from './PlanProgressItems.tsx';

export default function PlanProgressModal(props: {
  planId: string;
  viewOnly: boolean;
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [newProgress, setNewProgress] = useState<string>('');
  const [images, setImages] = useState<any>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [refreshCode, setRefreshCode] = useState<number>(new Date().getTime());
  
  function onImageChange(e: any) {
    setImages([...e.target.files]);
  }
  
  useEffect(() => {
    if (images.length < 1) {
      return;
    }
    const newImageUrls: any = [];
    images.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image)),
    );
    setImageURLs(newImageUrls);
  }, [
    props.planId,
    images,
  ]);
  
  function handleProgressCreation(): void {
    if (!newProgress.trim()) {
      enqueueSnackbar(t('plan-progress.msg.warning'), {
        variant: 'warning',
      });
      return;
    }
    PlanProgressService.createProgress({
      planId: props.planId,
      description: newProgress,
    })
      .then((response) => {
        if (images.length > 0) {
          return FileService.batchUpload(
            response.data.id,
            'PLAN_PIC',
            images,
          );
        }
      })
      .then(() => {
        setNewProgress('');
        setImages([]);
        setImageURLs([]);
        setRefreshCode(new Date().getTime());
        enqueueSnackbar(t('plan-progress.msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('plan-progress.msg.error'), {
          variant: 'error',
        });
      });
  }
  
  return (
    <React.Fragment>
      <Divider sx={{ my: 1 }}>
        <Typography
          variant="subtitle1"
          color="text.secondary"
        >
          {t('plan-progress.title')}
        </Typography>
      </Divider>
      
      {!props.viewOnly && (
        <Paper
          variant="outlined"
          sx={{ mt: 2, mb: 2, p: { xs: 2, md: 3 } }}
        >
          <Grid
            container
            item
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                id="add-progress-desc"
                label={t('plan-progress.add-new-tip')}
                fullWidth
                variant="outlined"
                multiline
                minRows={3}
                maxRows={20}
                value={newProgress}
                onChange={(event) => {
                  if (event.target.value.length <= 1000) {
                    setNewProgress(event.target.value);
                  }
                }}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent="flex-end"
            >
              <Typography
                variant="body2"
                color="gray"
              >
                {Number(newProgress?.length)} / 1000
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent="flex-end"
              sx={{ mt: 1 }}
            >
              <InputFileUploadButton onImageChange={onImageChange} />
              <Button
                variant="contained"
                size="small"
                onClick={handleProgressCreation}
                sx={{ ml: 1 }}
              >
                {t('plan-progress.send-btn')}
              </Button>
            </Grid>
          </Grid>
          <ImagesPanel
            keyPrefix={'new_progress'}
            imageURLs={imageURLs}
          />
        </Paper>
      )}
      <PlanProgressItems
        planId={props.planId}
        viewOnly={props.viewOnly}
        refreshCode={refreshCode}
      />
    </React.Fragment>
  );
}
