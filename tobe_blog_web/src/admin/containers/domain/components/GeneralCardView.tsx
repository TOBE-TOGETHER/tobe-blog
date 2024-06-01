import LockIcon from '@mui/icons-material/Lock';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { dateAndTimeFormat } from '../../../../commons/TimeFormat';
import {
  GeneralCardData,
  Operation,
} from '../../../../global/types';
import theme from '../../../../theme';
import {
  CardHeaderActionButton,
  InfiniteScrollList,
} from '../../../components';

export default function GeneralCardView(props: {
  loading: boolean;
  data: GeneralCardData[];
  current: number;
  totalPage: number;
  operations: Operation[];
  loadMore: () => void;
  onClick?: (id: number | string) => void;
}) {
  const { t } = useTranslation();
  
  function buildTitle(record: GeneralCardData) {
    return (
      <Grid container>
        {' '}
        {record.publicToAll ? (
          <Tooltip title={t('components.general-card-view.title.open')}>
            <VerifiedIcon color="info" />
          </Tooltip>
        ) : (
          <Tooltip title={t('components.general-card-view.title.private')}>
            <LockIcon sx={{ color: theme.palette.warning.main }} />
          </Tooltip>
        )}{' '}
        <Typography
          sx={{
            ml: 1,
            width: '80%',
            maxWidth: '80%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {record.tags.map((t) => t.label).join(', ')}
        </Typography>
      </Grid>
    );
  }
  
  return (
    <Grid container>
      <InfiniteScrollList
        loading={props.loading}
        dataSource={props.data}
        hasMore={props.current < props.totalPage}
        loadMore={props.loadMore}
        renderItem={(record: GeneralCardData) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={record.id}
          >
            <Card variant="outlined">
              <CardHeader
                action={
                  <CardHeaderActionButton
                    data={record}
                    operations={props.operations}
                  />
                }
                sx={{ py: 1 }}
                title={buildTitle(record)}
                titleTypographyProps={{ fontSize: '1rem' }}
                subheader={dateAndTimeFormat(record.createTime)}
                subheaderTypographyProps={{ fontSize: '0.75rem' }}
              />
              <Divider />
              <CardContent
                sx={{
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => props.onClick && props.onClick(record.id)}
              >
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    width: '100%',
                    maxWidth: '100%',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {record.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: '100%',
                    height: 60,
                    display: 'block',
                    whiteSpace: 'wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {record.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      />
    </Grid>
  );
}
