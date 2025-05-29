import { Grid, Paper } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { EContentType } from '../../global/enums';
import { IBaseUserContentDTO, TopicPropsType } from '../../global/types';
import * as PublicDataService from '../../services/PublicDataService';
import LoadingNewsSkeleton from './LoadingNewsSkeleton';
import NewsList from './NewsList.tsx';

enum LoadType {
  Replace,
  Append
}

export default function FeaturedNews(
  props: Readonly<{
    tags: number[];
    ownerId: string;
    selectedContentTypes: EContentType[];
    topic?: TopicPropsType;
    keyword: string;
  }>
) {
  const [newsData, setNewsData] = useState<IBaseUserContentDTO[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadNews = useCallback(
    (
      _selectedContentTypes: EContentType[],
      _loadType: LoadType,
      _currentPage: number,
      _tags: number[],
      _newsData: IBaseUserContentDTO[],
      _ownerId: string,
      _withLoading: boolean,
      _topic: TopicPropsType,
      _keyword: string
    ): void => {
      _withLoading && setIsLoading(true);
      // If no content types selected, show all content types
      const contentTypesToLoad = _selectedContentTypes.length > 0 ? _selectedContentTypes : '';
      PublicDataService.getNewsByTags(contentTypesToLoad, 10, _currentPage, _tags, _ownerId, _topic, _keyword)
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
    loadNews(props.selectedContentTypes, LoadType.Append, current + 1, props.tags, newsData, props.ownerId, false, props.topic, props.keyword);
  };

  useEffect(() => {
    // reset filter and load the first page data
    const handleFilterChange = (): void => {
      loadNews(props.selectedContentTypes, LoadType.Replace, 1, props.tags, newsData, props.ownerId, true, props.topic, props.keyword);
    };
    handleFilterChange();
  }, [props.selectedContentTypes, props.tags, loadNews, props.topic, props.keyword]);

  // eslint-disable-line

  return (
    <Grid
      container
      component={Paper}
      sx={{ p: 1, width: '100%', borderRadius: 4 }}
    >
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
