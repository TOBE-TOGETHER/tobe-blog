import '@wangeditor/editor/dist/css/style.css';

import { Grid, useMediaQuery } from '@mui/material';
import { IDomEditor, IEditorConfig, IToolbarConfig, SlateElement, i18nGetResources } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCommonUtils } from '../../../../../commons';
import { EditorStyle } from '../../../../../components';
import theme from '../../../../../theme';

type ImageElement = SlateElement & {
  src: string;
  alt: string;
  url: string;
  href: string;
};

function RichContentEditor(props: Readonly<{ htmlValue: string; setHtmlValue: (value: string) => void; setTextValue: (value: string) => void; editable: boolean }>) {
  const { t } = useCommonUtils();
  const { i18n } = useTranslation();
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  
  // Detect screen size
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Function to get current locale for WangEditor
  const getCurrentLocale = useCallback((): 'en' | 'zh-CN' => {
    return i18n.language === 'en' ? 'en' : 'zh-CN';
  }, [i18n.language]);

  // Effect 1: Handle language changes and update editor locale
  useEffect(() => {
    const currentLocale = getCurrentLocale();
    i18nGetResources(currentLocale);
  }, [getCurrentLocale]);

  // Effect 2: Cleanup editor instance when component unmounts or editable changes
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor, props.editable]);

  const editorConfig: Partial<IEditorConfig> = {
    readOnly: !props.editable,
    autoFocus: props.editable,
    scroll: false,
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

  // Configure different toolbars based on screen size
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: isMobile 
      ? [
          // Mobile: Exclude most tools, keep only basic editing features:
          // Keep: blockquote, bulletedList, numberedList, code, codeBlock
          'bold', 'italic', 'underline', 'emotion', 'code', 'codeBlock',
          'bgColor', 'fontSize', 'fontFamily', 'lineHeight', 'group-video', 'fullScreen',
          'color', 'through', 'sub', 'sup', 'clearStyle', 
          'indent', 'delIndent', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify',
          'insertLink', 'editLink', 'unLink', 'viewLink',
          'uploadImage', 'deleteImage', 'editImage', 'viewImageLink',
          'insertTable', 'deleteTable', 'insertTableRow', 'deleteTableRow',
          'insertTableCol', 'deleteTableCol', 'tableHeader', 'tableFullWidth',
          'divider', 'redo', 'undo', 'group-more-style', 'group-justify',
          'group-indent', 'group-image', 'group-table', 'insertVideo', 'uploadVideo'
        ]
      : [
          // Desktop: Show more tools, exclude only a few
          'bgColor', 'fontSize', 'fontFamily', 'lineHeight', 'group-video', 'fullScreen'
        ]
  };

  return (
    <Grid
      sx={{
        ...EditorStyle,
        'borderRadius': '4px',
        'width': '100%',
        'border': '1px, solid ' + theme.palette.grey[300],
        'overflow': 'hidden',
        'pointerEvents': 'auto',
        'cursor': 'text',
        '&:hover': { boxShadow: props.editable ? '0 0 0 1px ' + theme.palette.primary.dark : 'none' },
        '&:focus-within': { boxShadow: props.editable ? '0 0 0 1px ' + theme.palette.primary.dark : 'none', borderColor: props.editable ? theme.palette.primary.dark : 'none' },
      }}
    >
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        style={{
          borderBottom: '0.5px solid rgba(0,0,0,0.12)',
          padding: isMobile ? '4px' : '8px',
          color: theme.palette.primary.dark,
          fontSize: isMobile ? '14px' : '16px',
          flexWrap: 'wrap',
        }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={props.htmlValue}
        onCreated={(editor) => {
          setEditor(editor);
          // Set up focus handling after editor is created
          if (props.editable) {
            const editorContainer = editor.getEditableContainer() as HTMLElement;
            if (editorContainer) {
              editorContainer.style.cursor = 'text';
              editorContainer.style.userSelect = 'text';
            }
          }
        }}
        onChange={editor => {
          props.setHtmlValue(editor.getHtml());
          props.setTextValue(editor.getText());
        }}
        mode="default"
        style={{ 
          minHeight: '200px', 
          width: '100%', 
          backgroundColor: '#f1f3f5', 
          padding: '8px', 
          maxHeight: props.editable ? '500px' : 'none', 
          overflowY: 'auto',
          userSelect: 'text',
          cursor: 'text',
          outline: 'none'
        }}
      />
    </Grid>
  );
}

export default RichContentEditor;
