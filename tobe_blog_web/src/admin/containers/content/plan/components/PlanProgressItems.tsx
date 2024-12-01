import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfiniteScrollList } from '../../../../../components';
import { IPlanProgress } from '../../../../../global/types.ts';
import * as PublicDataService from '../../../../../services/PublicDataService.ts';
import PlanProgressItem from './PlanProgressItem.tsx';

interface ILoadDataOption {
  reset: boolean;
}

export default function PlanProgressItems(props: Readonly<{ planId: string; viewOnly: boolean }>) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const DEFAULT_PAGE_SIZE: number = 6;
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [progresses, setProgresses] = useState<IPlanProgress[]>([]);

  useEffect(() => {
    loadProgresses({ reset: true });
  }, [props.planId]);

  const loadProgresses = (option: ILoadDataOption) => {
    PublicDataService.getProgressesByPlanId(props.planId, DEFAULT_PAGE_SIZE, option.reset ? 1 : current + 1)
      .then(response => {
        setProgresses(progresses.concat(response.data.records));
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
