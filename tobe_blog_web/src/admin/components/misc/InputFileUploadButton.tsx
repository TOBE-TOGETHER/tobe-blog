import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputFileUploadButton(props: {
  onImageChange: Function;
}) {
  const { t } = useTranslation();
  return (
    <Button
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="contained"
      size="small"
    >
      {t("components.upload-pics")}
      <VisuallyHiddenInput
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => props.onImageChange(e)}
      />
    </Button>
  );
}
