import { Container, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';

import project from '../../../package.json';
import Loading from '../loading/Loading';

interface PageProps {
  openLoading?: boolean;
  pageTitle?: string;
  children: any;
  sx?: any;
}

export default function Page(props: PageProps) {
  useEffect(() => {
    window.document.title = `${project.name.toUpperCase()} ${props.pageTitle ? ' | ' + props.pageTitle : ''}`;
    return function restoreTitle() {
      window.document.title = `${project.name.toUpperCase()}`;
    };
  });

  return (
    <Container
      sx={{
        ...{
          minHeight: '95vh',
          pt: { sm: '11vh', xs: '8vh' },
          pb: 2,
        },
        ...props.sx,
      }}
    >
      <Loading open={props.openLoading} />
      {props.pageTitle && (
        <>
          <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' } }}>{props.pageTitle}</Typography>
          <Divider />
        </>
      )}
      {props.children}
    </Container>
  );
}
