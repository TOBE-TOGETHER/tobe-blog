import { Container, Grid, Typography } from '@mui/material';
import { TagDisplayBar } from '../../components';
import { ITagOption } from '../../global/types';
import ContentPageBreadcrumbsBar from './ContentPageBreadcrumbsBar';

export default function ContentBanner(props: { title: string; subTitle?: string; coverImgUrl?: string; tags: ITagOption[] }) {
  return (
    <Grid
      container
      item
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url(${props.coverImgUrl});`,
        position: 'relative',
        width: '100%',
        height: {
          xs: '320px',
          sm: '350px',
          md: '45vh',
        },
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflow: 'hidden',
      }}
    >
      <Container sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Grid
          item
          container
        >
          <Grid
            item
            xs={12}
          >
            <Typography
              color={'white'}
              sx={{ mt: 12, overflow: 'hidden', fontSize: { xs: '1.5rem', sm: '2rem', lineBreak: 'anywhere' } }}
            >
              {props?.title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              variant={'h6'}
              color={'white'}
              sx={{ mt: 2, overflow: 'hidden', letterSpacing: { xs: 2, sm: 6 }, textWrap: 'nowrap' }}
            >
              {props?.subTitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <TagDisplayBar tags={props.tags} />
          <ContentPageBreadcrumbsBar />
        </Grid>
      </Container>
    </Grid>
  );
}
