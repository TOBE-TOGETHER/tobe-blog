import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Paper, Grid, TextField, Typography } from "@mui/material";
import { ProjectProgress } from "../../../../../global/types";
import { EditIconButton } from "../../../components";
import {
  PublicDataService,
  ProjectProgressService,
} from "../../../../../services";
import { ImagesPanel } from "./ImagesPanel";
import { TimeFormat } from "../../../../../commons";

interface ProjectProgressItemProps {
  progress: ProjectProgress;
  viewOnly: boolean;
}

export default function ProjectProgressItem(props: ProjectProgressItemProps) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [progress, setProgress] = useState<ProjectProgress>(props.progress);
  const [editable, setEditable] = useState<boolean>(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [progressDesc, setProgressDesc] = useState<string>(
    props.progress.description
  );

  const handleEditableChange = () => {
    if (editable) {
      handleProgresssUpdate();
    }
    setEditable(!editable);
  };

  useEffect(() => {
    function loadImages() {
      PublicDataService.getBySrcIdAndFileType(
        props.progress.id,
        "PROJECT_PIC"
      ).then((response) => {
        let imageUrls = response.data.map(
          (f: { downloadURL: string }) => f.downloadURL
        );
        setImageURLs(imageUrls);
      });
    }
    loadImages();
  }, [props.progress.id]);

  function handleProgresssUpdate(): void {
    ProjectProgressService.updateProgress({
      id: progress.id,
      projectId: progress.projectId,
      description: progressDesc,
    })
      .then((response) => {
        enqueueSnackbar(t("project-detail-page.msg.success"), {
          variant: "success",
        });
        setProgress(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t("project-detail-page.msg.error"), {
          variant: "error",
        });
      });
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        py: 2,
        px: { sm: 2, xs: 0 },
        borderWidth: { xs: "0px", sm: "1px" },
        borderBottomWidth: { xs: "1px" },
      }}
    >
      <Grid container item xs={12}>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="text.secondary" variant="body2">
            {TimeFormat.dateFormat(progress.createTime)}{" "}
            {TimeFormat.timeFormat(progress.createTime)}
          </Typography>
          {!props.viewOnly && (
            <EditIconButton
              editable={editable}
              handleEditableChange={handleEditableChange}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {!props.viewOnly ? (
            <TextField
              fullWidth
              variant="standard"
              multiline
              minRows={2}
              maxRows={20}
              disabled={!editable}
              value={progressDesc}
              onChange={(event) => setProgressDesc(event.target.value)}
            />
          ) : (
            <Typography color="text.secondary" variant="body2">
              {progressDesc}
            </Typography>
          )}
        </Grid>
        <ImagesPanel keyProfix={props.progress.id} imageURLs={imageURLs} />
      </Grid>
    </Paper>
  );
}
