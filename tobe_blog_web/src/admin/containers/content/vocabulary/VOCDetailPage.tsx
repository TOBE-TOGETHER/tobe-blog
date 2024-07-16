import { Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { WordListPanel } from '../../../../components/common/word/WordListPanel';
import { Page } from '../../../../components/layout';
import { ITagOption, IVocabularyDetailDTO, IVocabularyUpdateDTO } from '../../../../global/types';
import { VocabularyService } from '../UserContentService';
import ContentEditBar from '../components/ContentEditBar';
import VOCEditMainSection from './components/VOCEditMainSection';

export default function VOCDetailPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [editable, setEditable] = useState<boolean>(false);
  const [vocabulary, setVocabulary] = useState<IVocabularyDetailDTO | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(null);
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);

  const loadData = useCallback(
    (vocabularyId: string): void => {
      VocabularyService.getById(vocabularyId)
        .then(response => {
          setVocabulary(response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setLanguage(response.data.language);
          setCoverImgUrl(response.data.coverImgUrl);
          setTagValues(response.data.tags);
        })
        .catch(() => {
          enqueueSnackbar(t('vocabulary-detail-page.msg.error'), {
            variant: 'error',
          });
        });
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => loadData(id || ''), [id, loadData]);

  const handleEditableChange = () => {
    if (!vocabulary) {
      return;
    }
    if (!title) {
      return;
    }
    if (editable) {
      handleUpdate({
        id: vocabulary.id,
        title: title || '',
        description: description || '',
        language: language || '',
        coverImgUrl: coverImgUrl || '',
        tags: tagValues,
      });
    }
    setEditable(!editable);
  };

  function handleUpdate(updateDTO: IVocabularyUpdateDTO): void {
    VocabularyService.update(updateDTO)
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      });
  }

  return vocabulary ? (
    <Page
      openLoading={false}
      pageTitle={title || ''}
    >
      <ContentEditBar
        editable={editable}
        handleEditableChange={handleEditableChange}
      />
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
        editable={editable}
      />
      {id && (
        <Paper sx={{ my: 1, p: { xs: 2, md: 3 }, borderRadius: 4, overflow: 'hidden' }}>
          <WordListPanel
            editable={true}
            vocabularyId={id}
          />
        </Paper>
      )}
    </Page>
  ) : (
    <></>
  );
}
