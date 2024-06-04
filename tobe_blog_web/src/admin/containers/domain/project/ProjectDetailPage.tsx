import {
  Box,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSnackbar } from 'notistack';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import {
  ProjectInfo,
  ProjectUpdateDTO,
  TagOption,
} from '../../../../global/types';
import { ProjectService } from '../../../../services';
import {
  EditIconButton,
  MultipleTagSelector,
} from '../../../components';
import ProjectProgressModal from './component/ProjectProgressModal';
import ProjectStatusToolbar from './component/ProjectStatusToolbar';

export default function ProjectDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [editable, setEditable] = useState<boolean>(false);
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  
  const loadData = useCallback(
    (id: string): void => {
      setOpenLoading(true);
      ProjectService.getById(id)
        .then((response) => {
          setProject(response.data);
          setFromTime(new Date(response.data.targetStartTime));
          setToTime(new Date(response.data.targetEndTime));
          setDescription(response.data.description);
          setTagValue(response.data.tags);
        })
        .catch(() => {
          enqueueSnackbar(t('project-detail-page.msg.error'), {
            variant: 'error',
          });
        })
        .finally(() => setOpenLoading(false));
    },
    [
      enqueueSnackbar,
      t,
    ],
  );
  
  useEffect(() => loadData(id || ''), [
    loadData,
    id,
  ]);
  
  function handleProjectUpdate(updatedProject: ProjectUpdateDTO): void {
    setOpenLoading(true);
    ProjectService.update(updatedProject)
      .then((response) => {
        enqueueSnackbar(t('project-detail-page.msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('project-detail-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }
  
  const handleEditableChange = () => {
    if (!project) {
      return;
    }
    if (editable) {
      handleProjectUpdate({
        id: project.id,
        name: project.name,
        description: description || '',
        targetStartTime: fromTime,
        targetEndTime: toTime,
        tags: tagValue,
      });
    }
    setEditable(!editable);
  };
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={project?.name}
    >
      {project && (
        <Grid
          container
          sx={{ m: 0, p: { xs: 0.5, md: 1 } }}
          alignItems="center"
        >
          <Grid
            item
            flexGrow={1}
          >
            <ProjectStatusToolbar project={project} />
          </Grid>
          <Grid
            item
            flexGrow={0}
          >
            <EditIconButton
              editable={editable}
              handleEditableChange={handleEditableChange}
            />
          </Grid>
        </Grid>
      )}
      <Paper
        variant="outlined"
        sx={{ my: 0, p: { xs: 2, md: 3 } }}
      >
        <Box
          component="form"
          noValidate
        >
          {project && (
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  id="description"
                  name="description"
                  label={t('project-detail-page.fields.description')}
                  fullWidth
                  autoComplete="description"
                  variant="standard"
                  multiline
                  minRows={3}
                  maxRows={20}
                  disabled={!editable}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={3}
              >
                <Grid
                  item
                  xs={6}
                >
                  <DatePicker
                    label={t('project-detail-page.fields.target-start-time')}
                    value={fromTime}
                    onChange={(newValue) => setFromTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard"
                                 fullWidth
                      />
                    )}
                    disabled={!editable}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <DatePicker
                    label={t('project-detail-page.fields.target-end-time')}
                    value={toTime}
                    onChange={(newValue) => setToTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard"
                                 fullWidth
                      />
                    )}
                    disabled={!editable}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <MultipleTagSelector
                  value={tagValue}
                  setValue={setTagValue}
                  disabled={!editable}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
      {id && <ProjectProgressModal
        projectId={id}
        viewOnly={false}
      />}
    </Page>
  );
}
