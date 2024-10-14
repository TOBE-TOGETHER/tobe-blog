import { ListItem, styled } from '@mui/material';

export const NavItem = styled(ListItem)(({ theme }) => ({
  'padding': '5px 15px',
  'color': theme.palette.text.primary,
  '& .MuiListItemButton-root.Mui-selected': {
    'color': theme.palette.primary.main + ' !important',
    'backgroundColor': `${theme.palette.primary.main}20 !important`,
    'fontWeight': '500 !important',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main + ' !important',
    },
  },
}));
