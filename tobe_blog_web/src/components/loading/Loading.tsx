import { Backdrop } from '@mui/material';
import LoadingIcon from './LoadingIcon';
interface Props {
  open: boolean | undefined;
}

export default function Loading(props: Readonly<Props>) {
  return (
    <Backdrop
      sx={{
        color: theme => theme.palette.primary.light,
        zIndex: theme => theme.zIndex.drawer + 1,
      }}
      open={props.open || false}
    >
      <LoadingIcon />
    </Backdrop>
  );
}
