import { useSnackbar } from 'notistack';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getPathFromContentType } from '../../../commons/index.ts';
import { EColumnPosition, EOperationName } from '../../../global/enums.ts';
import { IColumn, IOperation, IUserData } from '../../../global/types.ts';
import { Page, PagedTable } from '../../components/index.ts';
import * as ContentAdminService from './ContentAdminService.ts';

export default function ContentAdminPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [rows, setRows] = useState<IUserData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loadData = useCallback((): void => {
    ContentAdminService.getContents(size, current)
      .then(response => {
        setRows(response.data.records || []);
        setTotalCount(response.data.total);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      });
  }, [current, size]);

  useEffect(() => loadData(), [loadData]);

  const columns: IColumn[] = [
    {
      id: 'title',
      label: t('admin-table.label.title'),
    },
    {
      id: 'ownerName',
      label: t('admin-table.label.owner-name'),
    },
    {
      id: 'contentType',
      label: t('admin-table.label.content-type'),
    },
    {
      id: 'recommended',
      label: t('admin-table.label.recommended'),
      format: v => (v ? 'YES' : ''),
    },
    {
      id: 'banned',
      label: t('admin-table.label.banned'),
      format: v => (v ? 'YES' : ''),
    },
    {
      id: 'operation',
      label: t('admin-table.label.operation'),
      align: EColumnPosition.LEFT,
    },
  ];

  const handleChangeCurrent = (_event: unknown, newPage: number): void => {
    setCurrent(newPage);
  };

  const handleChangeSize = (event: ChangeEvent<HTMLInputElement>): void => {
    setSize(+event.target.value);
    setCurrent(0);
  };

  const handleBanContent = (id: number | string): void => {
    ContentAdminService.banContent(id + '')
      .then(() => loadData())
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      });
  };

  const handleRecommendContent = (id: number | string): void => {
    ContentAdminService.recommendContent(id + '')
      .then(() => loadData())
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      });
  };

  const operations: IOperation[] = [
    {
      name: EOperationName.DETAIL,
      onClick: (id: number | string, data: any) => navigate('/news/' + getPathFromContentType(data.contentType) + '/' + id),
    },
    {
      name: EOperationName.RECOMMEND,
      onClick: (id: number | string, _: any) => handleRecommendContent(id),
      hide: data => data.banned || data.recommended,
    },
    {
      name: EOperationName.BAN,
      onClick: (id: number | string, _: any) => handleBanContent(id),
      hide: data => data.banned,
    },
  ];

  return (
    <Page
      pageTitle={t('admin-table.title')}
      openLoading={false}
    >
      <PagedTable
        columns={columns}
        rows={rows}
        totalCount={totalCount}
        size={size}
        current={current}
        operations={operations}
        handleChangeCurrent={handleChangeCurrent}
        handleChangeSize={handleChangeSize}
        sx={{ my: 2 }}
      />
    </Page>
  );
}
