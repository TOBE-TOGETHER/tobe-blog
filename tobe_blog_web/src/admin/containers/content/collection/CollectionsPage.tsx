import { useCommonUtils } from '../../../../commons';
import { URL } from '../../../../routes';
import { CollectionService } from '../UserContentService';
import GeneralContentListPage from '../components/GeneralContentListPage';

export default function CollectionsPage() {
  const { t } = useCommonUtils();
  return (
    <GeneralContentListPage
      contentService={CollectionService}
      pageTitle={t('admin-pages-title.collections')}
      detailPageURL={URL.COLLECTION_DETAIL}
      createPageURL={URL.CREATE_COLLECTION}
    />
  );
}
