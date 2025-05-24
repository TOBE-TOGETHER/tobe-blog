import { Avatar, Card, CardContent, CardHeader, Grid, Typography, Box, useTheme, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import { IUserData } from '../../../global/types';
import { useCommonUtils } from '../../../commons';

interface IUserCardProps {
  readonly user: IUserData;
  readonly onCardClick?: (userId: number | string) => void;
}

export default function UserCard({ user, onCardClick }: IUserCardProps) {
  const theme = useTheme();
  const { t } = useCommonUtils();

  const getFullName = () => {
    const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
    return fullName ?? user.username ?? `User ${user.id}`;
  };

  // Available roles mapping for display
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return t('user-detail.role-labels.admin');
      case 'ROLE_BASIC':
        return t('user-detail.role-labels.basic');
      default:
        return role;
    }
  };

  const renderRoles = () => {
    if (!user.roles || user.roles.length === 0) {
      return (
        <Chip 
          label={t('user-detail.role-labels.no-roles')} 
          size="small" 
          variant="outlined" 
          sx={{ fontSize: '0.7rem', height: '20px' }}
        />
      );
    }

    // Filter out ROLE_BASIC if user has ROLE_ADMIN
    const rolesToDisplay = user.roles.includes('ROLE_ADMIN') 
      ? user.roles.filter(role => role !== 'ROLE_BASIC')
      : user.roles;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {rolesToDisplay.map((role) => (
          <Chip
            key={role}
            label={getRoleLabel(role)}
            size="small"
            color={role === 'ROLE_ADMIN' ? 'primary' : 'default'}
            variant="outlined"
            sx={{ fontSize: '0.7rem', height: '20px' }}
          />
        ))}
      </Box>
    );
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        elevation={0}
        onClick={() => onCardClick?.(user.id)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          cursor: onCardClick ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={user.avatarUrl}
              alt={getFullName()}
              sx={{
                width: 64,
                height: 64,
                bgcolor: !user.avatarUrl ? 'primary.main' : undefined,
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {!user.avatarUrl && (user.firstName && user.lastName ? 
                `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() : 
                <PersonIcon sx={{ fontSize: '2rem' }} />
              )}
            </Avatar>
          }
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }} noWrap>
                {getFullName()}
              </Typography>
              {user.emailVerified && (
                <VerifiedIcon sx={{ color: 'success.main', fontSize: '1.1rem', ml: 1 }} />
              )}
            </Box>
          }
          subheader={
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              ID: {user.id}
            </Typography>
          }
          sx={{ pb: 2, pt: 2 }}
        />
        
        <CardContent sx={{ pt: 0, pb: 2, flexGrow: 1 }}>
          {/* Email */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <EmailIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '1.1rem' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              {user.email ?? 'No email'}
            </Typography>
          </Box>

          {/* Roles */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '1.1rem' }} />
            {renderRoles()}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
} 