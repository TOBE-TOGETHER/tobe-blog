import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, Tooltip } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useCommonUtils } from '../../../commons';

export default function EditIconButton(props: Readonly<{ editable: boolean; handleEditableChange: MouseEventHandler }>) {
  const { t } = useCommonUtils();
  return (
    <Tooltip title={props.editable ? t('components.edit-icon-button.save') : t('components.edit-icon-button.edit')}>
      <IconButton onClick={props.handleEditableChange}>{props.editable ? <SaveIcon /> : <EditIcon />}</IconButton>
    </Tooltip>
  );
}
