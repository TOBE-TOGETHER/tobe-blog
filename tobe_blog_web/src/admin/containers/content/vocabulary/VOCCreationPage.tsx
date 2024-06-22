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
import { MultipleTagSelecter, OneRow, SaveButtonPanel } from '../../../components';

export default function VOCCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  
  function handleCreation(): void {
    setOpenLoading(true);
    VocabularyService.create({
      title: title,
      description: description,
      language: language,
      coverImgUrl: coverImgUrl,
      tags: tagValue,
    })
      .then(() => {
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
            <OneRow>
              <TextField
                label={t('vocabulary-creation-page.fields.title')}
                fullWidth
                onChange={e => setTitle(e.target.value)}
              />
            </OneRow>
            <OneRow>
              <TextField
                label={t('vocabulary-creation-page.fields.language')}
                fullWidth
                onChange={e => setLanguage(e.target.value)}
              />
            </OneRow>
            <OneRow>
              <TextField
                label={t('vocabulary-creation-page.fields.description')}
                fullWidth
                onChange={e => setDescription(e.target.value)}
                multiline
                maxRows={2}
                minRows={2}
              />
            </OneRow>
            <OneRow>
              <TextField
                label={t('vocabulary-creation-page.fields.cover-img-url')}
                fullWidth
                onChange={e => setCoverImgUrl(e.target.value)}
                />
            </OneRow>
            <OneRow>
              <MultipleTagSelecter
                value={tagValue}
                setValue={setTagValue}
              />
            </OneRow>
          </Grid>
      </Paper>
      <SaveButtonPanel primaryEvent={handleCreation}/>
    </Page>
  );
}
