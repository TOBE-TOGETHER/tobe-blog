import '@wangeditor/editor/dist/css/style.css';

import { Grid } from '@mui/material';
import { IDomEditor, IEditorConfig, IToolbarConfig, SlateElement, i18nGetResources } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../../../../commons';
import { EditorStyle } from '../../../../../components';
import theme from '../../../../../theme';

type ImageElement = SlateElement & {
  src: string;
  alt: string;
  url: string;
  href: string;
};

function getLocale(): 'en' | 'zh-CN' {
  if (localStorage.getItem('i18nextLng') === 'en') {
    return 'en';
  } else {
    return 'zh-CN';
  }
}

function RichContentEditor(props: Readonly<{ htmlValue: string; setHtmlValue: (value: string) => void; setTextValue: (value: string) => void; editable: boolean }>) {
  const { t } = useCommonUtils();
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  const editorConfig: Partial<IEditorConfig> = {
    readOnly: !props.editable,
    MENU_CONF: {
      insertImage: {
        onInsertedImage(imageNode: ImageElement | null) {
          if (imageNode == null) return;
          const { src, alt, url, href } = imageNode;
          console.log('inserted image', src, alt, url, href);
        },
      },
      editImage: {
        onUpdatedImage(imageNode: ImageElement | null) {
          if (imageNode == null) return;
          const { src, alt, url } = imageNode;
          console.log('updated image', src, alt, url);
        },
      },
      uploadImage: {
        // server: '/api/upload',
        base64LimitSize: 20 * 1024, // 20kb,
        fieldName: 'your-custom-name',
        maxFileSize: 10 * 1024 * 1024, // 10M
        maxNumberOfFiles: 10,
        allowedFileTypes: ['image/*'],
      },
    },
    placeholder: t('components.rich-editor.placeholder'),
  };

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['bgColor', 'fontSize', 'fontFamily', 'lineHeight', 'group-video', 'fullScreen'],
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor, props.editable]);
  i18nGetResources(getLocale());

  return (
    <Grid
      sx={{
        ...EditorStyle,
        'borderRadius': '4px',
        'width': '100%',
        'border': '1px, solid ' + theme.palette.grey[300],
        'overflow': 'hidden',
        '&:hover': { boxShadow: props.editable ? '0 0 0 1px ' + theme.palette.primary.dark : 'none' },
        '&:focus-within': { boxShadow: props.editable ? '0 0 0 1px ' + theme.palette.primary.dark : 'none', borderColor: props.editable ? theme.palette.primary.dark : 'none' },
      }}
    >
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        style={{
          borderBottom: '0.5px solid rgba(0,0,0,0.12)',
          padding: '8px',
          color: theme.palette.primary.dark,
        }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={props.htmlValue}
        onCreated={setEditor}
        onChange={editor => {
          props.setHtmlValue(editor.getHtml());
          props.setTextValue(editor.getText());
        }}
        mode="default"
        style={{ minHeight: '500px', width: '100%', backgroundColor: '#f1f3f5', padding: '8px' }}
      />
    </Grid>
  );
}

export default RichContentEditor;
