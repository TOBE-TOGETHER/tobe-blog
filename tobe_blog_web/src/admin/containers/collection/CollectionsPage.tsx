import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../components/layout/index.ts';
import { EOperationName } from '../../../global/enums.ts';
import {
  CollectionInfo,
  Operation,
} from '../../../global/types.ts';
import { CollectionService } from '../../../services/index.ts';
import { URL } from '../../URL.ts';
import { AddIconButton } from '../../components/index.ts';
import CollectionCardView from './CollectionCardView.tsx';

export default function CollectionsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<CollectionInfo[]>([]);
  const [current] = useState<number>(0);
  const [size] = useState<number>(1000);
  const loadData = useCallback((): void => {
    setOpenLoading(true);
    CollectionService.get(size, current)
      .then((response) => {
        setCollections(response.data.records || []);
      })
      .catch(() => {
        enqueueSnackbar(t('articles-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }, [
    current,
    enqueueSnackbar,
    size,
    t,
  ]);
  
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  function releaseById(id: number | string) {
    setOpenLoading(true);
    CollectionService.releaseById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }
  
  function deleteById(id: number | string) {
    setOpenLoading(true);
    CollectionService.deleteById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }
  
  const operations: Operation[] = [
    {
      name: EOperationName.RELEASE,
      onClick: (id: number | string) => releaseById(id),
      hide: (data: any) => data.publicToAll,
    },
    {
      name: EOperationName.DELETE,
      onClick: (id: number | string) => deleteById(id),
    },
  ];
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={t('subjects-page.page-main-title')}
    >
      <Grid
        container
        sx={{ py: 1, minHeight: '54px' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <AddIconButton onClick={() => navigate(URL.CREATE_COLLECTION)} />
        </Grid>
      </Grid>
      <CollectionCardView
        operations={operations}
        data={collections}
        onClick={(id: number | string) =>
          navigate(URL.COLLECTION_DETAIL.replace(':id', id.toString()))
        }
      />
    </Page>
  );
}
