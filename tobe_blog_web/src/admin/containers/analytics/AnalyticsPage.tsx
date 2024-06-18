import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { enabled } from '../../../commons/index.ts';
import { Page } from '../../../components/layout/index.ts';
import {
  EContentType,
  EFeatureCode
} from '../../../global/enums.ts';
import { IUserContentAnalyticsDTO } from '../../../global/types.ts';
import { OverviewService } from '../../../services/index.ts';
import { URL } from '../../URL';

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
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
        .then((response) => {
          setData(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t('analytics-page.msg.error'), {
            variant: 'error',
          });
        });
    },
    [
      enqueueSnackbar,
      t,
    ],
  );
  const loadData = useCallback((): void => {
    loadOverview(EContentType.Plan, setPlanData);
    loadOverview(EContentType.Article, setArticleData);
    loadOverview(EContentType.Vocabulary, setVOCData);
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
        <UserContentAnalyticsPanel
            contentType={EContentType.Collection}
            data={colData}
            link={URL.COLLECTIONS}
        />
      </Grid>
    </Page>
  );
}

const StandardSmallWidget = (props: {
  value: number | string;
  label: string;
  link: string;
}) => {
  return (
    <Grid
      item
      container
      xs={3}
      sx={{ px: 3, py: 2 }}
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{textAlign: "center"}}
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
          sx={{textAlign: "center"}}
        >
          {props.value}
        </Typography>
      </Grid>
    </Grid>
  );
};

const UserContentAnalyticsPanel = (props: {
  data: IUserContentAnalyticsDTO;
  link: string;
  contentType: EContentType;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Grid
      container
      item
      xs={12}
      md={6}
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            mb: 0,
            cursor: 'pointer',
            ':hover': { fontWeight: 600 },
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
        variant="outlined"
      >
        <StandardSmallWidget
          value={props.data.publicCount}
          label={t('analytics-page.content.public')}
          link={props.link}
        />
        <StandardSmallWidget
          value={props.data.totalCount}
          label={t('analytics-page.content.all')}
          link={props.link}
        />
        <StandardSmallWidget
          value={(props.data.totalViewCount / 1000).toFixed(1)}
          label={t('analytics-page.content.like-count')}
          link={props.link}
        />
        <StandardSmallWidget
          value={(props.data.totalViewCount / 1000).toFixed(1)}
          label={t('analytics-page.content.view-count')}
          link={props.link}
        />
      </Grid>
    </Grid>
  );
};
