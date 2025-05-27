import {
  Box,
  Typography,
} from '@mui/material';
import {
  Reply,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface CommentQuoteProps {
  readonly replyToUserName: string;
  readonly replyToContent: string;
}

export default function CommentQuote({
  replyToUserName,
  replyToContent,
}: CommentQuoteProps) {
  const { t } = useTranslation();

  return (
    <Box 
      sx={{ 
        mt: 1, 
        mb: 2, 
        p: 2, 
        backgroundColor: 'rgba(25, 118, 210, 0.04)',
        borderLeft: '4px solid',
        borderLeftColor: 'primary.main',
        borderRadius: '8px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(25, 118, 210, 0.1)'
        }
      }}
    >
      <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
        <Reply sx={{ fontSize: 16, color: 'primary.main' }} />
        <Typography variant="caption" color="primary.main" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
          {t('comments.item.reply-to')} {replyToUserName}
        </Typography>
      </Box>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          fontStyle: 'italic',
          lineHeight: 1.4,
          pl: 3,
          borderLeft: '2px solid',
          borderLeftColor: 'grey.300',
          fontSize: '0.875rem'
        }}
      >
        "{replyToContent}"
      </Typography>
    </Box>
  );
} 