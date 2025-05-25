import { Grid, Paper, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { enabled, useCommonUtils } from '../../../commons/index.ts';
import { Page } from '../../../components/layout/index.ts';
import { EContentType, EFeatureCode } from '../../../global/enums.ts';
import { IUserContentAnalyticsDTO } from '../../../global/types.ts';
import { URL } from '../../../routes';
import * as OverviewService from './OverviewService.ts';

export default function AnalyticsPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const [planData, setPlanData] = useState<IUserContentAnalyticsDTO>({
    totalCount: 0,
    publicCount: 0,
    totalViewCount: 0,
    totalLikeCount: 0,
  });
  const [articleData, setArticleData] = useState<IUserContentAnalyticsDTO>({
    totalCount: 0,
    publicCount: 0,
    totalViewCount: 0,
    totalLikeCount: 0,
  });
  const [vocData, setVOCData] = useState<IUserContentAnalyticsDTO>({
    totalCount: 0,
    publicCount: 0,
    totalViewCount: 0,
    totalLikeCount: 0,
  });
  const [colData, setCOLData] = useState<IUserContentAnalyticsDTO>({
    totalCount: 0,
    publicCount: 0,
    totalViewCount: 0,
    totalLikeCount: 0,
  });
  const loadOverview = useCallback(
    (contentType: EContentType, setData: (any: any) => void): void => {
      OverviewService.getOverviewData(contentType)
        .then(response => {
          setData(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t('analytics-page.msg.error'), {
            variant: 'error',
          });
        });
    },
    [enqueueSnackbar, t]
  );
  const loadData = useCallback((): void => {
    loadOverview(EContentType.Plan, setPlanData);
    loadOverview(EContentType.Article, setArticleData);
    loadOverview(EContentType.Vocabulary, setVOCData);
    loadOverview(EContentType.Collection, setCOLData);
  }, [loadOverview]);

  useEffect(() => loadData(), [loadData]);

  return (
    <Page
      openLoading={false}
      pageTitle={t('analytics-page.page-main-title')}
    >
      <Grid
        container
        spacing={1}
      >
        {enabled(EFeatureCode.PLAN_MODULE) && (
          <UserContentAnalyticsPanel
            contentType={EContentType.Plan}
            data={planData}
            link={URL.PLANS}
          />
        )}
        {enabled(EFeatureCode.ARTICLE_MODULE) && (
          <UserContentAnalyticsPanel
            contentType={EContentType.Article}
            data={articleData}
            link={URL.ARTICLES}
          />
        )}
        {enabled(EFeatureCode.VOCABULARY_MODULE) && (
          <UserContentAnalyticsPanel
            contentType={EContentType.Vocabulary}
            data={vocData}
            link={URL.VOCABULARIES}
          />
        )}
        {enabled(EFeatureCode.COLLECTION_MODULE) && (
          <UserContentAnalyticsPanel
            contentType={EContentType.Collection}
            data={colData}
            link={URL.COLLECTIONS}
          />
        )}
      </Grid>
    </Page>
  );
}

const StandardSmallWidget = (props: Readonly<{ value: number | string; label: string }>) => {
  return (
    <Grid
      item
      container
      xs={3}
      sx={{ px: 2, py: 1.5 }}
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {props.label}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {props.value}
        </Typography>
      </Grid>
    </Grid>
  );
};

const UserContentAnalyticsPanel = (props: Readonly<{ data: IUserContentAnalyticsDTO; link: string; contentType: EContentType }>) => {
  const { t, navigate } = useCommonUtils();
  return (
    <Grid
      container
      item
      xs={12}
      md={6}
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h6"
          sx={{
            'mt': 2,
            'mb': 1,
            'cursor': 'pointer',
            ':hover': { fontWeight: 550 },
          }}
          onClick={() => navigate(props.link)}
        >
          {t('analytics-page.content.title.' + props.contentType.toLowerCase())}
        </Typography>
      </Grid>
      <Grid
        container
        component={Paper}
        onClick={() => navigate(props.link)}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          zIndex: 0,
          borderRadius: 4,
        }}
      >
        <StandardSmallWidget
          value={props.data.publicCount}
          label={t('analytics-page.content.public')}
        />
        <StandardSmallWidget
          value={props.data.totalCount}
          label={t('analytics-page.content.all')}
        />
        <StandardSmallWidget
          value={(props.data.totalLikeCount / 1000).toFixed(1)}
          label={t('analytics-page.content.like-count')}
        />
        <StandardSmallWidget
          value={(props.data.totalViewCount / 1000).toFixed(1)}
          label={t('analytics-page.content.view-count')}
        />
        <DecordateBox
          color={'red'}
          xIndex="10px"
        />
        <DecordateBox
          color={'blue'}
          xIndex="-100px"
        />
      </Grid>
    </Grid>
  );
};

const DecordateBox = (props: { color: string; xIndex: string }) => {
  return (
    <Grid
      item
      sx={{
        top: '-44px',
        width: '240px',
        zIndex: '-1',
        height: '180px',
        right: props.xIndex,
        opacity: '0.12',
        borderRadius: '24px',
        position: 'absolute',
        transform: 'rotate(40deg)',
        background: props.color,
      }}
    />
  );
};
