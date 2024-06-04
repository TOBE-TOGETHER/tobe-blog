import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import theme from '../../../theme';

export default function AddIconButton(props: { onClick: () => void }) {
  return (
    <Button
      onClick={props.onClick}
      variant="outlined"
      sx={{
        border: "1px solid rgba(0,0,0,0.12)",
        color: "rgba(0,0,0,0.4)",
        backgroundColor: theme.palette.common.white,
      }}
    >
      <Add />
    </Button>
  );
}
