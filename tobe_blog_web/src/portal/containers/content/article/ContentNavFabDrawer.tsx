import { useState } from 'react';
import { Fab, List, ListItemButton, ListItemText } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContentNavDrawer from './ContentNavDrawer';
import type { HeadingInfo } from './headingTreeUtils';
import { buildHeadingTree, HeadingTreeNode } from './headingTreeUtils';

interface ContentNavFabDrawerProps {
  headings: HeadingInfo[];
}

export default function ContentNavFabDrawer({ headings }: ContentNavFabDrawerProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleNavClick(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setDrawerOpen(false);
    }
  }

  function renderHeadingTree(nodes: HeadingTreeNode[]) {
    return nodes.map(node => (
      <div key={node.id}>
        <ListItemButton
          sx={{ pl: (node.level - 1) * 2 + 1 }}
          onClick={() => handleNavClick(node.id)}
        >
          <ListItemText primary={node.text} />
        </ListItemButton>
        {node.children.length > 0 && (
          <List disablePadding>
            {renderHeadingTree(node.children)}
          </List>
        )}
      </div>
    ));
  }

  const headingTree = buildHeadingTree(headings);

  return (
    <>
      <Fab
        color="primary"
        aria-label="content-nav"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1301,
          boxShadow: 3,
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuBookIcon />
      </Fab>
      <ContentNavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>{renderHeadingTree(headingTree)}</List>
      </ContentNavDrawer>
    </>
  );
} 