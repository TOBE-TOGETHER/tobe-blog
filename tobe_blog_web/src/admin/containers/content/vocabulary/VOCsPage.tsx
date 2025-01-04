import { useCommonUtils } from '../../../../commons';
import { URL } from '../../../../routes';
import { VocabularyService } from '../UserContentService';
import GeneralContentListPage from '../components/GeneralContentListPage';

export default function VOCsPage() {
  const { t } = useCommonUtils();
  return (
    <GeneralContentListPage
      contentService={VocabularyService}
      pageTitle={t('admin-pages-title.vocabularies')}
      detailPageURL={URL.VOCABULARY_DETAIL}
      createPageURL={URL.CREATE_VOCABULARY}
    />
  );
}
