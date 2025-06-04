import { Grid, Paper, Typography } from '@mui/material';
import { TimeFormat, useCommonUtils } from '../../commons';
import { IBaseUserContentDTO } from '../../global/types';
import theme from '../../theme';
import config from '../../../customization.json';

export default function RelevantContentItem(props: Readonly<{ content: IBaseUserContentDTO }>) {
  const { t, navigate } = useCommonUtils();
  return (
    <Grid
      container
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      sx={{
        'cursor': 'pointer',
        '&:hover': {
          color: theme.palette.primary.main,
          transform: 'scale(1.02)',
          transition: 'all .2s ease-in-out',
        },
      }}
      onClick={() => navigate(`/content/${props.content.id}`)}
    >
      <Grid
        component={Paper}
        container
        direction="column"
        sx={{ width: '100%', borderRadius: 4, overflow: 'hidden', position: 'relative', zIndex: 1 }}
      >
        <Grid
          sx={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url(${props.content.coverImgUrl || config.defaultContentCoverImgUrl});`,
            position: 'relative',
            width: '100%',
            maxHeight: '160px',
            height: {
              xs: '160px',
              sm: '140px',
              md: '130px',
              lg: '120px',
            },
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            overflow: 'hidden',
          }}
        />

        <Grid
          container
          sx={{ px: 2 }}
          justifyContent={'space-between'}
        >
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontWeight: '800', mt: 1, maxWidth: '60%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {props.content.ownerName}
          </Typography>
          <Grid
            container
            sx={{
              position: 'relative',
              width: '50px',
              height: '50px',
              overflow: 'hidden',
              backgroundColor: theme.palette.common.white,
              mt: '-25px',
              borderRadius: '30px',
              zIndex: 2,
            }}
          >
            <Grid
              sx={{
                background: `url(${props.content.avatarUrl}); no-repeat center/cover`,
                mt: '8px',
                ml: '5px',
                width: '40px',
                height: '40px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          </Grid>
        </Grid>
        <Grid
          sx={{ px: 2, mt: 1 }}
          container
          justifyContent={'space-between'}
        >
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ maxWidth: '45%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {TimeFormat.briefDateFormat(props.content.publishTime)}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ maxWidth: '55%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {t('components.meta-bar.view')} {props.content.viewCount} · {t('components.meta-bar.like')} {props.content.likeCount}
          </Typography>
        </Grid>
        <Grid sx={{ p: 2 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{
              maxHeight: '48px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 'bold',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {props.content.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{
              maxHeight: '80px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              mt: 1,
            }}
          >
            {props.content.description}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
