import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../../../commons';
import { InfiniteScrollList } from '../../../../components';
import { IBaseUserContentDTO, ITagOption } from '../../../../global/types';
import BaseContentService from '../BaseContentService';
import { GeneralCard } from '../../../components';

interface IGeneralCardViewProps {
  contentService: BaseContentService;
  status: string;
  tagValues: ITagOption[];
  keyword: string;
  setRecordFound: (v: number) => void;
  onClick?: (id: number | string) => void;
}

interface ILoadDataOption {
  status: string;
  tagValues: ITagOption[];
  keyword: string;
  reset: boolean;
}

export default function GeneralCardView(props: Readonly<IGeneralCardViewProps>) {
  const { t, enqueueSnackbar } = useCommonUtils();
  const DEFAULT_PAGE_SIZE: number = 8;
  const [data, setData] = useState<IBaseUserContentDTO[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  function loadData(option: ILoadDataOption): void {
    setLoading(true);
    props.contentService
      .get(
        DEFAULT_PAGE_SIZE,
        option.reset ? 1 : current + 1,
        option.keyword || '',
        option.status,
        option.tagValues.map(t => t.value)
      )
      .then(response => {
        setData(option.reset ? response.data.records : data.concat(response.data.records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
        props.setRecordFound(response.data.total);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadData({ status: props.status, tagValues: props.tagValues, keyword: props.keyword, reset: true });
  }, [props.status, props.tagValues, props.keyword]);

  return (
    <Grid container>
      <InfiniteScrollList
        loading={loading}
        option={{ status: props.status, tagValues: props.tagValues, keyword: props.keyword, reset: false }}
        dataSource={data}
        hasMore={current < totalPage}
        loadMore={loadData}
        renderItem={(record: IBaseUserContentDTO) => (
          <GeneralCard
            key={`item-${record.id}`}
            record={record}
            onClick={props.onClick}
          />
        )}
      />
    </Grid>
  );
}
