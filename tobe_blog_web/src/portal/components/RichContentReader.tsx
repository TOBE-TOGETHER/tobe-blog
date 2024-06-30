import { Grid } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { Editor } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import { useEffect, useState } from 'react';

interface RichContentEditorReaderProps {
  htmlValue: string;
}

function RichContentReader(props: RichContentEditorReaderProps) {
  const editorStyle: SxProps<Theme> = {
    width: '100%',

    '.w-e-text-container [data-slate-editor]': {
      'blockquote': {
        borderLeftColor: 'rgba(145, 158, 171, 0.08)',
        backgroundColor: 'transparent',
        color: '#637381',
        fontFamily: 'Georgia, serif',

        '&::before': {
          left: '16px',
          content: `'“'`,
          fontSize: '2em',
          paddingRight: '24px'
        },

        'p': {
          fontSize: '1.5em'
        }
      },

      'pre > code': {
        backgroundColor: 'rgba(60, 71, 112, 0.2)'
      },

      '& > div': {
        display: 'flex',
        alignItems: 'center',

        '.w-e-textarea-divider': {
          width: '100%'
        },

        'span[data-w-e-reserve=true]': {
          fontSize: '24px',
          marginRight: '8px !important'
        },

        'input[type=checkbox]': {
          width: '16px',
          height: '16px',
          marginTop: '6px'
        },

        'table > tbody > tr > th': {
          backgroundColor: 'rgba(60, 71, 112, 0.2)'
        }
      },

      '& > p > a': {
        color: '#00A76F'
      }
    }
  }

  const [editor, setEditor] = useState<IDomEditor | null>(null);

  const editorConfig: Partial<IEditorConfig> = {
    readOnly: true
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <Grid sx={editorStyle}>
      <Editor
        className="reader"
        value={props.htmlValue}
        defaultConfig={editorConfig}
        mode="default"
      />
    </Grid>
  );
}

export default RichContentReader;
