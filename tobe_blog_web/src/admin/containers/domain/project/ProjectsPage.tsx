import { useTranslation } from 'react-i18next';
import {
  GeneralCardData,
  ProjectInfo,
} from '../../../../global/types';
import { URL } from '../../../../routes';
import { ProjectService } from '../../../../services';

import GeneralDomainListPage from '../components/GeneralDomainListPage';

export default function ProjectsPage() {
  const { t } = useTranslation();
  
  function convertToGeneralCardData(data: ProjectInfo[]): GeneralCardData[] {
    return data.map((d) => {
      return {
        id: d.id,
        title: d.name,
        description: d.description,
        publicToAll: d.publicToAll,
        tags: d.tags,
        createTime: d.createTime,
      };
    });
  }
  
  return (
    <GeneralDomainListPage
      domainService={ProjectService}
      pageTitle={t('projects-page.page-main-title')}
      detailPageURL={URL.PROJECT_DETAIL}
      createPageURL={URL.CREATE_PROJECT}
      dataConverter={convertToGeneralCardData}
    />
  );
}
