import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';

interface IBaseDrawerProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly children: ReactNode;
  readonly width?: { xs?: string | number; sm?: string | number; md?: string | number };
  readonly actionButtons?: ReactNode;
}

export default function BaseDrawer({ 
  open, 
  onClose, 
  title, 
  children, 
  width = { xs: '100%', sm: 400, md: 480 },
  actionButtons 
}: IBaseDrawerProps) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
        {children}
      </Box>

      {/* Action Buttons at Bottom */}
      {actionButtons && (
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          p: 2, 
          borderTop: `1px solid ${theme.palette.divider}` 
        }}>
          {actionButtons}
        </Box>
      )}
    </Drawer>
  );
} 