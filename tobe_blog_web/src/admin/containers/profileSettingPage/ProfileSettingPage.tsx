import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  ReactNode,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '../../../components/layout';
import {
  useAuthDispatch,
  useAuthState,
} from '../../../contexts';
import { ELocalStorageKeys } from '../../../global/enums.ts';
import { UserService } from '../../../services';
import AvatarSelector from './AvatarSelector.tsx';

export default function ProfileSettingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState(false);
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  
  const [showAvatars, setShowAvatars] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpenLoading(true);
    UserService.updateUser({
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: data.get('firstName')?.toString(),
      lastName: data.get('lastName')?.toString(),
      phoneNum: data.get('phoneNum')?.toString(),
      address: data.get('address')?.toString(),
      avatarUrl: avatarUrl,
      introduction: data.get('introduction')?.toString(),
      blog: data.get('blog')?.toString(),
      profession: data.get('profession')?.toString(),
      backgroundImg: data.get('backgroundImg')?.toString(),
      photoImg: data.get('photoImg')?.toString(),
    })
      .then((response) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        localStorage.setItem(
          ELocalStorageKeys.CURRENT_USER,
          JSON.stringify(response.data),
        );
        enqueueSnackbar(t('profile-setting.msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('profile-setting.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  };
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={t('profile-setting.form-title')}
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <InfoSection mt={8}>
          <Grid
            item
            xs={12}
            sx={{ mt: -7 }}
          >
            <AvatarSelector 
              showAvatars={showAvatars} 
              setShowAvatars={setShowAvatars} 
              avatarUrl={avatarUrl} 
              setAvatarUrl={setAvatarUrl} />
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
          >
            <TextField
              required
              id="firstName"
              name="firstName"
              label={t('profile-setting.fields.first-name')}
              fullWidth
              autoComplete="given-name"
              defaultValue={user.firstName || ''}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
          >
            <TextField
              required
              id="lastName"
              name="lastName"
              label={t('profile-setting.fields.last-name')}
              fullWidth
              autoComplete="family-name"
              defaultValue={user.lastName || ''}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              id="profession"
              name="profession"
              label={t('profile-setting.fields.profession')}
              fullWidth
              autoComplete="profession"
              defaultValue={user.profession || ''}
            />
          </Grid>
          
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              disabled
              InputLabelProps={{ shrink: true }}
              id="email"
              name="email"
              label={t('profile-setting.fields.email')}
              fullWidth
              type="email"
              autoComplete="email"
              defaultValue={user.email || ''}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              id="phoneNum"
              name="phoneNum"
              label={t('profile-setting.fields.phone-number')}
              fullWidth
              autoComplete="phone number"
              defaultValue={user.phoneNum || ''}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              id="address"
              name="address"
              label={t('profile-setting.fields.address')}
              fullWidth
              autoComplete="address"
              defaultValue={user.address || ''}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              id="blog"
              name="blog"
              label={t('profile-setting.fields.blog')}
              fullWidth
              autoComplete="blog"
              defaultValue={user.blog || ''}
              placeholder={'https://xxx.blog.com'}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              id="introduction"
              name="introduction"
              label={t('profile-setting.fields.introduction')}
              fullWidth
              autoComplete="introduction"
              variant="outlined"
              defaultValue={user.introduction || ''}
              multiline
              minRows={3}
              placeholder={t(
                'profile-setting.fields.introduction-placeholder',
              )}
            />
          </Grid>
        </InfoSection>
        <Divider />
        <InfoSection>
          <Grid
            item
            xs={6}
          >
            <TextField
              id="backgroundImg"
              name="backgroundImg"
              label={t('profile-setting.fields.background-img')}
              fullWidth
              autoComplete="backgroundImg"
              defaultValue={user.backgroundImg || ''}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              id="photoImg"
              name="photoImg"
              label={t('profile-setting.fields.photo-img')}
              fullWidth
              autoComplete="photoImg"
              defaultValue={user.photoImg || ''}
            />
          </Grid>
        </InfoSection>
        <Box sx={{ display: 'flex', my: 2, justifyContent: 'flex-end' }}>
          <Button onClick={() => window.history.back()}>
            {t('profile-setting.back-btn')}
          </Button>
          <Button
            variant="contained"
            type="submit"
          >
            {t('profile-setting.submit-btn')}
          </Button>
        </Box>
      </Box>
    </Page>
  );
}

const InfoSection = (props: { children: ReactNode[], mt?: number }) => {
  return (<Paper sx={{ mt: props.mt || 2, mb: 2, p: { xs: 2, md: 3 } }} variant="outlined">
    <Grid container spacing={3}>
    {props.children}
    </Grid>
  </Paper>);
};