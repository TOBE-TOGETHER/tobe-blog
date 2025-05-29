import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { useCommonUtils } from '../../../../commons';
import { IBaseUserContentDTO } from '../../../../global/types';
import { EditIconButton, InfoIconButton } from '../../../components';
import BaseContentService from '../BaseContentService';
import ContentStatsDrawer from './ContentStatsDrawer';
import { VisibilitySwitch } from './VisibilitySwitch';

export default function ComtentEditBar(props: Readonly<{ 
  id: string | undefined; 
  editable: boolean; 
  handleEditableChange: () => void; 
  service: BaseContentService;
  onVisibilityChange?: () => void;
  contentData?: IBaseUserContentDTO | null;
}>) {
  const { navigate } = useCommonUtils();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInfoClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleContentDeleted = () => {
    // Content was deleted, navigate back
    navigate(-1);
  };

  return (
    <>
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
        {props.contentData && (
          <Grid
            item
            flexGrow={0}
          >
            <InfoIconButton onClick={handleInfoClick} />
          </Grid>
        )}
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

      <ContentStatsDrawer
        content={props.contentData || null}
        open={drawerOpen}
        onClose={handleDrawerClose}
        service={props.service}
        onDelete={handleContentDeleted}
      />
    </>
  );
}
