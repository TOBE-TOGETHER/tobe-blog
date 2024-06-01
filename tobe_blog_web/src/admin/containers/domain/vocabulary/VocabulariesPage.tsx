import { useTranslation } from 'react-i18next';
import { URL } from '../../../../routes';
import { VocabularyService } from '../../../../services';
import GeneralDomainListPage from '../components/GeneralDomainListPage';

export default function VocabulariesPage() {
  const { t } = useTranslation();
  return (
    <GeneralDomainListPage
      domainService={VocabularyService}
      pageTitle={t('vocabularies-page.page-main-title')}
      detailPageURL={URL.VOCABULARY_DETAIL}
      createPageURL={URL.CREATE_VOCABULARY}
    />
  );
}
