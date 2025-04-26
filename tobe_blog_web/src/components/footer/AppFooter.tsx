import { Box, Container, Grid } from '@mui/material';

import Copyright from './CopyRight';

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        width: '100%',
        py: 3,
        px: 2,
        paddingTop: '15px',
        paddingBottom: '10px',
      }}
    >
      <Container fixed>
        <Grid
          item
          md={3}
          xl={12}
        >
          <Copyright />
        </Grid>
      </Container>
    </Box>
  );
}
