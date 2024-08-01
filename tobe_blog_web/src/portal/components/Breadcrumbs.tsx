import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, Breadcrumbs as MBreadcrumbs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IBreadcrumbsNode } from '../../global/types';

export default function Breadcrumbs(props: Readonly<{ nodes?: IBreadcrumbsNode[] }>) {
  const { t } = useTranslation();
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
      {props.nodes?.map(n => {
        return (
          <Link
            underline="hover"
            color="white"
            href={n.href}
            key={n.href}
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
