import Abc from '@mui/icons-material/Abc';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import FolderIcon from '@mui/icons-material/Folder';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useCommonUtils } from '../../commons';
import { useAuthState } from '../../contexts';
import { URL } from '../../routes';

export function CreateSpeedDial() {
  const { t, navigate } = useCommonUtils();
  const authContext = useAuthState();

  const speedDialActions = [
    {
      icon: <ArticleIcon />,
      name: t('home-page.speed-dial.create-article'),
      onClick: () => navigate(URL.CREATE_ARTICLE),
    },
    {
      icon: <FlagIcon />,
      name: t('home-page.speed-dial.create-plan'),
      onClick: () => navigate(URL.CREATE_PLAN),
    },
    {
      icon: <Abc />,
      name: t('home-page.speed-dial.create-vocabulary'),
      onClick: () => navigate(URL.CREATE_VOCABULARY),
    },
    {
      icon: <FolderIcon />,
      name: t('home-page.speed-dial.create-collection'),
      onClick: () => navigate(URL.CREATE_COLLECTION),
    },
  ];

  // Only render if user is authenticated
  if (!authContext.user) {
    return null;
  }

  return (
    <SpeedDial
      ariaLabel="Create new content"
      sx={{ 
        position: 'fixed', 
        bottom: 80, 
        right: 24,
        zIndex: 1000,
        '& .MuiSpeedDial-fab': {
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        },
      }}
      icon={<SpeedDialIcon icon={<AddIcon />} openIcon={<CloseIcon />} />}
    >
      {speedDialActions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
          sx={{
            '& .MuiSpeedDialAction-fab': {
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            },
          }}
        />
      ))}
    </SpeedDial>
  );
} 