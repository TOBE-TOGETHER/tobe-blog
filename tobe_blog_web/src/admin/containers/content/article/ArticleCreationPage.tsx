import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { ITagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { ArticleService } from '../../../../services';
import ArticleEditMainSection from './components/ArticleEditMainSection';

export default function ArticleCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [htmlValue, setHtmlValue] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [contentProtected, setContentProtected] = useState<boolean>(false);

  function saveArticle(): void {
    setOpenLoading(true);
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
        enqueueSnackbar(t('article-creation-page.msg.success'), {
          variant: 'success',
        });
        navigate(URL.ARTICLES);
      })
      .catch(() => {
        enqueueSnackbar(t('article-creation-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page
      openLoading={openLoading}
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
        textValue={textValue}
        setTextValue={setTextValue}
        onClickPrimaryBtn={saveArticle}
      />
    </Page>
  );
}
