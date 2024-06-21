import {
  Grid,
  Paper,
  TextField
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { TagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { VocabularyService } from '../../../../services';
import { MultipleTagSelecter, SaveButtonPanel } from '../../../components';

export default function VOCCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [language, setLanguage] = useState<string>();
  
  function handleCreation(): void {
    setOpenLoading(true);
    VocabularyService.create({
      title: title,
      description: description,
      language: language,
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
        sx={{ mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
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
                label={t('vocabulary-creation-page.fields.title')}
                fullWidth
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                label={t('vocabulary-creation-page.fields.language')}
                fullWidth
                onChange={e => setLanguage(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                label={t('vocabulary-creation-page.fields.description')}
                fullWidth
                onChange={e => setDescription(e.target.value)}
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
          </Grid>
      </Paper>
      <SaveButtonPanel primaryEvent={handleCreation}/>
    </Page>
  );
}
