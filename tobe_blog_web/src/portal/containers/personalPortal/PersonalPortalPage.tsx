import { Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../../../customization.json';
import { useCommonUtils } from '../../../commons/index.ts';
import { Loading, SEOHead } from '../../../components';
import { EContentType } from '../../../global/enums';
import { IUserFullProfileDTO } from '../../../global/types';
import { useSEO } from '../../../hooks';
import * as PublicDataService from '../../../services/PublicDataService.ts';
import { PortalLayout } from '../../components';
import FunctionSection from '../../components/FunctionSection.tsx';
import IntroducationSection from './IntroducationSection';

export default function PersonalPortalPage() {
  const { id } = useParams();
  const { t, enqueueSnackbar } = useCommonUtils();
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<IUserFullProfileDTO | null>(null);

  const loadProfile = useCallback((): void => {
    setLoading(true);
    PublicDataService.getFullProfileByUserId(id ?? '')
      .then(response => {
        setProfile(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t('article-reading-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [t, id, enqueueSnackbar]);

  useEffect(() => loadProfile(), [loadProfile]);

  // Use SEO Hook for profile page
  const seoData = useSEO({
    profile: profile,
    contentType: 'profile',
  });

  // Set page title
  useEffect(() => {
    if (profile) {
      const fullName = `${profile.firstName} ${profile.lastName}`.trim();
      document.title = `${fullName} | ${config.title}`;
    }
  }, [profile]);

  function getAvailableContentTypes(profile: IUserFullProfileDTO) {
    const availableContentTypes: EContentType[] = [];
    profile?.features.articleModule && availableContentTypes.push(EContentType.Article);
    profile?.features.planModule && availableContentTypes.push(EContentType.Plan);
    profile?.features.vocabularyModule && availableContentTypes.push(EContentType.Vocabulary);
    profile?.features.collectionModule && availableContentTypes.push(EContentType.Collection);
    return availableContentTypes;
  }

  return (
    <>
      {seoData && <SEOHead {...seoData} />}
      <PortalLayout
        headerStyles={{ backgroundColor: 'transparent' }}
        bodyStyles={{ background: 'linear-gradient(135deg, #E6F0FA, #F0FFF0)' }}
      >
        <Loading open={loading} />
        {profile ? (
          <>
            <IntroducationSection profile={profile} />
            <FunctionSection
              extraPanels={[]}
              topic={null}
              ownerId={profile.id}
              keyword={''}
              availableContentTypes={getAvailableContentTypes(profile)}
            />
          </>
        ) : (
          <Grid
            container
            sx={{ minHeight: '100vh' }}
            alignContent="center"
            justifyContent="center"
          ></Grid>
        )}
      </PortalLayout>
    </>
  );
}
