import { useLocation, useSearchParams } from 'react-router-dom';
import { getContentTypeFromPath, getPathFromContentType, useCommonUtils } from '../../commons';
import { EContentType } from '../../global/enums.ts';
import { IBreadcrumbsNode } from '../../global/types';
import Breadcrumbs from './Breadcrumbs';

export default function ContentPageBreadcrumbsBar() {
  const { t } = useCommonUtils();
  let [searchParams] = useSearchParams();
  let path: string = useLocation().pathname;
  let contentType: EContentType = getContentTypeFromPath(path.split('/')[2]);
  const breadcrumbs: IBreadcrumbsNode[] = [];
  const pid = searchParams.get('pid');
  path = getPathFromContentType(contentType);
  if (path) {
    breadcrumbs.push({
      label: t(`breadcrumbs.${path}`),
      href: pid ? `/personal-portal/${pid}/?t=${path}` : `/?t=${path}`,
    });
  }

  return <Breadcrumbs nodes={breadcrumbs} />;
}
