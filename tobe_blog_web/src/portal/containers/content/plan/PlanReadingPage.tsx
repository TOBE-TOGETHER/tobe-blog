import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TimeFormat, useCommonUtils } from '../../../../commons';
import { PlanProgressModal, SEOHead } from '../../../../components';
import { IPlanInfo } from '../../../../global/types';
import { useSEO } from '../../../../hooks';
import { URL } from '../../../../routes';
import * as PublicDataService from '../../../../services/PublicDataService.ts';
import ContentReadingPage from '../ContentReadingPage';

export default function PlanReadingPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const { id } = useParams();
  const [plan, setPlan] = useState<IPlanInfo | null>(null);

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
    loadProject(id ?? '');
  }, [enqueueSnackbar, t, id]);

  // Use SEO Hook
  const seoData = useSEO({
    content: plan,
    contentType: 'plan',
  });

  return (
    <>
      {seoData && <SEOHead {...seoData} />}
      <ContentReadingPage
        content={plan}
        subTitle={plan?.description}
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
    </>
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
