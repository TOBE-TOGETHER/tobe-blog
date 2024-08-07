import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { MouseEventHandler } from "react";

export default function EditIconButton(props: Readonly<{ editable: boolean, handleEditableChange: MouseEventHandler}>) {
  const { t } = useTranslation();
  return (
    <Tooltip
      title={
        props.editable
          ? t("components.edit-icon-button.save")
          : t("components.edit-icon-button.edit")
      }
    >
      <IconButton onClick={props.handleEditableChange}>
        {props.editable ? <SaveIcon /> : <EditIcon />}
      </IconButton>
    </Tooltip>
  );
}
