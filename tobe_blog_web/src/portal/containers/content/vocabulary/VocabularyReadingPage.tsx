import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { WordListPanel } from '../../../../components/common/word/WordListPanel';
import { IVocabularyDetailDTO } from '../../../../global/types';
import { URL } from '../../../../routes';
import * as PublicDataService from '../../../../services/PublicDataService';
import ContentReadingPage from '../ContentReadingPage';

export default function VocabularyReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [vocabulary, setVocabulary] = useState<IVocabularyDetailDTO | null>(null);

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
      content={vocabulary}
      subTitle={vocabulary?.description}
      editLinkUrlPrefix={URL.VOCABULARY_DETAIL}
    >
      {vocabulary && (
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
