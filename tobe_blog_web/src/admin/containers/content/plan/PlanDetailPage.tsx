import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { PlanInfo, PlanUpdateDTO, TagOption } from '../../../../global/types';
import { PlanService } from '../../../../services';
import { EditIconButton, FormPanel, HalfRow, MultipleTagSelecter, OneRow } from '../../../components';
import PlanProgressModal from './component/PlanProgressModal.tsx';
import PlanStatusToolbar from './component/PlanStatusToolbar';

export default function PlanDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [editable, setEditable] = useState<boolean>(false);
  const [plan, setPlan] = useState<PlanInfo | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const loadData = useCallback(
    (id: string): void => {
      setOpenLoading(true);
      PlanService.getById(id)
        .then(response => {
          setPlan(response.data);
          setFromTime(new Date(response.data.targetStartTime));
          setToTime(new Date(response.data.targetEndTime));
          setDescription(response.data.description);
          setCoverImgUrl(response.data.coverImgUrl);
          setTagValue(response.data.tags);
        })
        .catch(() => {
          enqueueSnackbar(t('plan-detail-page.msg.error'), {
            variant: 'error',
          });
        })
        .finally(() => setOpenLoading(false));
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => loadData(id || ''), [loadData, id]);

  function handlePlanUpdate(updatedPlan: PlanUpdateDTO): void {
    setOpenLoading(true);
    PlanService.update(updatedPlan)
      .then(() => {
        enqueueSnackbar(t('plan-detail-page.msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('plan-detail-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }

  const handleEditableChange = () => {
    if (!plan) {
      return;
    }
    if (editable) {
      handlePlanUpdate({
        id: plan.id,
        title: plan.title,
        description: description || '',
        coverImgUrl: coverImgUrl,
        targetStartTime: fromTime,
        targetEndTime: toTime,
        tags: tagValue,
      });
    }
    setEditable(!editable);
  };

  return (
    <Page
      openLoading={openLoading}
      pageTitle={plan?.title}
    >
      {plan && (
        <Grid
          container
          sx={{ m: 0, p: { xs: 0.5, md: 1 } }}
          alignItems="center"
        >
          <Grid
            item
            flexGrow={1}
          >
            <PlanStatusToolbar plan={plan} />
          </Grid>
          <Grid
            item
            flexGrow={0}
          >
            <EditIconButton
              editable={editable}
              handleEditableChange={handleEditableChange}
            />
          </Grid>
        </Grid>
      )}
      {plan && (
        <FormPanel sx={{ mt: 1 }}>
          <OneRow>
            <TextField
              label={t('plan-detail-page.fields.description')}
              fullWidth
              autoComplete="description"
              multiline
              minRows={3}
              maxRows={20}
              disabled={!editable}
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </OneRow>
          <Grid
            container
            item
            xs={12}
            spacing={3}
          >
            <HalfRow>
              <DatePicker
                label={t('plan-detail-page.fields.target-start-time')}
                value={fromTime}
                sx={{ width: '100%' }}
                onChange={newValue => setFromTime(newValue)}
                disabled={!editable}
              />
            </HalfRow>
            <HalfRow>
              <DatePicker
                label={t('plan-detail-page.fields.target-end-time')}
                value={toTime}
                sx={{ width: '100%' }}
                onChange={newValue => setToTime(newValue)}
                disabled={!editable}
              />
            </HalfRow>
          </Grid>
          <OneRow>
            <TextField
              label={t('plan-detail-page.fields.cover-img-url')}
              fullWidth
              value={coverImgUrl}
              onChange={e => setCoverImgUrl(e.target.value)}
              disabled={!editable}
            />
          </OneRow>
          <OneRow>
            <MultipleTagSelecter
              value={tagValue}
              setValue={setTagValue}
              disabled={!editable}
            />
          </OneRow>
        </FormPanel>
      )}
      {id && (
        <PlanProgressModal
          planId={id}
          viewOnly={false}
        />
      )}
    </Page>
  );
}
