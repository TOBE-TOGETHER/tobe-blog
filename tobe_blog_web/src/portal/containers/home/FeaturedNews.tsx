import { Button, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getPathFromContentType, useCommonUtils } from '../../../commons';
import { EContentType } from '../../../global/enums';
import { IBaseUserContentDTO } from '../../../global/types';
import * as PublicDataService from '../../../services/PublicDataService.ts';
import LoadingNewsSkeleton from './LoadingNewsSkeleton.tsx';
import NewsListItem from './NewsListItem';
import NoContentNewsItem from './NoContentNewsItem.tsx';

enum LoadType {
  Append,
  Replace,
}

export default function FeaturedNews(
  props: Readonly<{
    tags: number[];
    ownerId: string;
    contentType: EContentType;
    availableContentTypes: EContentType[];
    handleContentTypeChange: (newValue: EContentType) => void;
  }>
) {
  const { t } = useCommonUtils();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<IBaseUserContentDTO[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const loadNews = useCallback(
    (_contentType: EContentType, _loadType: LoadType, _currentPage: number, _tags: number[], _newsData: IBaseUserContentDTO[], _ownerId: string, _withLoading: boolean): void => {
      _withLoading && setIsLoading(true);
      PublicDataService.getNewsByTags(_contentType, 10, _currentPage, _tags, _ownerId)
        .then(response => {
          if (_loadType === LoadType.Append) {
            setNewsData(_newsData.concat(response.data.records));
          } else {
            setNewsData(response.data.records);
          }
          setCurrent(response.data.current);
          setTotalPage(response.data.pages);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          _withLoading && setIsLoading(false);
        });
    },
    []
  );

  // based on current filters and load more data
  const handleLoadMoreRecords = (): void => {
    loadNews(props.contentType, LoadType.Append, current + 1, props.tags, newsData, props.ownerId, false);
  };

  useEffect(() => {
    // reset filter and load the first page data
    const handleTagFilterChange = (): void => {
      loadNews(props.contentType, LoadType.Replace, 1, props.tags, newsData, props.ownerId, true);
    };
    handleTagFilterChange();
  }, [props.contentType, props.tags, loadNews]); // eslint-disable-line

  return (
    <Grid
      container
      component={Paper}
      sx={{ p: 1, width: '100%', borderRadius: 4 }}
    >
      <Tabs
        value={props.contentType}
        onChange={(_: React.SyntheticEvent, newValue: EContentType) => props.handleContentTypeChange(newValue)}
        sx={{
          'width': '100%',
          'borderBottom': '1px solid rgba(0,0,0,0.12)',
          '& .MuiTab-root': {
            fontSize: '1rem',
            fontWeight: 400,
            py: 1.5,
            lineHeight: 1.75,
          },
        }}
        variant="fullWidth"
      >
        {props.availableContentTypes.includes(EContentType.Article) && (
          <Tab
            value={EContentType.Article}
            label={t('home-page.articles')}
            sx={{ borderRadius: 4 }}
          />
        )}
        {props.availableContentTypes.includes(EContentType.Plan) && (
          <Tab
            value={EContentType.Plan}
            label={t('home-page.plans')}
            sx={{ borderRadius: 4 }}
          />
        )}
        {props.availableContentTypes.includes(EContentType.Vocabulary) && (
          <Tab
            value={EContentType.Vocabulary}
            label={t('home-page.vocabularies')}
            sx={{ borderRadius: 4 }}
          />
        )}
        {props.availableContentTypes.includes(EContentType.Collection) && (
          <Tab
            value={EContentType.Collection}
            label={t('home-page.collections')}
            sx={{ borderRadius: 4 }}
          />
        )}
      </Tabs>
      {isLoading ? (
        <LoadingNewsSkeleton />
      ) : (
        <NewsList
          newsData={newsData}
          totalPage={totalPage}
          current={current}
          handleLoadMoreRecords={handleLoadMoreRecords}
        />
      )}
    </Grid>
  );
}
const NewsList = (props: { newsData: IBaseUserContentDTO[]; totalPage: number; current: number; handleLoadMoreRecords: () => void }) => {
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
          onClick={() => navigate(`/news/${getPathFromContentType(n.contentType)}/${n.id}`)}
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
};

