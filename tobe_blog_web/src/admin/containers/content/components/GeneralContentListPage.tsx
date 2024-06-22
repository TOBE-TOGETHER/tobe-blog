import { Box, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { EOperationName } from '../../../../global/enums.ts';
import {
  GeneralCardData,
  Operation,
} from '../../../../global/types';
import DomainService from '../../../../services/DomainService';
import GeneralCardView from './GeneralCardView';
import GeneralContentListPageFunctionBar from './GeneralContentListPageFunctionBar';

export default function GeneralContentListPage(props: {
  domainService: DomainService;
  pageTitle: string;
  detailPageURL: string;
  createPageURL: string;
  dataConverter?: (d: any[]) => GeneralCardData[];
}) {
  const DEFAULT_PAGE_SIZE: number = 16;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [data, setData] = useState<GeneralCardData[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [status, setStatus] = useState<string>("");

  const loadData = (): void => {
    props.domainService
      .get(DEFAULT_PAGE_SIZE, current + 1, '', status)
      .then((response) => {
        setData(data.concat(response.data.records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .catch(() => {
        enqueueSnackbar(t('contents-page.msg.error'), {
          variant: 'error',
        });
      });
  };

  const handleFilterChange = (v: string): void => {
    setData([]);
    setStatus(v);
    setCurrent(0);
    setTotalPage(1); 
  }
  
  useEffect(() => {
    loadData();
  }, [status]);
  
  function releaseById(id: number | string) {
    setOpenLoading(true);
    props.domainService
      .releaseById(id)
      .then((response) => {
        setData(
          data.map((d) => {
            if (d.id === id) {
              d.publicToAll = response.data.publicToAll;
            }
            return d;
          }),
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }
  
  function deleteById(id: number | string) {
    setOpenLoading(true);
    props.domainService
      .deleteById(id)
      .then(() => {
        setData(data.filter((d) => d.id !== id));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }
  
  const operations: Operation[] = [
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
      />
      <Box sx={{ mb: 1, width: "100%" }}>
        <Tabs value={status} onChange={(_,v: string) => handleFilterChange(v)}>
          <Tab disableRipple label={t("contents-page.filter.all")} value="" />
          <Tab disableRipple label={t("contents-page.filter.published")} value="PUBLISHED" />
          <Tab disableRipple label={t("contents-page.filter.draft")} value="DRAFT" />
        </Tabs>
      </Box>
      <GeneralCardView
        loading={openLoading}
        current={current}
        totalPage={totalPage}
        loadMore={loadData}
        data={props.dataConverter ? props.dataConverter.call(null, data) : data}
        operations={operations}
        onClick={(id: number | string) =>
          navigate(props.detailPageURL.replace(':id', id.toString()))
        }
      />
    </Page>
  );
}
