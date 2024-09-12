import { Grid } from '@mui/material';
import { EditIconButton } from '../../../components';

export default function ComtentEditBar(props: Readonly<{ editable: boolean; handleEditableChange: () => void }>) {
  return (
    <Grid
      container
      sx={{ m: 0, p: { xs: 0.5, md: 1 } }}
      alignItems="center"
    >
      <Grid
        item
        flexGrow={1}
      ></Grid>
      <Grid
        item
        flexGrow={0}
      >
        <EditIconButton
          editable={props.editable}
          handleEditableChange={props.handleEditableChange}
        />
      </Grid>
    </Grid>
  );
}
