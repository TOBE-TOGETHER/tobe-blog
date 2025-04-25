import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Grid, IconButton } from '@mui/material';
import { EditIconButton } from '../../../components';
import BaseContentService from '../BaseContentService';
import { VisibilitySwitch } from './VisibilitySwitch';

export default function ComtentEditBar(props: Readonly<{ id: string | undefined; editable: boolean; handleEditableChange: () => void; service: BaseContentService }>) {
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
        <IconButton onClick={() => window.history.back()}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        flexGrow={0}
      >
        <VisibilitySwitch
          id={props.id}
          service={props.service}
        />
      </Grid>
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
