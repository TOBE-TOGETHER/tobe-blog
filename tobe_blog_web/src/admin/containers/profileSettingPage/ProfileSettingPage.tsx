import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { Box, Divider, FormControlLabel, FormGroup, Grid, IconButton, Paper, Switch, TextField, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useCommonUtils } from '../../../commons/index.ts';
import { HalfRow, OneRow, QuarterRow } from '../../../components';
import { Page } from '../../../components/layout';
import { useAuthDispatch, useAuthState } from '../../../contexts';
import { ELocalStorageKeys } from '../../../global/enums.ts';
import { URL } from '../../../routes/URL.ts';
import * as UserService from '../../../services/UserService.ts';
import { SaveButtonPanel } from '../../components';
import AvatarSelector from './AvatarSelector.tsx';

export default function ProfileSettingPage() {
  const { t, enqueueSnackbar, navigate } = useCommonUtils();
  const [openLoading, setOpenLoading] = useState(false);
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const [showAvatars, setShowAvatars] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl);
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [profession, setProfession] = useState<string>(user.profession);
  const [email, setEmail] = useState<string>(user.email);
  const [phoneNum, setPhoneNum] = useState<string>(user.phoneNum);
  const [address, setAddress] = useState<string>(user.address);
  const [blog, setBlog] = useState<string>(user.blog);
  const [introduction, setIntroduction] = useState<string>(user.introduction);
  const [backgroundImg, setBackgroundImg] = useState<string>(user.backgroundImg);
  const [photoImg, setPhotoImg] = useState<string>(user.photoImg);

  const [articleModule, setArticleModule] = useState<boolean>(user.features.articleModule);
  const [planModule, setPlanModule] = useState<boolean>(user.features.planModule);
  const [vocabularyModule, setVocabularyModule] = useState<boolean>(user.features.vocabularyModule);
  const [collectionModule, setCollectionModule] = useState<boolean>(user.features.collectionModule);

  const handleSubmit = () => {
    setOpenLoading(true);
    UserService.updateUser({
      id: user.id,
      email: email,
      username: user.username,
      firstName: firstName,
      lastName: lastName,
      phoneNum: phoneNum,
      address: address,
      avatarUrl: avatarUrl,
      introduction: introduction,
      blog: blog,
      profession: profession,
      backgroundImg: backgroundImg,
      photoImg: photoImg,
      features: {
        articleModule: articleModule,
        planModule: planModule,
        vocabularyModule: vocabularyModule,
        collectionModule: collectionModule,
      },
    })
      .then(response => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        localStorage.setItem(ELocalStorageKeys.CURRENT_USER, JSON.stringify(response.data));
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
      <Box>
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
              setAvatarUrl={setAvatarUrl}
            />
          </Grid>
          <QuarterRow>
            <TextField
              required
              label={t('profile-setting.fields.first-name')}
              fullWidth
              onChange={e => setFirstName(e.target.value)}
              defaultValue={firstName}
            />
          </QuarterRow>
          <QuarterRow>
            <TextField
              required
              label={t('profile-setting.fields.last-name')}
              fullWidth
              onChange={e => setLastName(e.target.value)}
              defaultValue={lastName}
            />
          </QuarterRow>
          <HalfRow>
            <TextField
              label={t('profile-setting.fields.profession')}
              fullWidth
              onChange={e => setProfession(e.target.value)}
              defaultValue={user.profession}
            />
          </HalfRow>
          <HalfRow>
            <TextField
              disabled
              InputLabelProps={{ shrink: true }}
              label={t('profile-setting.fields.email')}
              fullWidth
              onChange={e => setEmail(e.target.value)}
              defaultValue={email}
            />
          </HalfRow>
          <HalfRow>
            <TextField
              label={t('profile-setting.fields.phone-number')}
              fullWidth
              onChange={e => setPhoneNum(e.target.value)}
              defaultValue={phoneNum}
            />
          </HalfRow>
          <HalfRow>
            <TextField
              label={t('profile-setting.fields.address')}
              fullWidth
              onChange={e => setAddress(e.target.value)}
              defaultValue={address}
            />
          </HalfRow>
          <HalfRow>
            <TextField
              label={t('profile-setting.fields.blog')}
              fullWidth
              onChange={e => setBlog(e.target.value)}
              defaultValue={blog}
              placeholder={'https://xxx.blog.com'}
            />
          </HalfRow>
          <OneRow>
            <TextField
              label={t('profile-setting.fields.introduction')}
              fullWidth
              onChange={e => setIntroduction(e.target.value)}
              defaultValue={introduction}
              multiline
              minRows={3}
              placeholder={t('profile-setting.fields.introduction-placeholder')}
            />
          </OneRow>
        </InfoSection>
        <Divider />
        <InfoSection>
          <OneRow sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              {t('profile-setting.fields.personal-portal')}
            </Typography>
            <IconButton
              onClick={() => navigate(URL.PERSONAL_PORTAL.replace(':id', user.id))}
              title={t('profile-setting.view-btn')}
            >
              <LaunchOutlinedIcon sx={{ color: 'textSecondary' }} />
            </IconButton>
          </OneRow>
          <OneRow>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              {t('profile-setting.fields.customized-settings')}
            </Typography>
          </OneRow>
          <HalfRow>
            <TextField
              label={t('profile-setting.fields.background-img')}
              fullWidth
              onChange={e => setBackgroundImg(e.target.value)}
              defaultValue={backgroundImg}
            />
          </HalfRow>
          <HalfRow>
            <TextField
              label={t('profile-setting.fields.photo-img')}
              fullWidth
              onChange={e => setPhotoImg(e.target.value)}
              defaultValue={photoImg}
            />
          </HalfRow>
          <OneRow>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              {t('profile-setting.fields.module-switch')}
            </Typography>
          </OneRow>
          <QuarterRow>
            <SwitchGroup
              value={articleModule}
              setValue={setArticleModule}
              label={t('profile-setting.fields.articles')}
            />
          </QuarterRow>
          <QuarterRow>
            <SwitchGroup
              value={planModule}
              setValue={setPlanModule}
              label={t('profile-setting.fields.plans')}
            />
          </QuarterRow>
          <QuarterRow>
            <SwitchGroup
              value={vocabularyModule}
              setValue={setVocabularyModule}
              label={t('profile-setting.fields.vocabularies')}
            />
          </QuarterRow>
          <QuarterRow>
            <SwitchGroup
              value={collectionModule}
              setValue={setCollectionModule}
              label={t('profile-setting.fields.collections')}
            />
          </QuarterRow>
        </InfoSection>
        <SaveButtonPanel primaryEvent={handleSubmit} />
      </Box>
    </Page>
  );
}

const SwitchGroup = (props: { value: boolean; setValue: (newValue: boolean) => void; label: string }) => {
  return (
    <FormGroup sx={{ alignContent: { xs: 'center', sm: 'start' } }}>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={props.value}
            onChange={e => props.setValue(e.target.checked)}
          />
        }
        label={props.label}
      />
    </FormGroup>
  );
};

const InfoSection = (props: { children: ReactNode[]; mt?: number }) => {
  return (
    <Paper sx={{ mt: props.mt ?? 2, mb: 2, p: { xs: 2, md: 3 }, borderRadius: 4 }}>
      <Grid
        container
        spacing={3}
      >
        {props.children}
      </Grid>
    </Paper>
  );
};
