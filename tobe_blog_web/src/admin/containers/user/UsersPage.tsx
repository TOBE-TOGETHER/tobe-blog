import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useCommonUtils } from '../../../commons/index.ts';
import { Page } from '../../../components/layout';
import { EColumnPosition, EOperationName } from '../../../global/enums.ts';
import { IColumn, IOperation, IUserData } from '../../../global/types';
import * as UserService from '../../../services/UserService.ts';
import { PagedTable } from '../../components';

export default function UsersPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [rows, setRows] = useState<IUserData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const loadUserData = useCallback((): void => {
    UserService.getUsers(size, current)
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

  useEffect(() => loadUserData(), [loadUserData]);

  const columns: IColumn[] = [
    {
      id: 'id',
      label: t('user-table.label.id'),
      align: EColumnPosition.CENTER,
    },
    {
      id: 'email',
      label: t('user-table.label.email'),
    },
    {
      id: 'username',
      label: t('user-table.label.username'),
    },
    {
      id: 'firstName',
      label: t('user-table.label.first-name'),
    },
    {
      id: 'lastName',
      label: t('user-table.label.last-name'),
    },
    {
      id: 'phoneNum',
      label: t('user-table.label.phone-number'),
    },
    {
      id: 'operation',
      label: t('user-table.label.operation'),
      align: EColumnPosition.CENTER,
    },
  ];

  function deleteUserDate(id: number | string) {
    UserService.deleteUser(id)
      .then(() => loadUserData())
      .catch(() => enqueueSnackbar(t('msg.error'), { variant: 'error' }));
  }

  const handleChangeCurrent = (_event: unknown, newPage: number): void => {
    setCurrent(newPage);
  };

  const handleChangeSize = (event: ChangeEvent<HTMLInputElement>): void => {
    setSize(+event.target.value);
    setCurrent(0);
  };

  const handleDelete = (id: number | string): void => {
    deleteUserDate(id);
  };

  const operations: IOperation[] = [
    {
      name: EOperationName.DELETE,
      onClick: (id: number | string) => handleDelete(id),
    },
  ];

  return (
    <Page
      pageTitle={t('user-table.title')}
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
