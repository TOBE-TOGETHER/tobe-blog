import { Box, Stack } from '@mui/material';

// import { FrontendHeader } from "../header";
import { AppFooter } from '../footer';

/**
 * FrontendLayout, a flex container with the basic header, footer
 *
 * 基础布局， 一个带有网站页头和页脚的流式布局容器
 */
export default function FrontendLayout({ children }: { children: any }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/*<FrontendHeader />*/}
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
      <AppFooter />
    </Box>
  );
}
