import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommonUtils } from '../../../../commons';
import { IArticleUpdateDTO, IArticleDetailDTO } from '../../../../global/types';
import { useCommonContentState } from '../commons';
import BaseContentPage from '../components/ContentPage';
import { ArticleService } from '../UserContentService';
import ArticleEditMainSection from './components/ArticleEditMainSection';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { t, enqueueSnackbar } = useCommonUtils();
  const [htmlValue, setHtmlValue] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [contentProtected, setContentProtected] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<IArticleDetailDTO | null>(null);
  const { loading, setLoading, editable, setEditable, title, setTitle, coverImgUrl, setCoverImgUrl, tagValues, setTagValues, topic, setTopic } = useCommonContentState();

  const loadData = useCallback((): void => {
    if (!id) {
      return window.history.back();
    }
    setLoading(true);
    ArticleService.getById(id)
      .then(response => {
        const data = response.data;
        setArticleData(data);
        setHtmlValue(data.content);
        setTitle(data.title);
        setSubTitle(data.subTitle);
        setCoverImgUrl(data.coverImgUrl);
        setTagValues(data.tags);
        setContentProtected(data.contentProtected);
        setTopic(data.topic);
      })
      .catch(() => {
        enqueueSnackbar(t('article-creation-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [id, enqueueSnackbar, t]);

  useEffect(() => loadData(), [loadData]);

  function saveArticle(updateDTO: IArticleUpdateDTO): void {
    setLoading(true);
    ArticleService.update(updateDTO)
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        // Reload data to get updated statistics
        loadData();
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }

  const handleEditableChange = () => {
    if (!id) {
      return;
    }
    if (!title) {
      return;
    }
    if (editable) {
      saveArticle({
        id: id,
        title: title,
        subTitle: subTitle,
        coverImgUrl: coverImgUrl,
        content: htmlValue,
        description: textValue.trim().length >= 500 ? textValue.trim().substring(0, 497) + '...' : textValue.trim(),
        tags: tagValues,
        contentProtected: contentProtected,
        topic: topic,
      });
    }
    setEditable(!editable);
  };

  return (
    <BaseContentPage
      loading={loading}
      title={title}
      id={id}
      editable={editable}
      handleEditableChange={handleEditableChange}
      service={ArticleService}
      contentData={articleData}
      onVisibilityChange={loadData}
    >
      <ArticleEditMainSection
        title={title}
        setTitle={setTitle}
        subTitle={subTitle}
        setSubTitle={setSubTitle}
        coverImgUrl={coverImgUrl}
        setCoverImgUrl={setCoverImgUrl}
        tagValues={tagValues}
        setTagValues={setTagValues}
        contentProtected={contentProtected}
        setContentProtected={setContentProtected}
        htmlValue={htmlValue}
        setHtmlValue={setHtmlValue}
        setTextValue={setTextValue}
        editable={editable}
        description={''}
        setDescription={() => {}}
        topic={topic}
        setTopic={setTopic}
      />
    </BaseContentPage>
  );
}
