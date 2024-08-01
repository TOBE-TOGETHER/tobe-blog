import { Grid } from '@mui/material';
import { AddIconButton } from '../../../components';

export default function GeneralContentListPageFunctionBar(props: Readonly<{ createNewAction: () => void }>) {
  return (
    <Grid
      container
      sx={{ py: 1 }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <AddIconButton onClick={props.createNewAction} />
      </Grid>
    </Grid>
  );
}
