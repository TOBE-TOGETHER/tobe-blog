import { useTranslation } from 'react-i18next';
import { URL } from '../../../../routes';
import { ArticleService } from '../UserContentService';
import GeneralContentListPage from '../components/GeneralContentListPage';

export default function ArticlesPage() {
  const { t } = useTranslation();
  return (
    <GeneralContentListPage
      contentService={ArticleService}
      pageTitle={t('admin-pages-title.articles')}
      detailPageURL={URL.ARTICLE_DETAIL}
      createPageURL={URL.CREATE_ARTICLE}
    />
  );
}
