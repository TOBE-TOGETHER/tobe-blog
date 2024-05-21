import { Box } from '@mui/material';

export default function BasicLayout({ children }: {
  children: any
}) {
  return (
    <Box style={{ minHeight: '100vh' }}>
      {children}
    </Box>
  );
}
