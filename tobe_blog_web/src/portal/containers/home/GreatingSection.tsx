import { Card, Container, Grid, Link, Typography } from '@mui/material';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import config from '../../../../customization.json';
import { useCommonUtils } from '../../../commons';
import { useAuthState } from '../../../contexts';
import { URL } from '../../../routes';
import theme from '../../../theme';

const AutoplaySlider = withAutoplay(AwesomeSlider);

export default function GreatingSection() {
  const authState = useAuthState();
  const { t } = useCommonUtils();
  return (
    <Container>
      <Grid
        container
        spacing={1}
        sx={{ mt: '64px' }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={true}
          sx={{
            display: 'flex',
            overflow: 'hidden',
            ...sliderStyles,
          }}
        >
          {config?.home?.banners && (
            <AutoplaySlider
              play={true}
              cancelOnInteraction={false}
              interval={30000}
            >
              {config.home.banners.map(i => {
                return (
                  <div
                    data-src={i.imgUrl}
                    key={i.imgUrl}
                  >
                    <Title
                      main={i.main}
                      secondary={i.secondary}
                      sx={{ color: theme.palette.background.paper }}
                    />
                  </div>
                );
              })}
            </AutoplaySlider>
          )}
        </Grid>
        {authState?.user?.id && (
          <Grid
            item
            xs={0}
            sm={0}
            md={3}
            lg={3}
            xl={3}
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
              },
            }}
          >
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                borderRadius: '0px',
                overflow: 'hidden',
                zIndex: 0,
              }}
            >
              <DecordateBox
                color={'red'}
                xIndex="220px"
              />
              <DecordateBox
                color={'blue'}
                xIndex="-80px"
              />
              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 1,
                }}
              >
                👋 Hi {authState?.user?.firstName ?? authState?.user?.lastName} 👋
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  fontFamily:
                    'Public Sans Variable,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
                }}
              >
                {t('home-page.greating1')}
                <br />
                {t('home-page.greating2')}🥳🥳
                <br />
                <br />
                <Link href={URL.ANALYTICS}>{t('home-page.entrance')}</Link>
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

const Title = (props: any) => {
  return (
    <Grid
      sx={{
        ...{ p: 2 },
        ...props.sxBody,
      }}
    >
      <Typography
        variant="h1"
        align="center"
        color="whitesmoke"
        sx={{
          fontWeight: 600,
          fontFamily: '"Borel", cursive',
          fontSize: {
            xs: '1.8rem',
            sm: '1.8rem',
            md: '2rem',
            lg: '2.5rem',
          },
        }}
      >
        {props.main}
      </Typography>
      <Typography
        variant="h3"
        align="center"
        color="whitesmoke"
        sx={{
          fontWeight: 500,
          fontFamily: '"Borel", cursive',
          mt: {
            xs: 1,
            md: 2,
            lg: 3,
          },
          fontSize: {
            xs: '1.5rem',
            sm: '1.5rem',
            md: '1.8rem',
            lg: '2rem',
          },
        }}
      >
        {props.secondary}
      </Typography>
    </Grid>
  );
};

const sliderStyles = {
  '.awssld__bullets': {
    display: 'none',
  },
  '.awssld div.awssld__content > div': {
    zIndex: 10,
  },
  '.awssld': {
    'maxHeight': '200px',
    '--loader-bar-color': 'transparent !important',
    '--organic-arrow-color': 'transparent !important',
  },
};

const DecordateBox = (props: { color: string; xIndex: string }) => {
  return (
    <Grid
      item
      sx={{
        top: '-40px',
        width: '300px',
        zIndex: '-1',
        height: '300px',
        right: props.xIndex,
        opacity: '0.18',
        borderRadius: '40px',
        position: 'absolute',
        transform: 'rotate(45deg)',
        background: props.color,
      }}
    />
  );
};
