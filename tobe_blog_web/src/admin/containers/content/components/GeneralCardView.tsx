import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfiniteScrollList } from '../../../../components';
import { EOperationName } from '../../../../global/enums';
import { IBaseUserContentDTO, IOperation, ITagOption } from '../../../../global/types';
import BaseContentService from '../BaseContentService';
import { GeneralCard } from './GeneralCard';

interface IGeneralCardViewProps {
  loading: boolean;
  setLoading: (v: boolean) => void;
  contentService: BaseContentService;
  status: string;
  tagValues: ITagOption[];
  onClick?: (id: number | string) => void;
}

export default function GeneralCardView(props: IGeneralCardViewProps) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const DEFAULT_PAGE_SIZE: number = 8;
  const [data, setData] = useState<IBaseUserContentDTO[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);

  // the tempData and tempCurrent are defined for avoid data duplicated issue
  let tempData: IBaseUserContentDTO[] = [];
  let tempCurrent: number = 0;

  function loadData(filter: { status: string; tagValues: ITagOption[] }): void {
    props.contentService
      .get(
        DEFAULT_PAGE_SIZE,
        current + 1,
        '',
        filter.status,
        filter.tagValues.map(t => t.value)
      )
      .then(response => {
        // avoid duplicated data issue caused by the exceptional re-render
        if (current == response.data.current && current != 0) {
          return;
        }
        setData(data.concat(response.data.records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .catch(() => {
        enqueueSnackbar(t('contents-page.msg.error'), {
          variant: 'error',
        });
      });
  }

  useEffect(() => {
    loadData({ status: props.status, tagValues: props.tagValues });
  }, [props.status, props.tagValues]);

  function releaseById(id: number | string) {
    props.setLoading(true);
    props.contentService
      .releaseById(id)
      .then(response => {
        setData(
          data.map(d => {
            if (d.id === id) {
              d.publicToAll = response.data.publicToAll;
            }
            return d;
          })
        );
      })
      .catch(error => console.error(error))
      .finally(() => {
        props.setLoading(false);
      });
  }

  function deleteById(id: number | string) {
    props.setLoading(true);
    props.contentService
      .deleteById(id)
      .then(() => {
        setData(data.filter(d => d.id !== id));
      })
      .catch(error => console.error(error))
      .finally(() => {
        props.setLoading(false);
      });
  }

  const operations: IOperation[] = [
    {
      name: EOperationName.RELEASE,
      onClick: (id: number | string) => releaseById(id),
      hide: (data: any) => data.publicToAll,
    },
    {
      name: EOperationName.DELETE,
      onClick: (id: number | string) => deleteById(id),
    },
  ];

  return (
    <Grid container>
      <InfiniteScrollList
        loading={props.loading}
        filter={{ status: props.status, tagValues: props.tagValues }}
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
