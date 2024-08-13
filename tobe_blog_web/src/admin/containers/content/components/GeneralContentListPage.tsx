import { Box, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { EOperationName } from '../../../../global/enums.ts';
import { IBaseUserContentDTO, IOperation, ITagOption } from '../../../../global/types';
import BaseContentService from '../BaseContentService';
import GeneralCardView from './GeneralCardView';
import GeneralContentListPageFunctionBar from './GeneralContentListPageFunctionBar';

export default function GeneralContentListPage(
  props: Readonly<{
    contentService: BaseContentService;
    pageTitle: string;
    detailPageURL: string;
    createPageURL: string;
  }>
) {
  const DEFAULT_PAGE_SIZE: number = 16;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [data, setData] = useState<IBaseUserContentDTO[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [status, setStatus] = useState<string>('');
  // the tempData and tempCurrent are defined for avoid data duplicated issue
  let tempData: IBaseUserContentDTO[] = [];
  let tempCurrent: number = 0;

  const loadData = (): void => {
    props.contentService
      .get(
        DEFAULT_PAGE_SIZE,
        tempCurrent + 1,
        '',
        status,
        tagValues.map(t => t.value)
      )
      .then(response => {
        // avoid duplicated data issue caused by the exceptional re-render
        if (tempCurrent == response.data.current && tempCurrent != 0) {
          return;
        }
        tempCurrent = response.data.current;
        tempData = tempData.concat(response.data.records);
        setData(tempData);
        setCurrent(tempCurrent);
        setTotalPage(response.data.pages);
      })
      .catch(() => {
        enqueueSnackbar(t('contents-page.msg.error'), {
          variant: 'error',
        });
      });
  };

  const handleFilterChange = (v: string): void => {
    setCurrent(0);
    setTotalPage(1);
    setStatus(v);
    tempData = [];
    tempCurrent = 0;
  };

  useEffect(() => {
    loadData();
  }, [status, tagValues]);

  function releaseById(id: number | string) {
    setOpenLoading(true);
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
        setOpenLoading(false);
      });
  }

  function deleteById(id: number | string) {
    setOpenLoading(true);
    props.contentService
      .deleteById(id)
      .then(() => {
        setData(data.filter(d => d.id !== id));
      })
      .catch(error => console.error(error))
      .finally(() => {
        setOpenLoading(false);
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
    <Page
      openLoading={openLoading}
      pageTitle={props.pageTitle}
    >
      <GeneralContentListPageFunctionBar
        createNewAction={() => navigate(props.createPageURL)}
        tagValues={tagValues}
        setTagValues={setTagValues}
      />
      <Box sx={{ mb: 1, width: '100%' }}>
        <Tabs
          value={status}
          onChange={(_, v: string) => handleFilterChange(v)}
        >
          <Tab
            disableRipple
            label={t('contents-page.filter.all')}
            value=""
          />
          <Tab
            disableRipple
            label={t('contents-page.filter.published')}
            value="PUBLISHED"
          />
          <Tab
            disableRipple
            label={t('contents-page.filter.draft')}
            value="DRAFT"
          />
        </Tabs>
      </Box>
      <GeneralCardView
        loading={openLoading}
        current={current}
        totalPage={totalPage}
        loadMore={loadData}
        data={data}
        operations={operations}
        onClick={(id: number | string) => navigate(props.detailPageURL.replace(':id', id.toString()))}
      />
    </Page>
  );
}
