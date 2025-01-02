import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { IArticleUpdateDTO, ITagOption } from '../../../../global/types';
import ContentEditBar from '../components/ContentEditBar';
import { ArticleService } from '../UserContentService';
import ArticleEditMainSection from './components/ArticleEditMainSection';

export default function ArticleDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [htmlValue, setHtmlValue] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [contentProtected, setContentProtected] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const loadData = useCallback((): void => {
    if (!id) {
      return window.history.back();
    }
    setLoading(true);
    ArticleService.getById(id)
      .then(response => {
        setHtmlValue(response.data.content);
        setTitle(response.data.title);
        setSubTitle(response.data.subTitle);
        setCoverImgUrl(response.data.coverImgUrl);
        setTagValues(response.data.tags);
        setContentProtected(response.data.contentProtected);
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
      });
    }
    setEditable(!editable);
  };

  return (
    <Page
      openLoading={loading}
      pageTitle={t('admin-pages-title.article-edit')}
    >
      <ContentEditBar
        editable={editable}
        handleEditableChange={handleEditableChange}
      />
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
      />
    </Page>
  );
}
