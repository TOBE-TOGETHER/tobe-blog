import { Avatar, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SidePanel } from '../../../components';
import { IUserBriefProfileDTO } from '../../../global/types';
import { URL } from '../../../routes';
import { PublicDataService } from '../../../services';

export default function Top5ActiveUsersPanel() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<IUserBriefProfileDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    function loadUsers(): void {
      PublicDataService.getTop5ActiveUsers()
        .then(response => {
          setUserData(response.data);
        })
        .catch(() => {});
    }
    loadUsers();
  }, []);

  return userData.length > 0 ? (
    <SidePanel title={t('home-page.top5-active-users')}>
      {userData.map(n => (
        <Grid
          container
          item
          key={n.id}
          sx={{ px: 2 }}
        >
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
            sx={{
              'px': 2,
              'cursor': 'pointer',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            }}
            onClick={() => navigate(URL.PERSONAL_PORTAL.replace(':id', n.id))}
          >
            <Avatar
              alt={n.firstName}
              src={n.avatarUrl}
              sx={{
                flexGrow: 0,
                mr: 4,
                my: 0.5,
              }}
            />
            <Typography
              color="text.secondary"
              sx={{
                flexGrow: 1,
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.43,
              }}
            >
              {n.firstName + ' ' + n.lastName}
            </Typography>
          </Grid>
        </Grid>
      ))}
      <Grid
        container
        sx={{ pb: 1 }}
      />
    </SidePanel>
  ) : (
    <></>
  );
}
