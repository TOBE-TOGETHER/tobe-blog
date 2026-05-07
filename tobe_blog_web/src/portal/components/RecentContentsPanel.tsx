import { Container, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../commons';
import { IBaseUserContentDTO } from '../../global/types';
import * as PublicDataService from '../../services/PublicDataService';
import RelevantContentItem from './RelvantContentIteam';

export default function RecentContentsPanel() {
  const DEFAULT_PAGE_SIZE: number = 12;
  const [data, setData] = useState<IBaseUserContentDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useCommonUtils();

  useEffect(() => {
    loadData();
    return () => {
      setData([]);
    };
  }, []);

  function loadData(): void {
    setIsLoading(true);
    PublicDataService.getNewsByTags('', DEFAULT_PAGE_SIZE, 1, [], '', '', '')
      .then(response => {
        setData(response.data.records);
      })
      .catch(error => {
        console.error(`Failed to fetch recent contents: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ position: 'relative', zIndex: 2, minHeight: 360 }}
    >
      <Divider>
        <Typography
          variant="h5"
          color="textSecondary"
        >
          {t('components.recent-contents')}
        </Typography>
      </Divider>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2, mb: 10 }}
      >
          {isLoading &&
            Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
              <Grid
                container
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                key={`recent-skeleton-${index}`}
              >
                <Grid container sx={{ width: '100%' }}>
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={160}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="55%"
                    animation="wave"
                    sx={{ mt: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width="85%"
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="70%"
                    animation="wave"
                  />
                </Grid>
              </Grid>
            ))}
          {!isLoading &&
            data.map(item => (
              <RelevantContentItem
                content={item}
                key={`recent-item-${item.id}`}
              />
            ))}
      </Grid>
      </Container>
  );
}
