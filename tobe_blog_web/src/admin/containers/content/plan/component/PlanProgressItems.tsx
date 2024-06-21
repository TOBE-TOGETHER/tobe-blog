import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { PlanProgress } from '../../../../../global/types';
import { PublicDataService } from '../../../../../services';
import { InfiniteScrollList } from '../../../../components';
import PlanProgressItem from './PlanProgressItem.tsx';

export default function PlanProgressItems(props: {
  planId: string;
  viewOnly: boolean;
  refreshCode: number;
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const DEFAULT_PAGE_SIZE: number = 6;
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [progresses, setProgresses] = useState<PlanProgress[]>([]);
  
  useEffect(() => {
    loadProgresses(0, []);
  }, [
    props.planId,
    props.refreshCode,
  ]);
  
  const loadProgresses = (
    _current: number,
    _progresses: PlanProgress[],
  ): void => {
    setLoading(true);
    PublicDataService.getProgressesByPlanId(
      props.planId,
      DEFAULT_PAGE_SIZE,
      _current + 1,
    )
      .then((response) => {
        setProgresses(_progresses.concat(response.data.records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .catch(() => {
        enqueueSnackbar(t('plan-progress.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <InfiniteScrollList
      loading={loading}
      dataSource={progresses}
      renderItem={(progress: PlanProgress) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          key={`infinite-scroll-item-${progress.id}`}
        >
          <PlanProgressItem
            progress={progress}
            viewOnly={props.viewOnly}
            key={progress.id}
          />
        </Grid>
      )}
      hasMore={current < totalPage}
      loadMore={() => loadProgresses(current, progresses)}
    />
  );
}
