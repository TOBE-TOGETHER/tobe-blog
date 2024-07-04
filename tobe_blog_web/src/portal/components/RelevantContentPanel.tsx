import { useEffect, useState, useCallback } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import { SidePanel } from '../../components';
import { useTranslation } from 'react-i18next';
import { INewsDTO } from '../../global/types';
import { PublicDataService } from '../../services';
import { EContentType } from '../../global/enums.ts';

export default function RelevantContentPanel(props: { id: string; tages: string[]; domain: EContentType; linkUrl: string }) {
  const { t } = useTranslation();
  const [data, setData] = useState<INewsDTO[]>([]);

  const loadData = useCallback(
    (id: string, tags: string[]): void => {
      if (tags.length === 0) {
        return;
      }
      PublicDataService.getNewsByTags(props.domain, 100, 1, tags, '')
        .then(response => {
          setData(response.data.records.filter((n: INewsDTO) => n.id !== id));
        })
        .catch(err => {
          console.error('Error happens when fetch relevant contents', err);
        });
    },
    [props.domain]
  );

  useEffect(() => loadData(props.id, props.tages), [loadData, props.id, props.tages]);

  return data.length > 0 ? (
    <SidePanel title={t('article-reading-page.relevant-articles')}>
      {data.map(item => (
        <Grid
          item
          xs={12}
          sx={{ px: 2, py: 1 }}
          key={item.id}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            <Link
              href={props.linkUrl.replace(':id', item.id)}
              target="_blank"
              color="text.secondary"
            >
              {item.title}
            </Link>
          </Typography>
        </Grid>
      ))}
    </SidePanel>
  ) : (
    <></>
  );
}
