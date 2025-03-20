import { Box, Stack } from '@mui/material';
import PortalHeader from './PortalHeader';

export default function PortalLayout({ children }: Readonly<{ children: any }>) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E6F0FA, #F0FFF0)',
      }}
    >
      <PortalHeader />
      <Box>
        <Stack
          justifyContent="start"
          alignItems="center"
          direction="column"
          sx={{
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { md: 'flex' },
            p: 0,
          }}
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
}
