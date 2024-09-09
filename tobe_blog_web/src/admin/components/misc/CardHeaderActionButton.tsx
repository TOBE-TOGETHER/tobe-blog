import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IBaseUserContentDTO, IOperation } from '../../../global/types';
import Dialogx from '../Dialog/Dialogx.tsx';

export default function CardHeaderActionButton(props: Readonly<{ operations: IOperation[]; data: IBaseUserContentDTO; color?: string }>) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorRecordId, setAnchorRecordId] = React.useState<null | string>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<IOperation | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setAnchorRecordId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorRecordId(null);
  };
  const handleItemOnClick = (id: number | string, data: any, operation: IOperation) => {
    if (operation.name === 'delete') {
      setCurrentOperation(operation);
      handleClose();
      handleDialogOpen();
    } else {
      operation.onClick(id, data);
      handleClose();
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentOperation(null);
  };

  const handleDialogAction = (id: number | string, data: any, operation: IOperation) => {
    operation.onClick(id, data);
    setOpenDialog(false);
    setCurrentOperation(null);
  };

  function getMenuItem(operationName: string) {
    switch (operationName) {
      case 'release':
        return t('components.standard-button.release');
      case 'delete':
        return t('components.standard-button.delete');
      case 'detail':
        return t('components.standard-button.detail');
    }
  }
  return (
    <>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={event => handleClick(event, props.data.id)}
      >
        <MoreHoriz
          sx={{
            color: props.color,
          }}
        />
      </IconButton>
      <Menu
        open={open && props.data.id === anchorRecordId}
        onClose={handleClose}
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {props.operations?.map(
          (operation, index) =>
            !operation?.hide?.call(null, props.data) && (
              <MenuItem
                key={props.data.id + '-' + index}
                onClick={() => handleItemOnClick(props.data.id, props.data, operation)}
              >
                {getMenuItem(operation.name)}
              </MenuItem>
            )
        )}
      </Menu>
      <Dialogx
        title={t('dialog.delete.title')}
        content={t('dialog.delete.content')}
        open={openDialog}
        onClose={handleDialogClose}
        closeBtnText={t('dialog.cancel')}
        onAction={() => currentOperation && handleDialogAction(props.data.id, props.data, currentOperation)}
        actionBtnText={t('dialog.confirm')}
      />
    </>
  );
}
