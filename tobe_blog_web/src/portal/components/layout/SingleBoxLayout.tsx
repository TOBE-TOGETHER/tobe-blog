import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { FormEvent, ReactNode } from 'react';
import { Loading } from '../../../components';

export default function SingleBoxLayout(props: {
  openLoading: Readonly<boolean>;
  title: Readonly<string>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: Readonly<ReactNode[]>
}) {
  return (
    <Grid container sx={{
      width: '100%', 
      height: '100vh', 
      position: 'relative',
      background: `linear-gradient(to right top, rgba(99, 107, 140, 0.4) 10%, 50%, rgb(224, 202, 179, 0.4))70%, 90%`  }}>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ pb: '2vh', pt: { xs: '20vh', sm: '15vh', md: '10vh'}, height: '100vh', position: 'relative', overflow: 'hidden'}}
      >
        <Loading open={props.openLoading} />
        <Paper
          component={Grid}
          container
          sx={{
            position: 'relative',
            my: { xs: 3, md: 3 },
            p: { xs: 2, md: 3 },
            height: { md: '60vh', sm: 'none'} ,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 4,
            zIndex: 2,
            boxShadow: 'rgba(145, 158, 171, 0.28) 0px 0px 2px 0px, rgba(145, 158, 171, 0.16) 0px 12px 24px -4px',
          }}
        >
          <Grid item container sm={6} md={6} lg={6} xl={6} sx={{ height: '100%', width: '100%', display: {xs: 'none', sm: 'flex', md: 'flex'}}}>
            <img src="images/login.png" width='100%'></img>
          </Grid>
          <Grid item container xs={12} sm={6} md={6} lg={6} xl={6} sx={{height: '100%'}} justifyContent='center' alignItems='center'>
            <Typography
              component="h1"
              variant="h5"
            >
              {props.title}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={props.handleSubmit}
              sx={{ mt: 4, height: '100%' }}
            >
              <Grid
                container
                spacing={2}
                sx={{px: 2}}
              >
                {...props.children}
              </Grid>
            </Box>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
