import { useSnackbar } from 'notistack';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { TagOption } from '../../../../global/types';
import { URL } from '../../../../routes';
import { ArticleService } from '../../../../services';
import ArticleEditMainSection from './components/ArticleEditMainSection';

export default function ArticleDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [htmlValue, setHtmlValue] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [tagValues, setTagValues] = useState<TagOption[]>([]);
  const [contentProtected, setContentProtected] = useState<boolean>(false);
  const loadData = useCallback((): void => {
    if (!id) {
      return window.history.back();
    }
    setOpenLoading(true);
    ArticleService.getById(id)
      .then((response) => {
        setHtmlValue(response.data.content);
        setTitle(response.data.title);
        setSubTitle(response.data.subTitle);
        setTagValues(response.data.tags);
        setContentProtected(response.data.contentProtected);
      })
      .catch(() => {
        enqueueSnackbar(t('article-creation-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }, [
    id,
    enqueueSnackbar,
    t,
  ]);
  
  useEffect(() => loadData(), [loadData]);
  
  function saveArticle(): void {
    if (!id) {
      return;
    }
    
    setOpenLoading(true);
    ArticleService.update({
      id: id,
      title,
      subTitle,
      content: htmlValue,
      description:
        textValue.trim().length >= 500
          ? textValue.trim().substring(0, 497) + '...'
          : textValue.trim(),
      tags: tagValues,
      contentProtected: contentProtected,
    })
      .then((response) => {
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
      pageTitle={t('article-detail-page.page-main-title')}
    >
      <ArticleEditMainSection
        title={title}
        setTitle={setTitle}
        subTitle={subTitle}
        setSubTitle={setSubTitle}
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
