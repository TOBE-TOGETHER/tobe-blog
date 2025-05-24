import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../../../../commons';
import { FormPanel } from '../../../../../components';
import CollectionTreeRenderer from '../../../../../components/common/CollectionTreeRenderer';
import { ICollectionDTO } from '../../../../../global/types';
import { CollectionService } from '../../UserContentService';

export default function CollectionPreviewPanel(props: Readonly<{ collectionId: string; refreshTrigger: number }>) {
  const { t, enqueueSnackbar } = useCommonUtils();
  const [collection, setCollection] = useState<ICollectionDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (props.collectionId) {
      setLoading(true);
      CollectionService.getByIdWithRelatedContents(props.collectionId)
        .then(response => {
          setCollection(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t('msg.error'), {
            variant: 'error',
          });
        })
        .finally(() => setLoading(false));
    }
  }, [props.collectionId, props.refreshTrigger, t, enqueueSnackbar]);

  return (
    <FormPanel sx={{ mt: 1 }}>
      {[
        <Grid
          container
          sx={{ p: 2 }}
          key="preview-content"
        >
          <Grid
            item
            xs={12}
            sx={{ mb: 2 }}
          >
            <Typography
              variant="h6"
              color="primary"
            >
              {t('collection-preview.title')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            {loading ? (
              <Typography color="textSecondary">{t('collection-preview.loading')}</Typography>
            ) : (
              <CollectionTreeRenderer
                collection={collection}
                isAdminMode={true}
                noDataMessage={t('collection-preview.tip.no-data')}
                toBeContinuedMessage={t('collection-preview.tip.tba')}
              />
            )}
          </Grid>
        </Grid>
      ]}
    </FormPanel>
  );
} 