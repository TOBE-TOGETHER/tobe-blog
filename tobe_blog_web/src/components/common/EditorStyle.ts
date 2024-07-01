import { SxProps, Theme } from '@mui/material';

export const EditorStyle: SxProps<Theme> = {
  'width': '100%',
  '.w-e-text-container': {
    backgroundColor: 'transparent',
  },
  '.w-e-text-container [data-slate-editor]': {
    'padding': '0px',
    'blockquote': {
      'borderLeftColor': 'rgba(145, 158, 171, 0.08)',
      'backgroundColor': 'transparent',
      'color': '#637381',
      'fontFamily': 'Georgia, serif',

      '&::before': {
        left: '16px',
        content: `'“'`,
        fontSize: '2em',
        paddingRight: '24px',
      },

      'p': {
        fontSize: '1.5em',
      },
    },

    'pre > code': {
      borderRadius: '8px',
      // backgroundColor: 'rgba(60, 71, 112, 0.2)',
    },

    '& > div': {
      'display': 'flex',
      'alignItems': 'center',

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
      color: '#00A76F',
    },
  },
};
