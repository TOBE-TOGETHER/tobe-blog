import { Box, Container, Grid, Typography } from '@mui/material';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import theme from '../../../theme';
import './slider.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Title = (props: any) => {
  return (
    <Box
      sx={{
        ...{ p: 2 },
        ...props.sxBody,
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: '1.25rem',
            sm: '1.5rem',
            md: '2rem',
            lg: '3rem',
          },
        }}
      >
        {props.main}
      </Typography>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 500,
          mt: {
            xs: 1,
            md: 2,
            lg: 3,
          },
          fontSize: {
            xs: '1.25rem',
            sm: '1.5rem',
            md: '1.5rem',
            lg: '3rem',
          },
        }}
      >
        {props.secondary}
      </Typography>
    </Box>
  );
};

export default function GreatingSection() {
  return (
    <Container>
      <Grid
        container
        sx={{
          mt: '60px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'rgba(145, 158, 171, 0.28) 0px 0px 12px 0px, rgba(145, 158, 171, 0.16) 0px 24px 30px -4px',
        }}
      >
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false}
          interval={30000}
          style={{
            color: theme.palette.background.paper,
          }}
        >
          <div data-src="https://images.pexels.com/photos/3355755/pexels-photo-3355755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
            <Title
              main="No gain is too slight to bother with"
              secondary="不积跬步无以至千里"
              sx={{ color: theme.palette.background.paper }}
            />
          </div>
          <div data-src="https://images.pexels.com/photos/7539496/pexels-photo-7539496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
            <Title
              main="Either travelling or reading, body and soul, there must be one on the road"
              sx={{ color: theme.palette.background.paper }}
            />
          </div>
        </AutoplaySlider>
      </Grid>
    </Container>
  );
}
