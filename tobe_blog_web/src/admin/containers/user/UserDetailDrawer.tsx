import { 
  Drawer, 
  Box, 
  Typography, 
  Avatar, 
  Divider, 
  IconButton, 
  Card, 
  CardContent,
  Skeleton,
  useTheme,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import LinkIcon from '@mui/icons-material/Link';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useCallback, useEffect, useState } from 'react';
import { useCommonUtils } from '../../../commons';
import Dialogx from '../../components/dialog/Dialogx';
import { IUserData } from '../../../global/types';
import * as UserService from '../../../services/UserService';

interface IUserDetailDrawerProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly userId: number | string | null;
  readonly onDelete?: (id: number | string) => void;
}

export default function UserDetailDrawer({ open, onClose, userId, onDelete }: IUserDetailDrawerProps) {
  const { t, navigate, enqueueSnackbar } = useCommonUtils();
  const theme = useTheme();
  
  const [user, setUser] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [resendingEmail, setResendingEmail] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [updatingRoles, setUpdatingRoles] = useState<boolean>(false);

  // Available roles in the system with internationalization
  const getAvailableRoles = () => [
    { value: 'ROLE_BASIC', label: t('user-detail.role-labels.basic') },
    { value: 'ROLE_ADMIN', label: t('user-detail.role-labels.admin') }
  ];

  const loadUserData = useCallback((): void => {
    if (!userId) return;
    
    setLoading(true);
    UserService.getUser(userId)
      .then(response => {
        const userData = response.data;
        setUser(userData);
        
        // Ensure ROLE_BASIC is always included in user roles
        const userRoles = userData.roles || [];
        const rolesWithBasic = userRoles.includes('ROLE_BASIC') 
          ? userRoles 
          : [...userRoles, 'ROLE_BASIC'];
        
        setSelectedRoles(rolesWithBasic);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { variant: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, t, enqueueSnackbar]);

  useEffect(() => {
    if (open && userId) {
      loadUserData();
    } else {
      setUser(null);
      setSelectedRoles([]);
    }
  }, [open, userId, loadUserData]);

  const handleDeleteClick = useCallback((): void => {
    setOpenDeleteDialog(true);
  }, []);

  const handleConfirmDelete = useCallback((): void => {
    if (user && onDelete) {
      onDelete(user.id);
      setOpenDeleteDialog(false);
      onClose();
    }
  }, [user, onDelete, onClose]);

  const handleResendEmail = useCallback((): void => {
    if (!user?.email) return;
    
    setResendingEmail(true);
    UserService.resendVerificationEmail(user.email)
      .then(() => {
        enqueueSnackbar(t('email-verification.msg.resend-success'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(t('email-verification.msg.resend-error'), { variant: 'error' });
      })
      .finally(() => {
        setResendingEmail(false);
      });
  }, [user?.email, t, enqueueSnackbar]);

  const handleVisitPortal = useCallback((): void => {
    if (user) {
      navigate(`/personal-portal/${user.id}`);
    }
  }, [user, navigate]);

  const handleRoleChange = useCallback((event: SelectChangeEvent<string[]>): void => {
    const value = event.target.value;
    const newRoles = typeof value === 'string' ? value.split(',') : value;
    
    // Ensure ROLE_BASIC is always included
    const rolesWithBasic = newRoles.includes('ROLE_BASIC') 
      ? newRoles 
      : [...newRoles, 'ROLE_BASIC'];
    
    setSelectedRoles(rolesWithBasic);
  }, []);

  const handleUpdateRoles = useCallback((): void => {
    if (!user) return;
    
    setUpdatingRoles(true);
    UserService.updateUserRoles(user.id, selectedRoles)
      .then((response) => {
        setUser(response.data);
        enqueueSnackbar(t('user-detail.role-update-success'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { variant: 'error' });
        // Reset roles on error
        setSelectedRoles(user.roles || []);
      })
      .finally(() => {
        setUpdatingRoles(false);
      });
  }, [user, selectedRoles, t, enqueueSnackbar]);

  const getFullName = () => {
    if (!user) return '';
    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() ?? user.username ?? '';
  };

  const formatDateTime = (dateString: string | undefined) => {
    if (!dateString) return t('user-detail.no-data');
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const renderInfoItem = (icon: React.ReactElement, label: string, value: string | number | null | undefined, isVerified?: boolean) => {
    if (!value) return null;
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ color: 'text.secondary', mr: 1.5, display: 'flex' }}>
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.25 }}>
            {label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {value}
            </Typography>
            {isVerified && (
              <VerifiedIcon sx={{ color: 'success.main', fontSize: '1rem' }} />
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  const renderSkeleton = () => (
    <Box sx={{ p: 3 }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="circular" width={24} height={24} sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="30%" height={16} />
            <Skeleton variant="text" width="70%" height={20} />
          </Box>
        </Box>
      ))}
    </Box>
  );

  const hasRoleChanged = user?.roles && (
    selectedRoles.length !== user.roles.length || 
    !selectedRoles.every(role => user.roles?.includes(role))
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400, md: 480 },
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('user-detail.title')}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      {loading ? renderSkeleton() : user ? (
        <Box sx={{ p: 3 }}>
          {/* User Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={user.avatarUrl}
              alt={getFullName()}
              sx={{
                width: 80,
                height: 80,
                mr: 3,
                bgcolor: !user.avatarUrl ? 'primary.main' : undefined,
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {!user.avatarUrl && (user.firstName && user.lastName ? 
                `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() : 
                <PersonIcon sx={{ fontSize: '2.5rem' }} />
              )}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {getFullName()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {user.id}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Basic Information */}
          <Card sx={{ mb: 3, elevation: 0, border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  {t('user-detail.basic-info')}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<LaunchIcon />}
                  onClick={handleVisitPortal}
                  sx={{ fontSize: '0.75rem' }}
                >
                  {t('user-detail.visit-portal')}
                </Button>
              </Box>
              
              {renderInfoItem(
                <EmailIcon sx={{ fontSize: '1.2rem' }} />,
                t('user-detail.fields.email'),
                user.email,
                user.emailVerified
              )}
              
              {renderInfoItem(
                <PhoneIcon sx={{ fontSize: '1.2rem' }} />,
                t('user-detail.fields.phone-number'),
                user.phoneNum
              )}
              
              {renderInfoItem(
                <LocationOnIcon sx={{ fontSize: '1.2rem' }} />,
                t('user-detail.fields.address'),
                user.address
              )}
              
              {renderInfoItem(
                <WorkIcon sx={{ fontSize: '1.2rem' }} />,
                t('user-detail.fields.profession'),
                user.profession
              )}
              
              {renderInfoItem(
                <LinkIcon sx={{ fontSize: '1.2rem' }} />,
                t('user-detail.fields.blog'),
                user.blog
              )}

              {renderInfoItem(
                <AccessTimeIcon sx={{ fontSize: '1.2rem' }} />,
                t('user-detail.fields.create-time'),
                formatDateTime(user.createTime)
              )}

              {renderInfoItem(
                <UpdateIcon sx={{ fontSize: '1.2rem' }} />,
                t('user-detail.fields.update-time'),
                formatDateTime(user.updateTime)
              )}
            </CardContent>
          </Card>

          {/* User Roles */}
          <Card sx={{ mb: 3, elevation: 0, border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                {t('user-detail.roles')}
              </Typography>

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>{t('user-detail.select-roles')}</InputLabel>
                <Select
                  multiple
                  value={selectedRoles}
                  onChange={handleRoleChange}
                  label={t('user-detail.select-roles')}
                  sx={{
                    '& .MuiSelect-select': {
                      padding: '12px 14px',
                    },
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => {
                        const roleInfo = getAvailableRoles().find(r => r.value === value);
                        return (
                          <Chip 
                            key={value} 
                            label={roleInfo?.label || value} 
                            size="small" 
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {getAvailableRoles().map((role) => (
                    <MenuItem 
                      key={role.value} 
                      value={role.value}
                      disabled={role.value === 'ROLE_BASIC' && selectedRoles.includes('ROLE_BASIC')}
                    >
                      {role.label}
                      {role.value === 'ROLE_BASIC' && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary" 
                          sx={{ ml: 1, fontSize: '0.7rem' }}
                        >
                          ({t('user-detail.required')})
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {hasRoleChanged && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleUpdateRoles}
                  disabled={updatingRoles}
                  sx={{ fontSize: '0.75rem' }}
                >
                  {updatingRoles ? t('user-detail.updating-roles') : t('user-detail.update-roles')}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Introduction */}
          {user.introduction && (
            <Card sx={{ mb: 3, elevation: 0, border: `1px solid ${theme.palette.divider}` }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  {t('user-detail.introduction')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.introduction}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons at Bottom */}
          {((!user.emailVerified) || onDelete) && (
            <Box sx={{ display: 'flex', gap: 1, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              {!user.emailVerified && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<MailOutlineIcon />}
                  onClick={handleResendEmail}
                  disabled={resendingEmail}
                  sx={{ fontSize: '0.75rem', flexGrow: 1 }}
                >
                  {resendingEmail ? t('email-verification.msg.sending') : t('email-verification.btn.resend')}
                </Button>
              )}
              
              {onDelete && (
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteClick}
                  sx={{ fontSize: '0.75rem', flexGrow: 1 }}
                >
                  {t('components.standard-button.delete')}
                </Button>
              )}
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {t('user-detail.no-data')}
          </Typography>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialogx
        title={t('dialog.delete.title')}
        content={t('dialog.delete.content')}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        closeBtnText={t('dialog.cancel')}
        onAction={handleConfirmDelete}
        actionBtnText={t('dialog.confirm')}
      />
    </Drawer>
  );
} 