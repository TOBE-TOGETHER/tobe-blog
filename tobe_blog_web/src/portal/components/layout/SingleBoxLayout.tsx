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
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mb: 2, mt: '20vh' }}
    >
      <Loading open={props.openLoading} />
      <Paper
        sx={{
          my: { xs: 3, md: 3 },
          p: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 4,
          boxShadow: 'rgba(145, 158, 171, 0.28) 0px 0px 2px 0px, rgba(145, 158, 171, 0.16) 0px 12px 24px -4px',
        }}
      >
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
          sx={{ mt: 1 }}
        >
          <Grid
            container
            spacing={2}
          >
            {...props.children}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
