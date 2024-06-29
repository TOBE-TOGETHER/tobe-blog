import { Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PlanProgressModal from '../../../../admin/containers/content/plan/component/PlanProgressModal';
import { TimeFormat } from '../../../../commons';
import { PlanInfo } from '../../../../global/types';
import { URL } from '../../../../routes';
import { PublicDataService } from '../../../../services';
import { ContentReadingPage } from '../ContentReadingPage';

export default function PlanReadingPage() {
  const { t } = useTranslation();
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [plan, setPlan] = useState<PlanInfo | null>(null);

  useEffect(() => {
    function loadProject(id: string): void {
      PublicDataService.getPlanById(id)
        .then(response => {
          setPlan(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t('project-detail-page.msg.error'), {
            variant: 'error',
          });
        });
    }
    loadProject(id || '');
  }, [enqueueSnackbar, t, id]);

  return (
    <ContentReadingPage
      content={plan}
      editLinkUrlPrefix={URL.PLAN_DETAIL}
    >
      <Grid container>
        {plan && (
          <Grid
            container
            sx={{ minHeight: '20vh', pt: 4 }}
          >
            <Grid
              item
              xs={12}
              sx={{ textAlign: 'left' }}
            >
              <Typography
                color="text.secondary"
                variant="body1"
                sx={{ whiteSpace: 'pre-wrap' }}
              >
                {plan.description}
              </Typography>
            </Grid>
            <Grid
              flexDirection={'column'}
              container
              item
              xs={12}
              sx={{ textAlign: 'center', mt: 4 }}
            >
              <Grid
                container
                item
                xs={12}
              >
                <TimeField
                  time={plan.targetStartTime}
                  label={t('plan-detail-page.fields.target-start-time')}
                />
                <TimeField
                  time={plan.targetEndTime}
                  label={t('plan-detail-page.fields.target-end-time')}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {id && (
          <PlanProgressModal
            planId={id}
            viewOnly={true}
          />
        )}
      </Grid>
    </ContentReadingPage>
  );
}

const TimeField = (props: { time: string; label: string }) =>
  props.time ? (
    <Grid
      item
      xs={6}
    >
      <Typography
        color="text.secondary"
        variant="body2"
      >
        {props.label}
      </Typography>
      <Typography
        color="text.secondary"
        variant="body2"
      >
        {TimeFormat.dateFormat(props.time)}
      </Typography>
    </Grid>
  ) : (
    <></>
  );
