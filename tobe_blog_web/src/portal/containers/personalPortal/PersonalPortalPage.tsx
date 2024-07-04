import { Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FrontendLayout, Loading } from '../../../components';
import { EContentType } from '../../../global/enums';
import { IUserFullProfileDTO } from '../../../global/types';
import { PublicDataService } from '../../../services';
import FunctionSection from '../home/FunctionSection';
import IntroducationSection from './IntroducationSection';

export default function PersonalPortalPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  let [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<IUserFullProfileDTO | null>(null);
  const loadProfile = useCallback((): void => {
    setLoading(true);
    PublicDataService.getFullProfileByUserId(id || '')
      .then(response => {
        setProfile(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t('article-reading-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [t, id]);

  useEffect(() => loadProfile(), [loadProfile]);

  function getAvailableContentTypes(profile: IUserFullProfileDTO) {
    const availableContentTypes: EContentType[] = [];
    profile?.features.articleModule && availableContentTypes.push(EContentType.Article);
    profile?.features.planModule && availableContentTypes.push(EContentType.Plan);
    profile?.features.vocabularyModule && availableContentTypes.push(EContentType.Vocabulary);
    return availableContentTypes;
  }
  return (
    <FrontendLayout>
      <Loading open={loading} />
      {profile ? (
        <>
          <IntroducationSection profile={profile} />
          <FunctionSection
            extraPanels={[]}
            ownerId={profile.id}
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
    </FrontendLayout>
  );
}