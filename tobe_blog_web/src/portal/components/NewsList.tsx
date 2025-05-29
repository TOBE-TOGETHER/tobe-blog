import { Button, Grid, Typography } from '@mui/material';
import { useCommonUtils } from '../../commons';
import { IBaseUserContentDTO } from '../../global/types';
import NewsListItem from './NewsListItem';
import NoContentNewsItem from './NoContentNewsItem';

export default function NewsList(props: {
  newsData: IBaseUserContentDTO[];
  totalPage: number;
  current: number;
  handleLoadMoreRecords: () => void
}) {
  const { newsData, totalPage, current, handleLoadMoreRecords } = props;
  const { t, navigate } = useCommonUtils();
  
  return newsData.length > 0 ? (
    <>
      {newsData.map(n => (
        <NewsListItem
          isRecommended={n.recommended}
          key={n.id}
          owner={n.ownerName}
          ownerId={n.ownerId}
          title={n.title}
          description={n.description}
          publishTime={n.publishTime}
          viewCount={n.viewCount}
          likeCount={n.likeCount}
          tags={n.tags}
          onClick={() => navigate(`/content/${n.id}`)}
        />
      ))}
      {current >= totalPage ? (
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          sx={{ my: 1 }}
        >
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {t('home-page.end-line')}
          </Typography>
        </Grid>
      ) : (
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          sx={{ my: 1 }}
        >
          <Button
            variant="text"
            onClick={handleLoadMoreRecords}
          >
            {t('home-page.load-more')}
          </Button>
        </Grid>
      )}
    </>
  ) : (
    <NoContentNewsItem />
  );
} 