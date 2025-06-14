import {
  ListItem,
  ListItemText,
  Box,
  Skeleton,
  useTheme,
  Divider,
} from '@mui/material';

export default function NotificationCardSkeleton() {
  const theme = useTheme();

  return (
    <>
      <ListItem
        sx={{
          py: 2.5,
          px: 3,
        }}
      >
        <ListItemText
          sx={{ pr: 2 }}
          primary={
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
              <Skeleton variant="text" width="70%" height={24} />
              <Skeleton variant="circular" width={8} height={8} sx={{ mt: 0.5, ml: 2 }} />
            </Box>
          }
          secondary={
            <Box>
              <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1.5 }} />
              
              {/* Comment content skeleton */}
              <Box sx={{ 
                mb: 1.5,
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                borderLeft: `3px solid ${theme.palette.grey[300]}`,
                borderRadius: 1,
              }}>
                <Skeleton variant="text" width="30%" height={16} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="80%" height={18} />
              </Box>
              
              {/* Related content and buttons skeleton */}
              <Box sx={{ 
                mb: 1.5, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                gap: 2,
              }}>
                <Skeleton variant="rectangular" width="60%" height={28} sx={{ borderRadius: 1 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                  <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: 1 }} />
                </Box>
              </Box>
              
              {/* Footer skeleton */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                mt: 1,
                pt: 1,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}>
                <Skeleton variant="text" width="40%" height={16} />
                <Skeleton variant="text" width="30%" height={16} />
              </Box>
            </Box>
          }
        />
      </ListItem>
      <Divider 
        variant="fullWidth" 
        component="li" 
        sx={{ 
          opacity: 1,
          width: '100%',
          backgroundColor: theme.palette.divider,
          my: 0,
        }} 
      />
    </>
  );
} 