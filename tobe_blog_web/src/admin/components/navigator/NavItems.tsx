import Add from '@mui/icons-material/Add';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { authed, enabled } from '../../../commons';
import { IPageItem } from '../../../global/types';

export const NavItems = (props: { pageItems: IPageItem[] }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const authedPages = props.pageItems.filter(pageItem => authed(pageItem.requiredRoles) && enabled(pageItem.requiredFeature));
  return (
    <>
      <List>
        {authedPages?.map(pageItem => (
          <NavItem
            key={pageItem.label}
            disablePadding
            onMouseOver={() => setHoveredItem(pageItem.label)}
            onMouseOut={() => setHoveredItem(null)}
            secondaryAction={
              pageItem.secondaryUrl &&
              pageItem.label === hoveredItem && (
                <IconButton
                  edge="end"
                  aria-label="Add"
                  sx={{
                    borderRadius: 0,
                    mr: '2px',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                  onClick={() => navigate(pageItem.secondaryUrl || '/')}
                >
                  <Add />
                </IconButton>
              )
            }
          >
            <ListItemButton
              onClick={() => navigate(pageItem.url)}
              selected={pageItem.url === location.pathname}
            >
              <ListItemIcon>{pageItem.icon}</ListItemIcon>
              <ListItemText primary={t(pageItem.label)} />
            </ListItemButton>
          </NavItem>
        ))}
      </List>
      {authedPages.length > 0 && <Divider />}
    </>
  );
};
const NavItem = styled(ListItem)(({ theme }) => ({
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
