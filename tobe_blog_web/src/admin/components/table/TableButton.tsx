import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export function getButtonByOperationName(name: string, handleOnClick: () => void, key?: string | number): ReactNode {
  switch (name) {
    case 'detail':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="info"
          variant="text"
          label={'components.standard-button.detail'}
        />
      );
    case 'delete':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="error"
          variant="text"
          label={'components.standard-button.delete'}
        />
      );
    case 'release':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="warning"
          variant="text"
          label={'components.standard-button.release'}
        />
      );
    case 'ban':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="error"
          variant="text"
          label={'components.standard-button.ban'}
        />
      );
    case 'recommend':
      return (
        <TableButton
          handleOnClick={handleOnClick}
          key={key}
          color="success"
          variant="text"
          label={'components.standard-button.recommend'}
        />
      );
  }
}

interface ITableButtonProps {
  label: string;
  handleOnClick: () => void;
  color?: 'info' | 'success' | 'error' | 'warning' | 'primary' | 'secondary' | 'inherit';
  variant?: 'text' | 'outlined' | 'contained';
}

export const TableButton = (props: ITableButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      color={props?.color ?? 'info'}
      onClick={props?.handleOnClick}
      variant={props?.variant ?? 'text'}
    >
      {t(props.label)}
    </Button>
  );
};
