import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfiniteScrollList } from '../../../../../components';
import { IPlanProgress } from '../../../../../global/types.ts';
import * as PublicDataService from '../../../../../services/PublicDataService.ts';
import PlanProgressItem from './PlanProgressItem.tsx';

export default function PlanProgressItems(props: { planId: string; viewOnly: boolean; refreshCode: number }) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const DEFAULT_PAGE_SIZE: number = 6;
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [progresses, setProgresses] = useState<IPlanProgress[]>([]);

  useEffect(() => {
    loadProgresses(0, []);
  }, [props.planId, props.refreshCode]);

  const loadProgresses = (_current: number, _progresses: IPlanProgress[]): void => {
    PublicDataService.getProgressesByPlanId(props.planId, DEFAULT_PAGE_SIZE, _current + 1)
      .then(response => {
        setProgresses(_progresses.concat(response.data.records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .catch(() => {
        enqueueSnackbar(t('plan-progress.msg.error'), {
          variant: 'error',
        });
      });
  };
  return (
    <InfiniteScrollList
      loading={false}
      dataSource={progresses}
      renderItem={(progress: IPlanProgress) => (
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
