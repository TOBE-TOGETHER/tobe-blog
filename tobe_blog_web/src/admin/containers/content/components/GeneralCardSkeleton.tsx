import { Grid, Paper, Skeleton, Box } from '@mui/material';
import theme from '../../../../theme';

export function GeneralCardSkeleton() {
  return (
    <Grid
      item
      xs={12}
      sm={6}
    >
      <Paper sx={{ borderRadius: 4, boxShadow: theme.shadows[4] }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={8}
            xl={8}
            sx={{ p: 3, flexDirection: 'column', pb: { xs: 0, sm: 0, md: 3 } }}
          >
            <Grid container>
              <Grid
                container
                flexGrow={1}
                sx={{
                  alignItems: 'center',
                  width: 'fit-content',
                }}
              >
                {/* Status chips */}
                <Skeleton variant="rounded" width={60} height={28} sx={{ mr: 1 }} />
                <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
              </Grid>
              <Grid flexGrow={0}>
                {/* Date */}
                <Skeleton variant="text" width={80} height={20} />
              </Grid>
            </Grid>
            
            {/* Title */}
            <Skeleton 
              variant="text" 
              width="90%" 
              height={24} 
              sx={{ mt: 2, mb: 1 }} 
            />
            
            {/* Description */}
            <Box sx={{ mb: 1 }}>
              <Skeleton variant="text" width="100%" height={16} />
              <Skeleton variant="text" width="80%" height={16} />
            </Box>
            
            {/* Tags */}
            <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
              <Skeleton variant="rounded" width={50} height={28} />
              <Skeleton variant="rounded" width={70} height={28} />
            </Box>
            
            {/* Stats */}
            <Grid container>
              <Grid
                item
                alignItems="center"
                sx={{ display: 'inline-flex' }}
              >
                <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
                <Skeleton variant="text" width={30} height={16} sx={{ mr: 1 }} />
                <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
                <Skeleton variant="text" width={30} height={16} sx={{ mr: 2 }} />
              </Grid>
              <Grid
                item
                alignItems="center"
                sx={{ display: 'inline-flex', ml: 'auto' }}
              >
                <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
                <Skeleton variant="text" width={40} height={16} />
              </Grid>
            </Grid>
          </Grid>
          
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
          >
            <Grid
              container
              width="100%"
              height="100%"
              p={1}
              sx={{ maxHeight: { xs: '160px', sm: '160px', md: '252px' } }}
            >
              <Skeleton 
                variant="rounded" 
                width="100%" 
                height="100%" 
                sx={{ borderRadius: '16px' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
} 