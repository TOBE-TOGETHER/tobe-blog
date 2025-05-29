import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert,
  Delete,
} from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCommentDate } from '../../../commons/TimeFormat';

interface CommentHeaderProps {
  readonly userName: string;
  readonly userAvatarUrl?: string;
  readonly createTime: string;
  readonly canDelete: boolean;
  readonly onDeleteClick: () => void;
}

export default function CommentHeader({
  userName,
  userAvatarUrl,
  createTime,
  canDelete,
  onDeleteClick,
}: CommentHeaderProps) {
  const { t } = useTranslation();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const formatDate = (dateString: string) => {
    return formatCommentDate(dateString, t);
  };

  const handleDeleteClick = () => {
    onDeleteClick();
    setMenuAnchor(null);
  };

  return (
    <>
      <Box display="flex" gap={2}>
        <Avatar
          src={userAvatarUrl}
          alt={userName}
          sx={{ 
            width: 44, 
            height: 44,
            border: '2px solid',
            borderColor: 'grey.200'
          }}
        >
          {userName[0]?.toUpperCase()}
        </Avatar>
        
        <Box flex={1}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="subtitle2" component="span" fontWeight="600" color="text.primary">
                {userName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {formatDate(createTime)}
              </Typography>
            </Box>
            
            {canDelete && (
              <IconButton
                size="small"
                onClick={(e) => setMenuAnchor(e.currentTarget)}
                sx={{ 
                  opacity: 0.6,
                  '&:hover': { opacity: 1 }
                }}
              >
                <MoreVert fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      {/* Delete Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <MenuItem onClick={handleDeleteClick}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          {t('comments.item.delete')}
        </MenuItem>
      </Menu>
    </>
  );
} 