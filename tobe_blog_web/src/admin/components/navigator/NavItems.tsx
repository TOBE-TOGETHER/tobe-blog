import Add from '@mui/icons-material/Add';
import { Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authed, enabled, useCommonUtils } from '../../../commons';
import { IPageItem } from '../../../global/types';
import { NavItem } from './NavItem';

export const NavItems = (props: { pageItems: IPageItem[] }) => {
  let location = useLocation();
  const { t, navigate } = useCommonUtils();
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
                  onClick={() => navigate(pageItem.secondaryUrl ?? '/')}
                >
                  <Add />
                </IconButton>
              )
            }
          >
            <ListItemButton
              onClick={() => navigate(pageItem.url)}
              selected={location.pathname.includes(pageItem.url)}
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
