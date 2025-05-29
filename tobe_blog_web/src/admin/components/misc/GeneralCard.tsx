import BlockIcon from '@mui/icons-material/Block';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecommendIcon from '@mui/icons-material/Recommend';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SellIcon from '@mui/icons-material/Sell';
import { Chip, Grid, Paper, Tooltip, Typography } from '@mui/material';
import config from '../../../../customization.json';
import { useCommonUtils } from '../../../commons';
import { dateMonFormat } from '../../../commons/TimeFormat';
import { IBaseUserContentDTO } from '../../../global/types';
import theme from '../../../theme';

export function GeneralCard(props: Readonly<{ record: IBaseUserContentDTO; onClick?: (id: string | number) => void }>) {
  const { t } = useCommonUtils();
  const hasTopic = props.record.topic ?? props.record.tags?.length;
  return (
    <Grid item xs={12} sm={6} onClick={() => props.onClick?.(props.record.id)}>
      <Paper sx={{ 
        borderRadius: 4, 
        boxShadow: theme.shadows[4], 
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          cursor: 'pointer',
        }
      }}>
        <Grid container>
          {/* Content Section */}
          <Grid item xs={12} md={6} lg={8} sx={{ p: 3, pb: { xs: 0, md: 3 } }}>
            {/* Status and Date */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  label={props.record.publicToAll ? t('components.general-card-view.published') : t('components.general-card-view.draft')}
                  sx={{ 
                    borderRadius: 1, 
                    height: '28px', 
                    fontWeight: 800, 
                    color: props.record.publicToAll ? theme.palette.info.dark : theme.palette.text.secondary 
                  }}
                />
                {props.record.banned && (
                  <Tooltip title={t('components.general-card-view.banned-tip')}>
                    <BlockIcon sx={{ ml: 1, color: '#F08080' }} />
                  </Tooltip>
                )}
                {props.record.recommended && (
                  <Tooltip title={t('components.general-card-view.recommended-tip')}>
                    <RecommendIcon sx={{ ml: 1, color: '#FFD700' }} />
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <Typography color="textSecondary" variant="body2">
                  {dateMonFormat(props.record.createTime)}
                </Typography>
              </Grid>
            </Grid>

            {/* Title */}
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {props.record.title}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                height: '40px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {props.record.description}
            </Typography>

            {/* Stats and Tags */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <VisibilityIcon sx={{ width: 16, mr: 0.5, color: 'text.disabled' }} />
                <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
                  {props.record.viewCount}
                </Typography>
                <FavoriteIcon sx={{ width: 16, mr: 0.5, color: 'text.disabled' }} />
                <Typography variant="body2" color="textSecondary">
                  {props.record.likeCount}
                </Typography>
              </Grid>
              
              {hasTopic && (
                <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                  <SellIcon sx={{ width: 16, mr: 0.5, color: 'text.disabled' }} />
                  {props.record.topic && (
                    <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                      {t(`topic.${props.record.topic}`)}
                    </Typography>
                  )}
                  {props.record.tags?.slice(0, 2).map(tag => (
                    <Typography
                      key={tag.label}
                      variant="body2"
                      color="textSecondary"
                      sx={{ mr: 0.5 }}
                    >
                      {tag.label}
                    </Typography>
                  ))}
                  {props.record.tags && props.record.tags.length > 2 && (
                    <Typography variant="body2" color="textSecondary">
                      +{props.record.tags.length - 2}
                    </Typography>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={6} lg={4}>
            <Grid container sx={{ p: 1, height: { xs: '160px', md: '205px' } }}>
              <img
                alt="cover"
                src={props.record.coverImgUrl || config.defaultContentCoverImgUrl}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  borderRadius: '16px' 
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
