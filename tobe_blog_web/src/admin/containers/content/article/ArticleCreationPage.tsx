import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { ITagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { ArticleService } from '../UserContentService';
import ArticleEditMainSection from './components/ArticleEditMainSection';

export default function ArticleCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [htmlValue, setHtmlValue] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [contentProtected, setContentProtected] = useState<boolean>(false);

  function saveArticle(): void {
    setLoading(true);
    ArticleService.create({
      title: title,
      subTitle: subTitle,
      content: htmlValue,
      coverImgUrl: coverImgUrl,
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
      })
      .finally(() => setLoading(false));
  }

  return (
    <Page
      openLoading={loading}
      pageTitle={t('article-creation-page.page-main-title')}
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
        onClickPrimaryBtn={saveArticle}
      />
    </Page>
  );
}
