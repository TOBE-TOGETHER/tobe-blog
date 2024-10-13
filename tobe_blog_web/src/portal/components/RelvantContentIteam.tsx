import { Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getPathFromContentType, TimeFormat } from '../../commons';
import { IBaseUserContentDTO } from '../../global/types';
import theme from '../../theme';

export default function RelevantContentItem(props: Readonly<{ content: IBaseUserContentDTO }>) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Grid
      container
      item
      xs={12}
      sm={12}
      md={6}
      lg={4}
      xl={3}
      sx={{
        'cursor': 'pointer',
        '&:hover': {
          color: theme.palette.primary.main,
          transform: 'scale(1.02)',
          transition: 'all .2s ease-in-out',
        },
      }}
      onClick={() => navigate(`/news/${getPathFromContentType(props.content.contentType)}/${props.content.id}`)}
    >
      <Grid
        component={Paper}
        container
        direction="column"
        sx={{ width: '100%', borderRadius: 4, overflow: 'hidden' }}
      >
        <Grid
          sx={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url(${props.content.coverImgUrl});`,
            position: 'relative',
            width: '100%',
            height: {
              xs: '220px',
              sm: '170px',
              md: '100px',
            },
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            overflow: 'hidden',
          }}
        />
        <Grid
          container
          sx={{
            position: 'relative',
            left: '25px',
            width: '50px',
            height: '50px',
            overflow: 'hidden',
            backgroundColor: theme.palette.common.white,
            mt: '-20px',
            borderRadius: '25px',
          }}
        >
          <Grid
            sx={{
              backgroundImage: `url(${props.content.avatarUrl});`,
              mt: '5px',
              ml: '5px',
              width: '40px',
              height: '40px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
        </Grid>
        <Grid
          container
          sx={{ px: 2, mt: '-25px' }}
          justifyContent={'flex-end'}
        >
          <Typography
            variant="subtitle2"
            color="textSecondary"
          >
            {props.content.ownerName}
          </Typography>
        </Grid>
        <Grid
          sx={{ px: 2, mt: 1 }}
          container
          justifyContent={'space-between'}
        >
          <Typography
            variant="subtitle2"
            color="textSecondary"
          >
            {TimeFormat.briefDateFormat(props.content.publishTime)}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
          >
            {t('components.meta-bar.view')} {props.content.viewCount} · {t('components.meta-bar.like')} {props.content.likeCount}
          </Typography>
        </Grid>
        <Grid sx={{ p: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ maxHeight: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {props.content.title} : {props.content.description}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
