import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

/**
 * Create system theme via material-ui
 */
const theme = createTheme({
  typography: {
    fontFamily: [
      '"Public Sans Variable"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      light: '#484848',
      main: '#020202',
      dark: '#000000',
    },
    secondary: {
      light: '#ff833a',
      main: '#e65100',
      dark: '#ac1900',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#1c252e',
      secondary: '#637381',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          color: 'rgba(0, 0, 0, 0.6) !important',
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: 'elevation' },
          style: {
            boxShadow: 'rgba(145, 158, 171, 0.28) 0px 0px 2px 0px, rgba(145, 158, 171, 0.16) 0px 12px 24px -4px',
          },
        },
      ],
    },
    MuiCardHeader: {
      styleOverrides: {
        content: {
          width: '100%',
        },
        title: {
          maxWidth: '100%',
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '1rem',
        },
      },
    },
  },
});

export default theme;
