import {
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BreadcrumbsNode } from '../../global/types';
import { URL } from '../../routes';
import Breadcrumbs from './Breadcrumbs';
import {
  getDomainFromPath,
  getPathFromDomain,
} from '../../commons/index.ts';
import { EDomain } from '../../global/enums.ts';

export default function ContentPageBreadcrumbsBar() {
  const { t } = useTranslation();
  let [searchParams] = useSearchParams();
  let path: string = useLocation().pathname;
  let domain: EDomain = getDomainFromPath(path.split('/')[2]);
  const breadcrumbs: BreadcrumbsNode[] = [];
  if (searchParams.has('sid') && searchParams.has('sn')) {
    breadcrumbs.push({
      label: t('breadcrumbs.subjects'),
      href: URL.SUBJECTS_PAGE,
    });
    breadcrumbs.push({
      label: searchParams.get('sn') || '',
      href: URL.SUBJECT_READING_PAGE.replace(
        ':id',
        searchParams.get('sid') || '',
      ),
    });
  } else {
    const pid = searchParams.get('pid');
    const domainPath = getPathFromDomain(domain);
    if (domainPath) {
      breadcrumbs.push({
        label: t(`breadcrumbs.${domainPath}`),
        href: pid
          ? `/personal-portal/${pid}/?d=${domainPath}`
          : `/?d=${domainPath}`,
      });
    }
  }
  return <Breadcrumbs nodes={breadcrumbs} />;
}
