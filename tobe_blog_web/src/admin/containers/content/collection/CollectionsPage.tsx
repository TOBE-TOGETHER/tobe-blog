import { useTranslation } from 'react-i18next';
import { URL } from '../../../../routes';
import { CollectionService } from '../../../../services';
import GeneralContentListPage from '../components/GeneralContentListPage';

export default function CollectionsPage() {
  const { t } = useTranslation();
  return (
    <GeneralContentListPage
      domainService={CollectionService}
      pageTitle={t('admin-pages-title.collections')}
      detailPageURL={URL.COLLECTION_DETAIL}
      createPageURL={URL.CREATE_COLLECTION}
    />
  );
}
