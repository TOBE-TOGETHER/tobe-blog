import { Container, Grid, Typography } from '@mui/material';
import { TagDisplayBar } from '../../components';
import { ITagOption, TopicPropsType } from '../../global/types';
import ContentLikeButton from './ContentLikeButton';
import ContentPageBreadcrumbsBar from './ContentPageBreadcrumbsBar';

export default function ContentBanner(props: Readonly<{ contentId: string; title: string; subTitle?: string; coverImgUrl?: string; tags: ITagOption[]; topic: TopicPropsType }>) {
  return (
    <Grid
      container
      item
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url(${props.coverImgUrl});`,
        position: 'relative',
        width: '100%',
        height: {
          xs: '280px',
          sm: '320px',
          md: '35vh',
        },
        minHeight: {
          xs: '280px',
          sm: '320px',
          md: '320px',
        },
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflow: 'hidden',
      }}
    >
      <Container sx={{ position: 'relative', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between' }}>
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
              sx={{ mt: 2, overflow: 'hidden', textWrap: 'nowrap' }}
            >
              {props?.subTitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <TagDisplayBar tags={props.tags} />
          <ContentPageBreadcrumbsBar topic={props.topic} />
        </Grid>
        <Grid
          item
          sx={{ position: 'absolute', mr: 2, right: 2, bottom: 0.5 }}
        >
          <ContentLikeButton contentId={props.contentId} />
        </Grid>
      </Container>
    </Grid>
  );
}
