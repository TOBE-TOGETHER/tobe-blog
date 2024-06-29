import { useTranslation } from 'react-i18next';
import { CollectionService } from '../../../../services';
import { URL } from '../../../URL.ts';
import GeneralContentListPage from '../components/GeneralContentListPage';

export default function CollectionsPage() {
  const { t } = useTranslation();
  return (
    <GeneralContentListPage
      domainService={CollectionService}
      pageTitle={t('collections-page.page-main-title')}
      detailPageURL={URL.COLLECTION_DETAIL}
      createPageURL={URL.CREATE_COLLECTION}
    />
  );
}
