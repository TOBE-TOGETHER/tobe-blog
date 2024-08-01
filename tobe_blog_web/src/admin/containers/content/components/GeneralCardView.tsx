import { Grid } from '@mui/material';
import { InfiniteScrollList } from '../../../../components';
import { IBaseUserContentDTO, IOperation } from '../../../../global/types';
import { GeneralCard } from './GeneralCard';

interface IGeneralCardViewProps {
  loading: boolean;
  data: IBaseUserContentDTO[];
  current: number;
  totalPage: number;
  operations: IOperation[];
  loadMore: () => void;
  onClick?: (id: number | string) => void;
}

export default function GeneralCardView(props: Readonly<IGeneralCardViewProps>) {
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
