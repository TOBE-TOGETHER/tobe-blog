import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Tooltip } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useCommonUtils } from '../../../commons';

export default function InfoIconButton(props: Readonly<{ onClick: MouseEventHandler }>) {
  const { t } = useCommonUtils();
  return (
    <Tooltip title={t('components.info-icon-button.tooltip')}>
      <IconButton onClick={props.onClick}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
} 