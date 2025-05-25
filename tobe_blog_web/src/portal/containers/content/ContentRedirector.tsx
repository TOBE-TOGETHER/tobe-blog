import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommonUtils } from '../../../commons';
import { Loading } from '../../../components';
import { EContentType } from '../../../global/enums';
import { IContentBasicInfoDTO } from '../../../global/types';
import { URL } from '../../../routes';
import * as PublicDataService from '../../../services/PublicDataService';

export default function ContentRedirector() {
  const { id } = useParams();
  const { navigate, enqueueSnackbar, t } = useCommonUtils();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    loadContentBasicInfo();
  }, [id]);

  const loadContentBasicInfo = () => {
    setLoading(true);
    PublicDataService.getContentBasicInfo(id!)
      .then(response => {
        const contentInfo: IContentBasicInfoDTO = response.data;
        
        // Check if content is available
        if (!contentInfo.publicToAll || contentInfo.banned) {
          enqueueSnackbar(t('content-redirector.content-not-available'), {
            variant: 'warning',
          });
          navigate('/');
          return;
        }

        // Redirect to appropriate page based on content type
        const redirectUrl = getRedirectUrl(contentInfo.contentType, contentInfo.id);
        navigate(redirectUrl, { replace: true });
      })
      .catch(() => {
        enqueueSnackbar(t('content-redirector.content-not-found'), {
          variant: 'error',
        });
        navigate('/');
      })
      .finally(() => setLoading(false));
  };

  const getRedirectUrl = (contentType: string, contentId: string): string => {
    switch (contentType.toUpperCase()) {
      case EContentType.Article:
        return URL.NEWS_ARTICLE_DETAIL.replace(':id', contentId);
      case EContentType.Plan:
        return URL.NEWS_PLAN_DETAIL.replace(':id', contentId);
      case EContentType.Vocabulary:
        return URL.NEWS_VOCABULARY_DETAIL.replace(':id', contentId);
      case EContentType.Collection:
        return URL.NEWS_COLLECTION_DETAIL.replace(':id', contentId);
      default:
        return '/';
    }
  };

  if (loading) {
    return <Loading open={loading} />;
  }

  return null;
} 