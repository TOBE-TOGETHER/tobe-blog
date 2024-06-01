import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSnackbar } from 'notistack';
import {
  Fragment,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { TagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { ProjectService } from '../../../../services';
import { MultipleTagSelecter } from '../../../components';

export default function ProjectCreationPage() {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [fromTime, setFromTime] = useState<never>(null);
  const [toTime, setToTime] = useState<never>(null);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validateForm(data)) {
      return;
    }
    handleProjectCreation(data);
  };
  
  function validateForm(data: FormData): boolean {
    if (!data.get('projectName')) {
      warn(t('project-creation-page.msg.warning.name-empty'));
      return false;
    }
    if (!fromTime) {
      warn(t('project-creation-page.msg.warning.target-start-time-empty'));
      return false;
    }
    if (!toTime) {
      warn(t('project-creation-page.msg.warning.target-end-time-empty'));
      return false;
    }
    // if (fromTime?.time.getTime() > toTime?.time.getTime()) {
    //   warn(
    //     t('project-creation-page.msg.warning.target-invalid-start-end-time'),
    //   );
    //   return false;
    // }
    
    return true;
  }
  
  function warn(msg: string): void {
    enqueueSnackbar(msg, {
      variant: 'warning',
    });
  }
  
  function handleProjectCreation(data: FormData): void {
    setOpenLoading(true);
    ProjectService.create({
      name: data.get('projectName')?.toString() || '',
      description: data.get('description')?.toString() || '',
      targetStartTime: fromTime,
      targetEndTime: toTime,
      tags: tagValue,
    })
      .then((response) => {
        enqueueSnackbar(t('project-creation-page.msg.success'), {
          variant: 'success',
        });
        navigate(URL.PROJECTS);
      })
      .catch(() => {
        enqueueSnackbar(t('project-creation-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={t('project-creation-page.form-title')}
    >
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          {
            <Fragment>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    required
                    id="projectName"
                    name="projectName"
                    label={t('project-creation-page.fields.name')}
                    fullWidth
                    autoComplete="name"
                    variant="standard"
                  />
                </Grid>
                
                <Grid
                  item
                  xs={6}
                >
                  <DatePicker
                    disablePast={true}
                    label={t('project-creation-page.fields.target-start-time')}
                    value={fromTime}
                    onChange={(newValue) => setFromTime(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <DatePicker
                    disablePast={true}
                    label={t('project-creation-page.fields.target-end-time')}
                    value={toTime}
                    onChange={(newValue) => setToTime(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    id="description"
                    name="description"
                    label={t('project-creation-page.fields.description')}
                    fullWidth
                    autoComplete="description"
                    variant="standard"
                    multiline
                    maxRows={4}
                    minRows={4}
                  />
                </Grid>
                
                <Grid
                  item
                  xs={12}
                >
                  <MultipleTagSelecter
                    value={tagValue}
                    setValue={setTagValue}
                  />
                </Grid>
              </Grid>
            </Fragment>
          }
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => window.history.back()}
              sx={{ mt: 3, ml: 1 }}
            >
              {t('project-creation-page.back-btn')}
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
            >
              {t('project-creation-page.submit-btn')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Page>
  );
}
