import { Grid, Link, Typography } from '@mui/material';
import { TimeFormat, useCommonUtils } from '../../commons';
import { ITagOption } from '../../global/types';
import { URL } from '../../routes';
import theme from '../../theme';
import TagDisplayBar from './TagDisplayBar';

export default function NewsListItem(
  props: Readonly<{
    owner: string;
    ownerId: number | string;
    title: string;
    description: string;
    publishTime: string | null;
    viewCount: number;
    likeCount: number;
    isRecommended?: boolean;
    tags: ITagOption[];
    onClick: () => void;
  }>
) {
  const { t } = useCommonUtils();
  return (
    <Grid
      container
      item
      onClick={props.onClick}
      xs={12}
      sx={{
        borderBottom: '1px solid rgba(0,0,0,0.12)',
        p: 2,
      }}
    >
      <Grid
        container
        item
        xs={12}
        sx={{
          'cursor': 'pointer',
          '&:hover': {
            color: theme.palette.primary.main,
          },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ wordBreak: 'break-all' }}
        >
          <b>{props.title}</b>
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          'my': 1,
          'maxHeight': '80px',
          'overflow': 'hidden',
          'textOverflow': 'ellipsis',
          'color': theme.palette.text.secondary,
          'cursor': 'pointer',
          '&:hover': {
            color: theme.palette.primary.main,
          },
        }}
      >
        <Typography variant="body2">{props.description}</Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          <Link
            href={URL.PERSONAL_PORTAL.replace(':id', props.ownerId + '')}
            underline="none"
            target="blank"
            color="text.secondary"
          >
            {props.owner}
          </Link>{' '}
          · {TimeFormat.briefDateFormat(props.publishTime)} · {t('home-page.view-count')} {props.viewCount} · {t('home-page.like-count')} {props.likeCount}
        </Typography>
      </Grid>
      <Grid
        container
        item
        sx={{
          justifyContent: 'space-between',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 0,
        }}
        xs={12}
      >
        <TagDisplayBar tags={props.tags} />
        {props.isRecommended && (
          <Typography
            alignContent="end"
            color="primary"
          >
            RECOMMEND
          </Typography>
        )}
        {props.isRecommended && (
          <Grid
            item
            sx={{
              top: '-10px',
              width: '100px',
              zIndex: '-1',
              height: '100px',
              right: '-80px',
              opacity: '0.12',
              position: 'absolute',
              transform: 'rotate(45deg)',
              background: 'blue',
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
