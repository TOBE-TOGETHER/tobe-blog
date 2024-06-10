import { Box } from '@mui/material';
import AppFooter from '../footer/AppFooter';

export default function BasicLayout({ children }: { children: any }) {
  return <>
    <Box style={{ minHeight: '100vh' }}>
      {children}
    </Box>
    <AppFooter />
  </>;
}
