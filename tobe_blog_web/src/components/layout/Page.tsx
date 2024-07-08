import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';

import config from '../../../customization.json';
import Loading from '../loading/Loading';

interface IPageProps {
  openLoading?: boolean;
  pageTitle?: string;
  children: any;
  sx?: any;
}

export default function Page(props: IPageProps) {
  useEffect(() => {
    window.document.title = `${config.projectName.toUpperCase()} ${props.pageTitle ? ' | ' + props.pageTitle : ''}`;
    return function restoreTitle() {
      window.document.title = `${config.projectName.toUpperCase()}`;
    };
  });

  return (
    <Container
      sx={{
        ...{
          minHeight: '95vh',
          pt: { xs: '64px' },
          pb: 2,
        },
        ...props.sx,
      }}
    >
      <Loading open={props.openLoading} />
      {props.pageTitle && <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' } }}>{props.pageTitle}</Typography>}
      {props.children}
    </Container>
  );
}
