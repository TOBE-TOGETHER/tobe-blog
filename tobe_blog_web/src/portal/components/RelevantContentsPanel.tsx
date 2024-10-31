import { Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IBaseUserContentDTO } from '../../global/types';
import * as PublicDataService from '../../services/PublicDataService';
import RelevantContentItem from './RelvantContentIteam';
import { useTranslation } from 'react-i18next';

export default function RelevantContentsPanel(props: Readonly<{ content: IBaseUserContentDTO }>) {
  const { t } = useTranslation();
  const [relevantContents, setRelevantContents] = useState<IBaseUserContentDTO[]>([]);

  useEffect(() => {
    PublicDataService.getNewsByTags(
      props.content.contentType,
      100,
      1,
      props.content.tags.map(t => t.value),
      ''
    ).then(response => {
      let records = response.data.records.filter((r: IBaseUserContentDTO) => r.id !== props.content.id);
      setRelevantContents(records);
    });
  }, [props.content]);

  return relevantContents.length > 0 ? (
    <Grid container sx={{ mt: 10 }} justifyContent='center'>
      <Divider>
        <Typography variant='h5' color='textSecondary'>
        {t('components.relevant-contents')}</Typography>
      </Divider>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        {relevantContents.map((c: IBaseUserContentDTO) => (
          <RelevantContentItem
            content={c}
            key={`relevant-item-${c.id}`}
          />
        ))}
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
