import { useTranslation } from 'react-i18next';
import { URL } from '../../../../routes';
import { ArticleService } from '../../../../services';
import GeneralDomainListPage from '../components/GeneralDomainListPage';

export default function ArticlesPage() {
  const { t } = useTranslation();
  return (
    <GeneralDomainListPage
      domainService={ArticleService}
      pageTitle={t('articles-page.page-main-title')}
      detailPageURL={URL.ARTICLE_DETAIL}
      createPageURL={URL.CREATE_ARTICLE}
    />
  );
}
