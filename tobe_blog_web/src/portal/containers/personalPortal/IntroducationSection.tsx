import RssFeedIcon from '@mui/icons-material/RssFeed';
import { Container, Grid, Link, Paper, Tooltip, Typography } from '@mui/material';
import config from '../../../../customization.json';
import { useCommonUtils } from '../../../commons';
import { IUserFullProfileDTO } from '../../../global/types';

export default function IntroducationSection(props: Readonly<{ profile: IUserFullProfileDTO | null }>) {
  const { t } = useCommonUtils();
  return (
    <Container sx={{ mt: '64px' }}>
      <Grid
        container
        component={Paper}
        sx={{ minHeight: '45vh', borderRadius: '16px', overflow: 'hidden', boxShadow: 'rgba(145, 158, 171, 0.28) 0px 0px 12px 0px, rgba(145, 158, 171, 0.16) 0px 24px 30px -4px' }}
        justifyItems="start"
        alignContent="start"
      >
        <Grid
          container
          justifyContent="flex-end"
          sx={{
            height: { xs: '18vh', sm: '18vh', md: '24vh', lg: '26h' },
            mb: { xs: -12, lg: -10 },
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            backgroundImage: `url(${props.profile?.backgroundImg ?? config.defaultPersonalProfileCoverImgUrl})`,
          }}
        />
        <Grid container>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            direction="column"
            sx={{ px: 2, py: 2, minHeight: '30vh' }}
          >
            <Grid
              item
              container
              sx={{
                background: 'white',
                borderRadius: '60px',
                width: '120px',
                height: '120px',
                border: '5px solid white',
                backgroundImage: `url(${props.profile?.photoImg ?? props.profile?.avatarUrl})`,
                backgroundRepeat: 'round',
              }}
            />
            <Grid
              item
              container
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mr: 1, alignContent: 'center' }}
              >{`${props.profile?.firstName} ${props.profile?.lastName}`}</Typography>
              {props.profile?.blog && (
                <Link
                  href={props.profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    'display': 'flex',
                    'alignItems': 'center',
                    'color': 'primary.main',
                    'textDecoration': 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Tooltip title={t('components.author-panel.visit-blog')}>
                    <RssFeedIcon color="info" />
                  </Tooltip>
                </Link>
              )}
            </Grid>

            <Grid item>
              <Typography variant="h6">{props.profile?.profession}</Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle2"
                color="textSecondary"
              >
                {props.profile?.address}
              </Typography>
            </Grid>
            {props.profile?.introduction && (
              <Grid item>
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 1, whiteSpace: 'pre-wrap' }}
                  color="textSecondary"
                >
                  {props.profile.introduction}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <Grid
              item
              container
              sx={{ my: { sm: 2, xs: 2 } }}
            >
              <Grid
                item
                xs={6}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ textAlign: 'center' }}
                >
                  {t('components.author-panel.public-creation-count')}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ textAlign: 'center' }}
                >
                  {t('components.author-panel.view-count')}
                </Typography>
              </Grid>
              <Tooltip title={t('components.author-panel.public-creation-count')}>
                <Grid
                  item
                  xs={6}
                  sx={{ borderRight: '1px solid rgba(0,0,0,0.12)' }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textAlign: 'center' }}
                  >
                    {props.profile?.publicContentCount ?? 0}
                  </Typography>
                </Grid>
              </Tooltip>
              <Tooltip title={t('components.author-panel.view-count')}>
                <Grid
                  item
                  xs={6}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textAlign: 'center' }}
                  >
                    {props.profile?.viewCount ?? 0}
                  </Typography>
                </Grid>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
