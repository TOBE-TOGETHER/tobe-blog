import { Grid } from '@mui/material';
import { IBaseUserContentDTO, IOperation } from '../../../../global/types';
import { InfiniteScrollList } from '../../../components';
import { GeneralCard } from './GeneralCard';

export default function GeneralCardView(props: {
  loading: boolean;
  data: IBaseUserContentDTO[];
  current: number;
  totalPage: number;
  operations: IOperation[];
  loadMore: () => void;
  onClick?: (id: number | string) => void;
}) {
  return (
    <Grid container>
      <InfiniteScrollList
        loading={props.loading}
        dataSource={props.data}
        hasMore={props.current < props.totalPage}
        loadMore={props.loadMore}
        renderItem={(record: IBaseUserContentDTO) => (
          <GeneralCard
            key={`item-${record.id}`}
            record={record}
            onClick={props.onClick}
            operations={props.operations}
          />
        )}
      />
    </Grid>
  );
}
