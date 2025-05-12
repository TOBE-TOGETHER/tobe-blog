import { useNavigate } from 'react-router-dom';
import { useCommonUtils } from '../../commons';
import { IBreadcrumbsNode } from '../../global/types';
import Breadcrumbs from './Breadcrumbs';

export default function ContentPageBreadcrumbsBar() {
  const { t } = useCommonUtils();
  const navigate = useNavigate();
  const breadcrumbs: IBreadcrumbsNode[] = [];

  breadcrumbs.push({
    label: t('breadcrumbs.topic'),
    onClick: () => navigate(-1),
  });

  return <Breadcrumbs nodes={breadcrumbs} />;
}
