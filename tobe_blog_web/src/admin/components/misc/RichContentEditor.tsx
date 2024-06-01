import "@wangeditor/editor/dist/css/style.css";

import { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { useTranslation } from "react-i18next";
import { SlateElement } from "@wangeditor/editor";

type ImageElement = SlateElement & {
  src: string;
  alt: string;
  url: string;
  href: string;
};

interface RichContentEditorProps {
  htmlValue: string;
  textValue: string;
  setHtmlValue: (value: string) => void;
  setTextValue: (value: string) => void;
}

function RichContentEditor(props: RichContentEditorProps) {
  const { t } = useTranslation();
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  const editorConfig: Partial<IEditorConfig> = {
    MENU_CONF: {
      insertImage: {
        onInsertedImage(imageNode: ImageElement | null) {
          if (imageNode == null) return;
          const { src, alt, url, href } = imageNode;
          console.log("inserted image", src, alt, url, href);
        },
      },
      editImage: {
        onUpdatedImage(imageNode: ImageElement | null) {
          if (imageNode == null) return;
          const { src, alt, url } = imageNode;
          console.log("updated image", src, alt, url);
        },
      },
      uploadImage: {
        // server: '/api/upload',
        base64LimitSize: 20 * 1024, // 20kb,
        fieldName: "your-custom-name",
        maxFileSize: 10 * 1024 * 1024, // 10M
        maxNumberOfFiles: 10,
        allowedFileTypes: ["image/*"],
      },
    },
    placeholder: t("components.rich-editor.placeholder"),
  };

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      "bgColor",
      "fontSize",
      "fontFamily",
      "lineHeight",
      "uploadVideo",
      "fullScreen",
    ],
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div
      style={{
        borderRadius: "4px",
        margin: 0,
        width: "100%",
      }}
    >
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={props.htmlValue}
        onCreated={setEditor}
        onChange={(editor) => {
          props.setHtmlValue(editor.getHtml());
          props.setTextValue(editor.getText());
        }}
        mode="default"
        style={{ height: "500px", overflowY: "hidden", width: "100%" }}
      />
    </div>
  );
}

export default RichContentEditor;
