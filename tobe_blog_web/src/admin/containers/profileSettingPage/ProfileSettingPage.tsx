import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  TextField,
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
import { URL } from '../../../routes';
import { UserService } from '../../../services';

export default function ProfileSettingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState(false);
  const authState = useAuthState();
  const { user } = authState;
  const dispatch = useAuthDispatch();
  
  const [showAvatars, setShowAvatars] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const avatars: { alt: string; src: string }[] = initAvatars();
  
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
  
  function initAvatars() {
    const result = [];
    for (let i = 1; i <= 20; i++) {
      result.push({
        alt: i.toString(),
        src: `/images/avatars/avatar${i}.png`,
      });
    }
    return result;
  }
  
  function renderAvatarOptions(avatars: any[]) {
    const rows = [];
    let fast = 0;
    let slow = 0;
    for (let i = 1; i <= avatars.length; i++) {
      fast = i;
      if (fast % 5 === 0 || fast === avatars.length) {
        rows.push(
          <AvatarOptionRow
            avatars={avatars.slice(slow, fast)}
            handleAvatarChange={handleAvatarChange}
            key={Math.floor(fast / 5)}
          />,
        );
        slow = i;
      }
    }
    return rows;
  }
  
  function handleShowAvatarsChange() {
    setShowAvatars(!showAvatars);
  }
  
  function handleAvatarChange(newAvatarUrl: string) {
    setAvatarUrl(newAvatarUrl);
    setShowAvatars(false);
  }
  
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
            <Box
              sx={{
                p: 0,
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: 4,
                width: '100px',
                height: '107px',
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  width="100%"
                  onClick={handleShowAvatarsChange}
                  alt={avatarUrl}
                ></img>
              ) : (
                <PersonIcon
                  sx={{ width: '100%', height: '100%' }}
                  onClick={handleShowAvatarsChange}
                />
              )}
              
              {showAvatars && (
                <ClickAwayListener onClickAway={handleShowAvatarsChange}>
                  <Paper
                    sx={{
                      position: 'absolute',
                      display: 'inline-block',
                      ml: 1,
                      py: 2,
                      maxHeight: '107px',
                      overflow: 'scroll',
                    }}
                    variant="outlined"
                  >
                    {renderAvatarOptions(avatars)}
                  </Paper>
                </ClickAwayListener>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              required
              id="firstName"
              name="firstName"
              label={t('profile-setting.fields.first-name')}
              fullWidth
              autoComplete="given-name"
              variant="standard"
              defaultValue={user.firstName || ''}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              required
              id="lastName"
              name="lastName"
              label={t('profile-setting.fields.last-name')}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              defaultValue={user.lastName || ''}
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
              variant="standard"
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
              variant="standard"
              defaultValue={user.phoneNum || ''}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              id="address"
              name="address"
              label={t('profile-setting.fields.address')}
              fullWidth
              autoComplete="address"
              variant="standard"
              defaultValue={user.address || ''}
              multiline
            />
          </Grid>
        </InfoSection>
        <Divider />
        <InfoSection>
          <Grid
            item
            xs={12}
          >
            <TextField
              id="blog"
              name="blog"
              label={t('profile-setting.fields.blog')}
              fullWidth
              autoComplete="blog"
              variant="standard"
              defaultValue={user.blog || ''}
              multiline
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
              id="profession"
              name="profession"
              label={t('profile-setting.fields.profession')}
              fullWidth
              autoComplete="profession"
              variant="standard"
              defaultValue={user.profession || ''}
            />
          </Grid>
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
              variant="standard"
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
              variant="standard"
              defaultValue={user.photoImg || ''}
            />
          </Grid>
        </InfoSection>
        <Box sx={{ display: 'flex', my: 2, justifyContent: 'flex-end' }}>
          <Button onClick={() => window.history.back()}>
            {t('profile-setting.back-btn')}
          </Button>
          <Button
            onClick={() =>
              window.open(URL.PERSONAL_PORTAL.replace(':id', user.id))
            }
          >
            {t('profile-setting.preview-btn')}
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
  return <Paper
    sx={{ mt: props.mt || 2, mb: 2, p: { xs: 2, md: 3 } }}
    variant="outlined"
  ><Grid
    container
    spacing={3}
  >{props.children}</Grid></Paper>;
};

const AvatarOptionRow = (props: {
  avatars: { alt: string; src: string }[];
  handleAvatarChange: Function;
}) => {
  return (
    <Grid
      container
      spacing={0.5}
    >
      {props.avatars.map((i) => (
        <Grid
          item
          key={i.alt}
        >
          <Avatar
            alt={i.alt}
            src={i.src}
            onClick={() => props.handleAvatarChange(i.src)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
