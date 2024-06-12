import { useSnackbar } from 'notistack';
import {
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
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
  const loadData = (): void => {
    setOpenLoading(true);
    props.domainService
      .get(DEFAULT_PAGE_SIZE, current, '')
      .then((response) => {
        setData(data.concat(response.data.records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .catch(() => {
        enqueueSnackbar(t('domain-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setOpenLoading(false);
      });
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
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
      name: 'release',
      onClick: (id: number | string) => releaseById(id),
      hide: (data: any) => data.publicToAll,
    },
    {
      name: 'delete',
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
