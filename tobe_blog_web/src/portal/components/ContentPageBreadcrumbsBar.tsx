import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getContentTypeFromPath, getPathFromContentType } from '../../commons';
import { EContentType } from '../../global/enums.ts';
import { IBreadcrumbsNode } from '../../global/types';
import Breadcrumbs from './Breadcrumbs';

export default function ContentPageBreadcrumbsBar() {
  const { t } = useTranslation();
  let [searchParams] = useSearchParams();
  let path: string = useLocation().pathname;
  let contentType: EContentType = getContentTypeFromPath(path.split('/')[2]);
  const breadcrumbs: IBreadcrumbsNode[] = [];
  const pid = searchParams.get('pid');
  path = getPathFromContentType(contentType);
  if (path) {
    breadcrumbs.push({
      label: t(`breadcrumbs.${path}`),
      href: pid ? `/personal-portal/${pid}/?d=${path}` : `/?d=${path}`,
    });
  }

  return <Breadcrumbs nodes={breadcrumbs} />;
}
