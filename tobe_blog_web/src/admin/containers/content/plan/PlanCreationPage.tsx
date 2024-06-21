import {
  Grid,
  Paper,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSnackbar } from 'notistack';
import {
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { TagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { PlanService } from '../../../../services';
import { HalfRow, MultipleTagSelecter, OneRow, SaveButtonPanel } from '../../../components';

export default function PlanCreationPage() {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);
  
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    handlePlanCreation();
  };
  
  function validateForm(): boolean {
    if (!title) {
      warn(t('plan-creation-page.msg.warning.name-empty'));
      return false;
    }
    if (!fromTime) {
      warn(t('plan-creation-page.msg.warning.target-start-time-empty'));
      return false;
    }
    if (!toTime) {
      warn(t('plan-creation-page.msg.warning.target-end-time-empty'));
      return false;
    }
    if (fromTime?.getTime() > toTime?.getTime()) {
      warn(
        t('plan-creation-page.msg.warning.target-invalid-start-end-time'),
      );
      return false;
    }
    
    return true;
  }
  
  function warn(msg: string): void {
    enqueueSnackbar(msg, {
      variant: 'warning',
    });
  }
  
  function handlePlanCreation(): void {
    setOpenLoading(true);
    PlanService.create({
      title: title,
      description: description,
      targetStartTime: fromTime,
      targetEndTime: toTime,
      tags: tagValue,
    })
      .then(() => {
        enqueueSnackbar(t('plan-creation-page.msg.success'), {
          variant: 'success',
        });
        navigate(URL.PLANS);
      })
      .catch(() => {
        enqueueSnackbar(t('plan-creation-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={t('plan-creation-page.form-title')}
    >
      <Paper
        variant="outlined"
        sx={{ mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Grid container spacing={3}>
          <OneRow>
            <TextField
              label={t('plan-creation-page.fields.name')}
              fullWidth
              onChange={e => setTitle(e.target.value)}
              />
          </OneRow>
          <HalfRow>
            <DatePicker
              disablePast={true}
              label={t('plan-creation-page.fields.target-start-time')}
              value={fromTime}
              sx={{width: "100%"}}
              onChange={(newValue) => setFromTime(newValue)}
              />
          </HalfRow>
          <HalfRow>
            <DatePicker
              disablePast={true}
              label={t('plan-creation-page.fields.target-end-time')}
              value={toTime}
              sx={{width: "100%"}}
              onChange={(newValue) => setToTime(newValue)}
              />
          </HalfRow>
          <HalfRow>
            <TextField
              label={t('plan-creation-page.fields.description')}
              fullWidth
              onChange={e => setDescription(e.target.value)}
              multiline
              maxRows={4}
              minRows={4}
              />
          </HalfRow>
          <OneRow>
            <MultipleTagSelecter
              value={tagValue}
              setValue={setTagValue}
              />
          </OneRow>
        </Grid>
      </Paper>
      <SaveButtonPanel primaryEvent={handleSubmit}/>
    </Page>
  );
}
