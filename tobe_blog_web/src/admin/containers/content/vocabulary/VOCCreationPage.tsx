import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { ITagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { SaveButtonPanel } from '../../../components';
import { VocabularyService } from '../UserContentService';
import VOCEditMainSection from './components/VOCEditMainSection';

export default function VOCCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(null);
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);

  function handleCreation(): void {
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
      });
  }

  return (
    <Page
      openLoading={false}
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
