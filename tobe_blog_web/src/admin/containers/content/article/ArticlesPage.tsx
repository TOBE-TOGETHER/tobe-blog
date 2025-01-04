import { useCommonUtils } from '../../../../commons';
import { URL } from '../../../../routes';
import { ArticleService } from '../UserContentService';
import GeneralContentListPage from '../components/GeneralContentListPage';

export default function ArticlesPage() {
  const { t } = useCommonUtils();
  return (
    <GeneralContentListPage
      contentService={ArticleService}
      pageTitle={t('admin-pages-title.articles')}
      detailPageURL={URL.ARTICLE_DETAIL}
      createPageURL={URL.CREATE_ARTICLE}
    />
  );
}
