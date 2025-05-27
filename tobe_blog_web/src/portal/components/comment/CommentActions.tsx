import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  Reply,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface CommentActionsProps {
  readonly liked: boolean;
  readonly likeCount: number;
  readonly onLike: () => void;
  readonly onReply: () => void;
}

export default function CommentActions({
  liked,
  likeCount,
  onLike,
  onReply,
}: CommentActionsProps) {
  const { t } = useTranslation();

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        size="small"
        startIcon={liked ? <ThumbUp sx={{ fontSize: 16 }} /> : <ThumbUpOutlined sx={{ fontSize: 16 }} />}
        onClick={onLike}
        sx={{ 
          minWidth: 'auto', 
          px: 1.5,
          py: 0.5,
          borderRadius: '20px',
          fontSize: '0.8rem',
          color: liked ? 'primary.main' : 'text.secondary',
          backgroundColor: liked ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
          '&:hover': {
            backgroundColor: liked ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        {likeCount > 0 && (
          <Typography variant="caption" sx={{ ml: 0.5, fontSize: '0.75rem' }}>
            {likeCount}
          </Typography>
        )}
      </Button>
      
      <Button
        size="small"
        startIcon={<Reply sx={{ fontSize: 16 }} />}
        onClick={onReply}
        sx={{ 
          minWidth: 'auto', 
          px: 1.5,
          py: 0.5,
          borderRadius: '20px',
          fontSize: '0.8rem',
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            color: 'primary.main'
          }
        }}
      >
        {t('comments.item.reply')}
      </Button>
    </Box>
  );
} 