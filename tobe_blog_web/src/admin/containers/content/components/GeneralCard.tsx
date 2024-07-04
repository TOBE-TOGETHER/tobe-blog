import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Chip, Grid, Paper, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import config from '../../../../../customization.json';
import { dateMonFormat } from '../../../../commons/TimeFormat';
import { IBaseUserContentDTO, IOperation } from '../../../../global/types';
import theme from '../../../../theme';
import { CardHeaderActionButton } from '../../../components';

export function GeneralCard(props: { record: IBaseUserContentDTO; onClick?: (id: string | number) => void; operations: IOperation[] }) {
  const { t } = useTranslation();
  return (
    <Grid
      item
      xs={12}
      sm={6}
      key={props.record.id}
    >
      <Paper sx={{ borderRadius: 4 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={8}
            xl={8}
            sx={{ p: 3, flexDirection: 'column', pb: { xs: 0, sm: 0, md: 3 } }}
          >
            <Grid container>
              <Grid flexGrow={1}>
                {props.record.publicToAll ? (
                  <Tooltip title={t('components.general-card-view.title.open')}>
                    <Chip
                      sx={{ borderRadius: 1, height: '28px', p: 0, fontWeight: 800, color: theme.palette.info.dark }}
                      label={t('components.general-card-view.published')}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title={t('components.general-card-view.title.private')}>
                    <Chip
                      sx={{ borderRadius: 1, height: '28px', p: 0, fontWeight: 800, color: theme.palette.text.secondary }}
                      label={t('components.general-card-view.draft')}
                    />
                  </Tooltip>
                )}
              </Grid>
              <Grid flexGrow={0}>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {dateMonFormat(props.record.createTime)}
                </Typography>
              </Grid>
            </Grid>
            <Typography
              onClick={() => props.onClick && props.onClick(props.record.id)}
              sx={{
                'mt': 2,
                'mb': 1,
                'width': '100%',
                'fontWeight': 500,
                'maxWidth': '100%',
                'display': 'block',
                'whiteSpace': 'nowrap',
                'overflow': 'hidden',
                'textOverflow': 'ellipsis',
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline',
                },
              }}
            >
              {props.record.title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: '100%',
                height: '40px',
                display: 'block',
                whiteSpace: 'wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {props.record.description}
            </Typography>
            <Grid
              container
              sx={{ my: 1 }}
            >
              {props.record?.tags?.map(t => (
                <Chip
                  key={`${props.record.id}-tag-${t.label}`}
                  label={t.label}
                  variant="outlined"
                  sx={{ borderRadius: 3, height: '28px', p: 0, mr: 1, fontWeight: 400, color: theme.palette.text.secondary }}
                />
              ))}
            </Grid>
            <Grid container>
              <Grid
                item
                flexGrow={1}
              >
                <CardHeaderActionButton
                  data={props.record}
                  operations={props.operations}
                />
              </Grid>
              <Grid
                item
                alignItems="center"
                sx={{ display: 'inline-flex' }}
              >
                <VisibilityIcon
                  color="disabled"
                  sx={{ width: '16px', mr: 1 }}
                />
                <Typography
                  color="textSecondary"
                  variant="body2"
                  sx={{ mr: 1 }}
                >
                  {props.record.viewCount}
                </Typography>
                <FavoriteIcon
                  color="disabled"
                  sx={{ width: '16px', mr: 1 }}
                />
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {props.record.likeCount}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
          >
            <Grid
              container
              width="100%"
              height="100%"
              p={1}
              sx={{ maxHeight: { xs: '160px', sm: '160px', md: '252px' } }}
            >
              <img
                style={{ objectFit: 'cover', verticalAlign: 'bottom', borderRadius: '16px' }}
                width="100%"
                height="100%"
                src={props.record.coverImgUrl || config.defaultContentCoverImgUrl}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
