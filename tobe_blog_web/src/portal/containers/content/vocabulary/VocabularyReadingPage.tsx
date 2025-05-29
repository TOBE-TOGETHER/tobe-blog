import { Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommonUtils } from '../../../../commons';
import { WordListPanel, SEOHead } from '../../../../components';
import { IVocabularyDetailDTO } from '../../../../global/types';
import { useSEO } from '../../../../hooks';
import { URL } from '../../../../routes';
import * as PublicDataService from '../../../../services/PublicDataService';
import ContentReadingPage from '../ContentReadingPage';

export default function VocabularyReadingPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const { id } = useParams();
  const [vocabulary, setVocabulary] = useState<IVocabularyDetailDTO | null>(null);

  const loadData = useCallback((): void => {
    PublicDataService.getVocabularyById(id ?? '')
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

  // Use SEO Hook
  const seoData = useSEO({
    content: vocabulary,
    contentType: 'vocabulary',
  });

  return (
    <>
      {seoData && <SEOHead {...seoData} />}
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
    </>
  );
}
