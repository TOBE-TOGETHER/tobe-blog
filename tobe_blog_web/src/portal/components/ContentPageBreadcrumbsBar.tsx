import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getContentTypeFromPath, getPathFromContentType } from '../../commons';
import { EContentType } from '../../global/enums.ts';
import { BreadcrumbsNode } from '../../global/types';
import { URL } from '../../routes';
import Breadcrumbs from './Breadcrumbs';

export default function ContentPageBreadcrumbsBar() {
  const { t } = useTranslation();
  let [searchParams] = useSearchParams();
  let path: string = useLocation().pathname;
  let contentType: EContentType = getContentTypeFromPath(path.split('/')[2]);
  const breadcrumbs: BreadcrumbsNode[] = [];
  if (searchParams.has('sid') && searchParams.has('sn')) {
    breadcrumbs.push({
      label: t('breadcrumbs.subjects'),
      href: URL.SUBJECTS_PAGE,
    });
    breadcrumbs.push({
      label: searchParams.get('sn') || '',
      href: URL.SUBJECT_READING_PAGE.replace(':id', searchParams.get('sid') || ''),
    });
  } else {
    const pid = searchParams.get('pid');
    const path = getPathFromContentType(contentType);
    if (path) {
      breadcrumbs.push({
        label: t(`breadcrumbs.${path}`),
        href: pid ? `/personal-portal/${pid}/?d=${path}` : `/?d=${path}`,
      });
    }
  }
  return <Breadcrumbs nodes={breadcrumbs} />;
}
