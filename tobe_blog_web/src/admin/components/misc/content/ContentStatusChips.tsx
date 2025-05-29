import RecommendIcon from '@mui/icons-material/Recommend';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Chip, useTheme } from '@mui/material';
import { useCommonUtils } from '../../../../commons';
import { IBaseUserContentDTO } from '../../../../global/types';

interface IContentStatusChipsProps {
  readonly content: IBaseUserContentDTO;
  readonly variant?: 'stats' | 'admin';
}

export default function ContentStatusChips({ content, variant = 'stats' }: IContentStatusChipsProps) {
  const { t } = useCommonUtils();
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
      {!content.publicToAll && (
        <Chip
          label={variant === 'admin' ? t('content-admin.status.draft') : t('content-stats.draft')}
          variant="outlined"
          size="small"
          sx={{ 
            color: theme.palette.warning.main,
            borderColor: theme.palette.warning.main
          }}
        />
      )}
      {content.recommended && (
        <Chip
          icon={<RecommendIcon />}
          label={variant === 'admin' ? t('content-admin.status.recommended') : t('content-stats.recommended')}
          size="small"
          sx={{ 
            backgroundColor: '#FFD700', 
            color: '#000',
            fontWeight: 'bold'
          }}
        />
      )}
      {content.banned && (
        <Chip
          icon={<WarningIcon />}
          label={variant === 'admin' ? t('content-admin.status.banned') : t('content-stats.banned')}
          color="error"
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      )}
      {content.publicToAll && !content.recommended && !content.banned && (
        <Chip
          label={variant === 'admin' ? t('components.general-card-view.published') : t('content-stats.normal')}
          variant="outlined"
          size="small"
          sx={{ 
            color: variant === 'admin' ? theme.palette.success.main : theme.palette.text.secondary,
            borderColor: variant === 'admin' ? theme.palette.success.main : undefined
          }}
        />
      )}
    </Box>
  );
} 