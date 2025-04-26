import { useState } from 'react';
import { useCommonUtils } from '../../../../commons';
import { Page } from '../../../../components/layout';
import { URL } from '../../../../routes';
import { SaveButtonPanel } from '../../../components';
import { useCommonContentState } from '../commons';
import { ArticleService } from '../UserContentService';
import ArticleEditMainSection from './components/ArticleEditMainSection';

export default function ArticleCreationPage() {
  const { t, enqueueSnackbar, navigate } = useCommonUtils();
  const [htmlValue, setHtmlValue] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [contentProtected, setContentProtected] = useState<boolean>(false);
  const { loading, setLoading, title, setTitle, coverImgUrl, setCoverImgUrl, tagValues, setTagValues, topic, setTopic } = useCommonContentState();

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
      topic: topic,
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
        editable={true}
        description={''}
        setDescription={() => {}}
        sx={{ mt: 6 }}
        topic={topic}
        setTopic={setTopic}
      />
      <SaveButtonPanel primaryEvent={saveArticle} />
    </Page>
  );
}
