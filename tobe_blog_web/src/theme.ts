import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

/**
 * Create system theme via material-ui
 */
const theme = createTheme({
  typography: {
    fontFamily: [
      'Public Sans Variable',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#3c4770',
    },
    secondary: {
      main: '#d9bda1',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#1c252e',
      secondary: '#637381',
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
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
