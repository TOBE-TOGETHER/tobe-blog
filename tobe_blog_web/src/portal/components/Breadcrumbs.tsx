import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, Breadcrumbs as MBreadcrumbs, Typography } from '@mui/material';
import { useCommonUtils } from '../../commons';
import { IBreadcrumbsNode } from '../../global/types';

export default function Breadcrumbs(props: Readonly<{ nodes?: IBreadcrumbsNode[] }>) {
  const { t } = useCommonUtils();
  return (
    <MBreadcrumbs
      aria-label="breadcrumb"
      separator={
        <ChevronRightIcon
          fontSize="small"
          sx={{ color: 'white' }}
        />
      }
      sx={{ m: 1, ml: 0, flexGrow: 1, fontSize: '0.875rem' }}
    >
      <Link
        underline="hover"
        color="white"
        href="/"
      >
        {t('breadcrumbs.home')}
      </Link>
      {props.nodes?.map((n, index) => {
        return (
          <Link
            underline="hover"
            color="white"
            href={n.href}
            onClick={n.onClick}
            key={n.href ?? `node-${index}`}
            sx={{ cursor: n.onClick ? 'pointer' : 'default' }}
          >
            {n.label}
          </Link>
        );
      })}
      <Typography
        color="white"
        sx={{ fontSize: 'inherit' }}
      >
        {t('breadcrumbs.content')}
      </Typography>
    </MBreadcrumbs>
  );
}
