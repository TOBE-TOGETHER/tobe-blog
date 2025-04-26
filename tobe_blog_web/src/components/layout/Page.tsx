import { Container } from '@mui/material';
import { useEffect } from 'react';

import config from '../../../customization.json';
import Loading from '../loading/Loading';

interface IPageProps {
  openLoading?: boolean;
  pageTitle?: string;
  children: any;
  sx?: any;
}

export default function Page(props: Readonly<IPageProps>) {
  useEffect(() => {
    window.document.title = `${props.pageTitle ? props.pageTitle + ' | ' : ''}${config.title}`;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return function restoreTitle() {
      window.document.title = `${config.title}`;
    };
  });

  return (
    <Container
      sx={{
        ...{
          minHeight: '95vh',
          pt: { xs: '70px' },
          pb: 2,
        },
        ...props.sx,
      }}
    >
      <Loading open={props.openLoading} />
      {props.children}
    </Container>
  );
}
