import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Grid, IconButton } from '@mui/material';
import { useCommonUtils } from '../../../../commons';
import { EditIconButton } from '../../../components';
import BaseContentService from '../BaseContentService';
import { VisibilitySwitch } from './VisibilitySwitch';

export default function ComtentEditBar(props: Readonly<{ 
  id: string | undefined; 
  editable: boolean; 
  handleEditableChange: () => void; 
  service: BaseContentService;
  onVisibilityChange?: () => void;
}>) {
  const { navigate } = useCommonUtils();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Grid
      container
      sx={{ m: 0, p: { xs: 0.5, md: 1 } }}
      alignItems="center"
    >
      <Grid
        item
        flexGrow={0}
      >
        <IconButton onClick={handleBackClick}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        flexGrow={1}
      ></Grid>
      
      <Grid
        item
        flexGrow={0}
      >
        <VisibilitySwitch
          id={props.id}
          service={props.service}
          onVisibilityChange={props.onVisibilityChange}
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
