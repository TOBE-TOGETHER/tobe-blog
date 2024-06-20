import { Box, Stack } from '@mui/material';

import PortalHeader from "./PortalHeader";

export default function FrontendLayout({ children }: { children: any }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
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
            backgroundColor: { xs: 'rgba(255,255,255,1)', sm: '#f3f2ef' },
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
