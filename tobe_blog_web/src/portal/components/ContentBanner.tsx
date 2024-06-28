import { Container, Grid, Typography } from '@mui/material';
import ContentPageBreadcrumbsBar from './ContentPageBreadcrumbsBar';

export default function ContentBanner(props: { title: string; subTitle?: string; coverImgUrl?: string }) {
  return (
    <Grid
      container
      item
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url(${props.coverImgUrl});`,
        position: 'relative',
        width: '100%',
        height: {
          xs: '40vh',
          sm: '40vh',
          md: '50vh',
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
          <ContentPageBreadcrumbsBar />
        </Grid>
      </Container>
    </Grid>
  );
}
