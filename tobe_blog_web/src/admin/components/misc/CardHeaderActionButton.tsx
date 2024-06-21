import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  GeneralCardData,
  Operation,
  SubjectInfo,
} from "../../../../global/types";

export default function CardHeaderActionButton(props: {
  operations: Operation[];
  data: SubjectInfo | GeneralCardData;
  color?: string;
}) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorRecordId, setAnchorRecordId] = React.useState<null | string>(
    null
  );
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setAnchorRecordId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorRecordId(null);
  };
  function getMenuItem(operationName: string) {
    switch (operationName) {
      case "release":
        return t("components.standard-button.release");
      case "delete":
        return t("components.standard-button.delete");
      case "detail":
        return t("components.standard-button.detail");
    }
  }
  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => handleClick(event, props.data.id)}
      >
        <MoreVertIcon
          sx={{
            color: props.color,
          }}
        />
      </IconButton>
      <Menu
        open={open && props.data.id === anchorRecordId}
        onClose={handleClose}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {props.operations?.map(
          (operation, index) =>
            !operation?.hide?.call(null, props.data) && (
              <MenuItem
                key={props.data.id + "-" + index}
                onClick={() => operation.onClick(props.data.id)}
              >
                {getMenuItem(operation.name)}
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
}
