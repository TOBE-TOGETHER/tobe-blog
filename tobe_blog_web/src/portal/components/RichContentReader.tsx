import '@wangeditor/editor/dist/css/style.css';

import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { Editor } from '@wangeditor/editor-for-react';
import { useEffect, useState } from 'react';

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
    <Editor
      className="reader"
      value={props.htmlValue}
      defaultConfig={editorConfig}
      mode="default"
      style={{
        margin: '0px',
        padding: '0px',
        width: '100%',
        color: 'text.secondary',
      }}
    />
  );
}

export default RichContentReader;
