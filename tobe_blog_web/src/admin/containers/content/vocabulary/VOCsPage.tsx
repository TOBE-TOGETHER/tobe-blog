import { useTranslation } from 'react-i18next';
import { URL } from '../../../../routes';
import { VocabularyService } from '../../../../services';
import GeneralContentListPage from '../components/GeneralContentListPage';

export default function VOCsPage() {
  const { t } = useTranslation();
  return (
    <GeneralContentListPage
      domainService={VocabularyService}
      pageTitle={t('admin-pages-title.vocabularies')}
      detailPageURL={URL.VOCABULARY_DETAIL}
      createPageURL={URL.CREATE_VOCABULARY}
    />
  );
}
