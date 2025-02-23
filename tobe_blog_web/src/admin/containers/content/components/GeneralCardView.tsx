import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../../../commons';
import { InfiniteScrollList } from '../../../../components';
import { EOperationName } from '../../../../global/enums';
import { IBaseUserContentDTO, IOperation, ITagOption } from '../../../../global/types';
import BaseContentService from '../BaseContentService';
import { GeneralCard } from './GeneralCard';

interface IGeneralCardViewProps {
  contentService: BaseContentService;
  status: string;
  tagValues: ITagOption[];
  setRecordFound: (v: number) => void;
  onClick?: (id: number | string) => void;
}

interface ILoadDataOption {
  status: string;
  tagValues: ITagOption[];
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
        '',
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
    loadData({ status: props.status, tagValues: props.tagValues, reset: true });
  }, [props.status, props.tagValues]);

  function updateVisibility(id: number | string, visibility: 'PUBLIC' | 'PRIVATE') {
    setLoading(true);
    props.contentService
      .updateVisibility(id, visibility)
      .then(response => {
        setData(
          data.map(d => {
            if (d.id === id) {
              d.publicToAll = response.data.publicToAll;
            }
            return d;
          })
        );
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
      })
      .catch(error => {
        console.error(error);
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function deleteById(id: number | string) {
    setLoading(true);
    props.contentService
      .deleteById(id)
      .then(() => {
        setData(data.filter(d => d.id !== id));
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
      })
      .catch(error => {
        console.error(error);
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const operations: IOperation[] = [
    {
      name: EOperationName.RELEASE,
      onClick: (id: number | string) => updateVisibility(id, 'PUBLIC'),
      hide: (data: any) => data.publicToAll,
    },
    {
      name: EOperationName.RETRACT,
      onClick: (id: number | string) => updateVisibility(id, 'PRIVATE'),
      hide: (data: any) => !data.publicToAll,
    },
    {
      name: EOperationName.DELETE,
      onClick: (id: number | string) => deleteById(id),
    },
  ];

  return (
    <Grid container>
      <InfiniteScrollList
        loading={loading}
        option={{ status: props.status, tagValues: props.tagValues, reset: false }}
        dataSource={data}
        hasMore={current < totalPage}
        loadMore={loadData}
        renderItem={(record: IBaseUserContentDTO) => (
          <GeneralCard
            key={`item-${record.id}`}
            record={record}
            onClick={props.onClick}
            operations={operations}
          />
        )}
      />
    </Grid>
  );
}
