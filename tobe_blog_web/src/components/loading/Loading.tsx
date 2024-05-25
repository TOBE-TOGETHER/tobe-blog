import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  open: boolean | undefined;
}

/**
 * Loading component, used when process a async request
 *
 * ’加载中‘组件，
 */
export default function Loading(props: Props) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open || false}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
