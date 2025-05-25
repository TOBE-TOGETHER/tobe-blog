import { Paper } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommonUtils } from '../../../../commons';
import { WordListPanel } from '../../../../components/common/word/WordListPanel';
import { IVocabularyDetailDTO, IVocabularyUpdateDTO } from '../../../../global/types';
import { useCommonContentState } from '../commons';
import BaseContentPage from '../components/ContentPage';
import { VocabularyService } from '../UserContentService';
import VOCEditMainSection from './components/VOCEditMainSection';

export default function VOCDetailPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const { id } = useParams();
  const [vocabulary, setVocabulary] = useState<IVocabularyDetailDTO | null>(null);
  const [language, setLanguage] = useState<string>('');
  const { loading, setLoading, editable, setEditable, title, setTitle, description, setDescription, coverImgUrl, setCoverImgUrl, tagValues, setTagValues, topic, setTopic } =
    useCommonContentState();

  const loadData = useCallback(
    (vocabularyId: string): void => {
      setLoading(true);
      VocabularyService.getById(vocabularyId)
        .then(response => {
          setVocabulary(response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setLanguage(response.data.language);
          setCoverImgUrl(response.data.coverImgUrl);
          setTagValues(response.data.tags);
          setTopic(response.data.topic);
        })
        .catch(() => {
          enqueueSnackbar(t('vocabulary-detail-page.msg.error'), {
            variant: 'error',
          });
        })
        .finally(() => setLoading(false));
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => loadData(id ?? ''), [id, loadData]);

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
        title: title,
        description: description,
        language: language,
        coverImgUrl: coverImgUrl,
        tags: tagValues,
        topic: topic,
      });
    }
    setEditable(!editable);
  };

  function handleUpdate(updateDTO: IVocabularyUpdateDTO): void {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }

  return vocabulary ? (
    <BaseContentPage
      loading={loading}
      id={id}
      title={title}
      editable={editable}
      handleEditableChange={handleEditableChange}
      service={VocabularyService}
      contentData={vocabulary}
      onVisibilityChange={() => loadData(id ?? '')}
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
        topic={topic}
        setTopic={setTopic}
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
    </BaseContentPage>
  ) : (
    <></>
  );
}
