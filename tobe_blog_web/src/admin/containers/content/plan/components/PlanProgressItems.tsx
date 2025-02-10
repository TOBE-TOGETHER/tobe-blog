import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../../../../commons/index.ts';
import { InfiniteScrollList } from '../../../../../components';
import { IPlanProgress } from '../../../../../global/types.ts';
import * as PublicDataService from '../../../../../services/PublicDataService.ts';
import PlanProgressItem from './PlanProgressItem.tsx';

interface ILoadDataOption {
  reset: boolean;
}

export default function PlanProgressItems(props: Readonly<{ planId: string; viewOnly: boolean; refreshCode: number }>) {
  const { t, enqueueSnackbar } = useCommonUtils();
  const DEFAULT_PAGE_SIZE: number = 6;
  const [progresses, setProgresses] = useState<IPlanProgress[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadProgresses({ reset: true });
  }, [props.planId, props.refreshCode]);

  const loadProgresses = (option: ILoadDataOption) => {
    setLoading(true);
    PublicDataService.getProgressesByPlanId(props.planId, DEFAULT_PAGE_SIZE, option.reset ? 1 : current + 1)
      .then(response => {
        setProgresses(option.reset ? response.data.records : progresses.concat(response.data.records));
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
      renderItem={(progress: IPlanProgress) => (
        <Grid
          item
          xs={12}
          key={`infinite-scroll-item-${progress.id}`}
        >
          <PlanProgressItem
            progress={progress}
            viewOnly={props.viewOnly}
            key={progress.id}
          />
        </Grid>
      )}
      option={{ reset: false }}
      hasMore={current < totalPage}
      loadMore={loadProgresses}
    />
  );
}
