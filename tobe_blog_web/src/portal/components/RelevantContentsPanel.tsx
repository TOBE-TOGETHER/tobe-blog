import { Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../commons';
import { InfiniteScrollList } from '../../components';
import { IBaseUserContentDTO } from '../../global/types';
import * as PublicDataService from '../../services/PublicDataService';
import RelevantContentItem from './RelvantContentIteam';

export default function RelevantContentsPanel(props: Readonly<{ content: IBaseUserContentDTO }>) {
  const { t } = useCommonUtils();
  const DEFAULT_PAGE_SIZE: number = 12;
  const [relevantContents, setRelevantContents] = useState<IBaseUserContentDTO[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadData({ reset: true });
  }, [props.content]);

  function loadData(option: { reset: boolean }): void {
    setLoading(true);
    PublicDataService.getNewsByTags(
      props.content.contentType,
      DEFAULT_PAGE_SIZE,
      option.reset ? 1 : current + 1,
      props.content.tags.map(t => Number.parseInt(t.value)),
      '',
      '',
      ''
    )
      .then(response => {
        let records = response.data.records.filter((r: IBaseUserContentDTO) => r.id !== props.content.id);
        setRelevantContents(relevantContents.concat(records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return relevantContents.length > 0 ? (
    <Grid
      container
      sx={{ mt: 10 }}
      justifyContent="center"
    >
      <Divider>
        <Typography
          variant="h5"
          color="textSecondary"
        >
          {t('components.relevant-contents')}
        </Typography>
      </Divider>
      <Grid
        container
        sx={{ mt: 5 }}
      >
        <InfiniteScrollList
          loading={loading}
          option={{ reset: false }}
          dataSource={relevantContents}
          hasMore={current < totalPage}
          loadMore={loadData}
          renderItem={(c: IBaseUserContentDTO) => (
            <RelevantContentItem
              content={c}
              key={`relevant-item-${c.id}`}
            />
          )}
        />
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
