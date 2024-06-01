import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { TagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { VocabularyService } from '../../../../services';
import { MultipleTagSelecter } from '../../../components';

export default function VocabularyCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleCreation(data);
  };
  
  function handleCreation(data: FormData): void {
    setOpenLoading(true);
    VocabularyService.create({
      title: data.get('title')?.toString() || '',
      description: data.get('description')?.toString() || '',
      language: data.get('language')?.toString() || '',
      tags: tagValue,
    })
      .then((response) => {
        enqueueSnackbar(t('vocabulary-creation-page.msg.success'), {
          variant: 'success',
        });
        navigate(URL.VOCABULARIES);
      })
      .catch(() => {
        enqueueSnackbar(t('vocabulary-creation-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={t('vocabulary-creation-page.page-main-title')}
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
                id="title"
                name="title"
                label={t('vocabulary-creation-page.fields.title')}
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
                id="language"
                name="language"
                label={t('vocabulary-creation-page.fields.language')}
                fullWidth
                autoComplete="language"
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
                label={t('vocabulary-creation-page.fields.description')}
                fullWidth
                autoComplete="description"
                variant="standard"
                multiline
                maxRows={2}
                minRows={2}
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <Button
                onClick={() => window.history.back()}
                sx={{ mt: 3, ml: 1 }}
              >
                {t('vocabulary-creation-page.back-btn')}
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 3, ml: 1 }}
              >
                {t('vocabulary-creation-page.submit-btn')}
              </Button>
            </Box>
          </Grid>
        </Box>
      </Paper>
    </Page>
  );
}
