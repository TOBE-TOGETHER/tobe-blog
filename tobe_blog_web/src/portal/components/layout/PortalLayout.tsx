import { Box, Stack } from '@mui/material';

import PortalHeader from './PortalHeader';

export default function PortalLayout({ children }: { children: any }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
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
