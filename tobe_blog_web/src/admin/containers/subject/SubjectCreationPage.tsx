import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  FormEvent,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../components/layout';
import { URL } from '../../../routes';
import { SubjectService } from '../../../services';

export default function SubjectCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get('subjectName')) {
      enqueueSnackbar(t('subject-creation-page.msg.warning.name-empty'), {
        variant: 'warning',
      });
      return;
    }
    handleCreation(data);
  };
  
  function handleCreation(data: FormData): void {
    setOpenLoading(true);
    SubjectService.create({
      name: data.get('subjectName')?.toString() || '',
      description: data.get('description')?.toString() || '',
      coverImgUrl: data.get('coverImgUrl')?.toString() || '',
    })
      .then(() => {
        enqueueSnackbar(t('subject-creation-page.msg.success'), {
          variant: 'success',
        });
        navigate(URL.SUBJECTS);
      })
      .catch(() => {
        enqueueSnackbar(t('subject-creation-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={t('subject-creation-page.page-main-title')}
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
                id="subjectName"
                name="subjectName"
                label={t('subject-creation-page.fields.name')}
                fullWidth
                autoComplete="name"
                variant="standard"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                id="coverImgUrl"
                name="coverImgUrl"
                label={t('subject-creation-page.fields.cover-img-url')}
                fullWidth
                autoComplete="coverImgUrl"
                variant="standard"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                id="description"
                name="description"
                label={t('subject-creation-page.fields.description')}
                fullWidth
                autoComplete="description"
                variant="standard"
                multiline
                maxRows={2}
                minRows={2}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => window.history.back()}
              sx={{ mt: 3, ml: 1 }}
            >
              {t('subject-creation-page.back-btn')}
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
            >
              {t('subject-creation-page.submit-btn')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Page>
  );
}
