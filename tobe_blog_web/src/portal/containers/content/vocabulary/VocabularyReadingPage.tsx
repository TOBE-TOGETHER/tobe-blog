import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { WordListPanel } from '../../../../admin/components';
import { IVocabularyDetailDTO } from '../../../../global/types';
import { URL } from '../../../../routes';
import { PublicDataService } from '../../../../services';
import { ContentReadingPage } from '../ContentReadingPage';

export default function VocabularyReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [vocabualry, setVocabulary] = useState<IVocabularyDetailDTO | null>(null);

  const loadData = useCallback((): void => {
    PublicDataService.getVocabularyById(id || '')
      .then(response => {
        setVocabulary(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t('article-reading-page.msg.error'), {
          variant: 'error',
        });
      });
  }, [enqueueSnackbar, t, id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ContentReadingPage
      content={vocabualry}
      editLinkUrlPrefix={URL.VOCABULARY_DETAIL}
    >
      {vocabualry && (
        <Grid
          item
          xs={12}
          sx={{ my: 1 }}
        >
          {id && (
            <WordListPanel
              editable={false}
              vocabularyId={id}
            />
          )}
        </Grid>
      )}
    </ContentReadingPage>
  );
}
