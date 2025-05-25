import { SxProps, Theme } from '@mui/material';
import theme from '../../theme';

export const EditorStyle: SxProps<Theme> = {
  'width': '100%',
  '.w-e-text-container': {
    backgroundColor: 'transparent',
    fontFamily: 'Georgia, serif',
    cursor: 'text',
    userSelect: 'text',
  },
  '.w-e-text-container [data-slate-editor]': {
    'padding': '0px',
    'cursor': 'text',
    'userSelect': 'text',
    'blockquote': {
      'borderLeftColor': 'rgba(145, 158, 171, 0.08)',
      'backgroundColor': 'transparent',
      'color': '#637381',
      '&::before': {
        left: '16px',
        paddingRight: '8px',
      },
    },
    '.w-e-image-container': {
      maxWidth: '98%',
    },
    'pre > code': {
      borderRadius: '8px',
      // backgroundColor: 'rgba(60, 71, 112, 0.2)',
    },

    '& > div': {
      'display': 'flex',

      '.w-e-textarea-divider': {
        width: '100%',
      },

      'span[data-w-e-reserve=true]': {
        fontSize: '1rem',
        marginRight: '8px !important',
      },

      'input[type=checkbox]': {
        width: '16px',
        height: '16px',
        marginTop: '6px',
      },

      'table > tbody > tr > th': {
        backgroundColor: 'rgba(60, 71, 112, 0.2)',
      },
    },

    '& > p > a': {
      color: theme.palette.primary.dark,
    },
  },
};
