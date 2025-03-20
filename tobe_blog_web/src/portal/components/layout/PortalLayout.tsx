import { Box, Stack, SxProps } from '@mui/material';
import PortalHeader from './PortalHeader';

export default function PortalLayout({ children, headerStyles, bodyStyles }: Readonly<{ children: any, headerStyles?: SxProps, bodyStyles?: SxProps }>) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        ...bodyStyles
      }}
    >
      <PortalHeader styles={headerStyles}/>
      <Box sx={bodyStyles}>
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
