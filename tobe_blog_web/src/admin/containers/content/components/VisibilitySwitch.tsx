import { Switch as NativeSwitch, styled, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../../../commons';
import BaseContentService from '../BaseContentService';

export function VisibilitySwitch(props: { 
  id: string | undefined; 
  service: BaseContentService; 
  onVisibilityChange?: () => void; 
}) {
  const { t, enqueueSnackbar } = useCommonUtils();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    loadVisibility();
  }, [props.id]);

  function loadVisibility() {
    props.service.getById(props.id ?? '').then(resp => {
      setVisible(resp.data.publicToAll);
    });
  }

  function handleVisibleChange() {
    if (!props.id) {
      return;
    }
    props.service
      .updateVisibility(props.id, visible ? 'PRIVATE' : 'PUBLIC')
      .then(resp => {
        setVisible(resp.data.publicToAll);
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        // Notify parent component that visibility has changed
        props.onVisibilityChange?.();
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      });
  }

  return (
    props.id && (
      <Tooltip title={visible ? t('components.visibility-switch.retract') : t('components.visibility-switch.release')}>
        <Switch
          checked={visible}
          onChange={handleVisibleChange}
        />
      </Tooltip>
    )
  );
}

export const Switch = styled(NativeSwitch)(({ theme }) => ({
  'padding': 8,
  '& .MuiSwitch-track': {
    'borderRadius': 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));
