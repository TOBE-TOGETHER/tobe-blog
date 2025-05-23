import { Container, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../commons';
import { IBaseUserContentDTO } from '../../global/types';
import * as PublicDataService from '../../services/PublicDataService';
import RelevantContentItem from './RelvantContentIteam';

export default function RecentContentsPanel() {
  const DEFAULT_PAGE_SIZE: number = 12;
  const [data, setData] = useState<IBaseUserContentDTO[]>([]);
  const { t } = useCommonUtils();

  useEffect(() => {
    loadData();
    return () => {
      setData([]);
    };
  }, []);

  function loadData(): void {
    PublicDataService.getNewsByTags('', DEFAULT_PAGE_SIZE, 1, [], '', '', '').then(response => {
      setData(data.concat(response.data.records));
    });
  }

  return data.length > 0 ? (
    <Container
      maxWidth="lg"
      sx={{ position: 'relative', zIndex: 2 }}
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
        {data.map(item => (
          <RelevantContentItem
            content={item}
            key={`recent-item-${item.id}`}
          />
        ))}
      </Grid>
    </Container>
  ) : (
    <></>
  );
}
