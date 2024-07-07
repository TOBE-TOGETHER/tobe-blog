import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export function getButtonByOperationName(name: string, handleOnClick: () => void, key?: string | number | undefined): ReactNode {
  const { t } = useTranslation();
  switch (name) {
    case 'detail':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="info"
          variant="text"
          label={t('components.standard-button.detail')}
        />
      );
    case 'delete':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="error"
          variant="text"
          label={t('components.standard-button.delete')}
        />
      );
    case 'release':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="warning"
          variant="text"
          label={t('components.standard-button.release')}
        />
      );
    case 'ban':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="error"
          variant="text"
          label={t('components.standard-button.ban')}
        />
      );
    case 'recommend':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="success"
          variant="text"
          label={t('components.standard-button.recommend')}
        />
      );
  }
}

interface ITableButtonProps {
  label?: string | undefined;
  handleOnClick?: () => void | undefined;
  color?: 'info' | 'success' | 'error' | 'warning' | 'primary' | 'secondary' | 'inherit' | undefined;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
}

export const TableButton = (props: ITableButtonProps) => {
  return (
    <Button
      color={props?.color || 'info'}
      onClick={props?.handleOnClick}
      variant={props?.variant || 'text'}
    >
      {props?.label}
    </Button>
  );
};
