import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { URL } from '../../../../routes';
import { SaveButtonPanel } from '../../../components';
import { useCommonContentState } from '../commons';
import { VocabularyService } from '../UserContentService';
import VOCEditMainSection from './components/VOCEditMainSection';

export default function VOCCreationPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [language, setLanguage] = useState<string>('');
  const { loading, setLoading, title, setTitle, description, setDescription, coverImgUrl, setCoverImgUrl, tagValues, setTagValues } = useCommonContentState();

  function handleCreation(): void {
    setLoading(true);
    VocabularyService.create({
      title: title,
      description: description,
      language: language,
      coverImgUrl: coverImgUrl,
      tags: tagValues,
    })
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        navigate(URL.VOCABULARIES);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Page
      openLoading={loading}
      pageTitle={t('vocabulary-creation-page.page-main-title')}
    >
      <VOCEditMainSection
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        language={language}
        setLanguage={setLanguage}
        coverImgUrl={coverImgUrl}
        setCoverImgUrl={setCoverImgUrl}
        tagValues={tagValues}
        setTagValues={setTagValues}
        editable={true}
        sx={{ mt: 6 }}
      />
      <SaveButtonPanel primaryEvent={handleCreation} />
    </Page>
  );
}
