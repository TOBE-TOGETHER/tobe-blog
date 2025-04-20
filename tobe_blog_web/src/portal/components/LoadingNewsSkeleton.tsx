import { Grid, Skeleton } from '@mui/material';

export default function LoadingNewsSkeleton() {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        p: 2,
      }}
    >
      <Skeleton
        variant="text"
        animation="wave"
        width="50%"
        sx={{ fontSize: '1rem' }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        width="100%"
        sx={{ fontSize: '1rem' }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        width="100%"
        sx={{ fontSize: '1rem' }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        width="100%"
        sx={{ fontSize: '1rem' }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        width="30%"
        sx={{ fontSize: '1rem' }}
      />
    </Grid>
  );
}
