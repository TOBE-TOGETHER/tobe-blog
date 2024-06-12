import { useTranslation } from 'react-i18next';
import { URL } from '../../../../routes';
import { ArticleService } from '../../../../services';
import GeneralContentListPage from '../components/GeneralContentListPage';

export default function ArticlesPage() {
  const { t } = useTranslation();
  return (
    <GeneralContentListPage
      domainService={ArticleService}
      pageTitle={t('articles-page.page-main-title')}
      detailPageURL={URL.ARTICLE_DETAIL}
      createPageURL={URL.CREATE_ARTICLE}
    />
  );
}
