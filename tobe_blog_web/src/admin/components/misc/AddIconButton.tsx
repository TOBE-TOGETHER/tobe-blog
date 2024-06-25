import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function AddIconButton(props: { onClick: () => void }) {
  return (
    <Button
      onClick={props.onClick}
      sx={{
        border: '1px solid rgba(0,0,0,0.12)',
        color: 'rgba(0,0,0,0.4)',
      }}
    >
      <Add />
    </Button>
  );
}
