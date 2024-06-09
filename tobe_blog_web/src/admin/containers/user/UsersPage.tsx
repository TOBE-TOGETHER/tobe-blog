import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '../../../components/layout';
import { Column, Operation, UserData } from '../../../global/types';
import { UserService } from '../../../services';
import { PagedTable } from '../../components';

export default function UsersPage() {
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [rows, setRows] = useState<UserData[]>([]);
  const [openLoading, setOpenLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { t } = useTranslation();

  const loadUserData = useCallback((): void => {
    setOpenLoading(true);
    UserService.getUsers(size, current)
      .then(response => {
        setRows(response.data.records || []);
        setTotalCount(response.data.total);
        setOpenLoading(true);
      })
      .finally(() => {
        setOpenLoading(false);
      });
  }, [current, size]);

  useEffect(() => loadUserData(), [loadUserData]);

  const columns: readonly Column[] = [
    { id: 'id', label: t('user-table.label.id'), align: 'center' },
    { id: 'email', label: t('user-table.label.email') },
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
      align: 'center',
    },
  ];

  function deleteUserDate(id: number | string) {
    setOpenLoading(true);
    UserService.deleteUser(id)
      .then(() => {
        setOpenLoading(true);
        loadUserData();
      })
      .catch(error => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  const handleChangeCurrent = (event: unknown, newPage: number): void => {
    setCurrent(newPage);
  };

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSize(+event.target.value);
    setCurrent(0);
  };

  const handleDelete = (id: number | string): void => {
    deleteUserDate(id);
  };

  const operations: Operation[] = [
    {
      name: 'delete',
      onClick: (id: number | string) => handleDelete(id),
    },
  ];

  return (
    <Page
      pageTitle={t('user-table.title')}
      openLoading={openLoading}
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
