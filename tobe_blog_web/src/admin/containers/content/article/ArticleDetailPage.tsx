import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { ITagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { ArticleService } from '../../../../services';
import ArticleEditMainSection from './components/ArticleEditMainSection';

export default function ArticleDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [htmlValue, setHtmlValue] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [contentProtected, setContentProtected] = useState<boolean>(false);
  const loadData = useCallback((): void => {
    if (!id) {
      return window.history.back();
    }
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
      });
  }, [id, enqueueSnackbar, t]);

  useEffect(() => loadData(), [loadData]);

  function saveArticle(): void {
    if (!id) {
      return;
    }
    if (!title) {
      return;
    }
    ArticleService.update({
      id: id,
      title: title,
      subTitle: subTitle,
      coverImgUrl: coverImgUrl,
      content: htmlValue,
      description: textValue.trim().length >= 500 ? textValue.trim().substring(0, 497) + '...' : textValue.trim(),
      tags: tagValues,
      contentProtected: contentProtected,
    })
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        navigate(URL.ARTICLES);
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
      pageTitle={t('admin-pages-title.article-edit')}
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
        textValue={textValue}
        setTextValue={setTextValue}
        onClickPrimaryBtn={saveArticle}
      />
    </Page>
  );
}
