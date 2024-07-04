import { Grid } from '@mui/material';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { Editor } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import { useEffect, useState } from 'react';
import { EditorStyle } from '../../components';

interface RichContentEditorReaderProps {
  htmlValue: string;
}

function RichContentReader(props: RichContentEditorReaderProps) {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const editorConfig: Partial<IEditorConfig> = {
    readOnly: true,
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <Grid sx={EditorStyle}>
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
