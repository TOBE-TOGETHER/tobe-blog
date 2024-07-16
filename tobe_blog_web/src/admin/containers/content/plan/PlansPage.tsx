import { useTranslation } from 'react-i18next';
import { URL } from '../../../../routes';
import { PlanService } from '../UserContentService.ts';

import GeneralContentListPage from '../components/GeneralContentListPage';

export default function PlansPage() {
  const { t } = useTranslation();
  return (
    <GeneralContentListPage
      contentService={PlanService}
      pageTitle={t('admin-pages-title.plans')}
      detailPageURL={URL.PLAN_DETAIL}
      createPageURL={URL.CREATE_PLAN}
    />
  );
}
