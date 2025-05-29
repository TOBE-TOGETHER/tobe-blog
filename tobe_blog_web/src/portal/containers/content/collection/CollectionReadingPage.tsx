import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommonUtils } from '../../../../commons';
import { CollectionTreeRenderer, SEOHead } from '../../../../components';
import { ICollectionDTO } from '../../../../global/types';
import { useSEO } from '../../../../hooks';
import { URL } from '../../../../routes';
import * as PublicDataService from '../../../../services/PublicDataService.ts';
import ContentReadingPage from '../ContentReadingPage';

export default function CollectionReadingPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const [collection, setCollection] = useState<ICollectionDTO | null>(null);
  const { id } = useParams();

  useEffect(() => {
    function load(): void {
      PublicDataService.getSubjectById(id ?? '')
        .then(response => {
          setCollection(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t('subjects-reading-page.msg.error'), {
            variant: 'error',
          });
        });
    }
    load();
  }, [enqueueSnackbar, id]);

  // Use SEO Hook
  const seoData = useSEO({
    content: collection,
    contentType: 'collection',
  });

  return (
    <>
      {seoData && <SEOHead {...seoData} />}
      <ContentReadingPage
        content={collection}
        subTitle={collection?.description}
        editLinkUrlPrefix={URL.COLLECTION_DETAIL}
      >
        <CollectionTreeRenderer
          collection={collection}
          isAdminMode={false}
          noDataMessage={t('subject-reading-page.tip.tba')}
          toBeContinuedMessage={t('collection-reading-page.tip.tba')}
        />
      </ContentReadingPage>
    </>
  );
}
