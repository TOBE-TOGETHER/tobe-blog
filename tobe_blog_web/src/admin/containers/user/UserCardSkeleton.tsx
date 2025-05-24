import { Card, CardContent, CardHeader, Grid, Skeleton, Box } from '@mui/material';

export default function UserCardSkeleton() {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <CardHeader
          avatar={
            <Skeleton variant="circular" width={64} height={64} />
          }
          action={
            <Skeleton variant="circular" width={40} height={40} />
          }
          title={
            <Skeleton variant="text" width="70%" height={24} />
          }
          subheader={
            <Skeleton variant="text" width="40%" height={20} />
          }
          sx={{ pb: 1 }}
        />
        
        <CardContent sx={{ pt: 0, flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* 邮箱骨架 */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
                <Skeleton variant="text" width="30%" height={16} />
              </Box>
              <Skeleton variant="text" width="90%" height={20} sx={{ pl: 3 }} />
            </Grid>
            
            {/* 用户名骨架 */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
                <Skeleton variant="text" width="35%" height={16} />
              </Box>
              <Skeleton variant="text" width="60%" height={20} sx={{ pl: 3 }} />
            </Grid>
            
            {/* 联系电话骨架 - 始终显示以保持高度一致 */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
                <Skeleton variant="text" width="40%" height={16} />
              </Box>
              <Skeleton variant="text" width="70%" height={20} sx={{ pl: 3 }} />
            </Grid>
          </Grid>
        </CardContent>

        {/* 底部装饰条骨架 */}
        <Skeleton variant="rectangular" width="100%" height={4} />
      </Card>
    </Grid>
  );
} 