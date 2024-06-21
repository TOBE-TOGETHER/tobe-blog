import { Button } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface TableButtonProps {
  label?: string | undefined;
  handleOnClick?: () => void | undefined;
  color?:
    | "info"
    | "success"
    | "error"
    | "warning"
    | "primary"
    | "secondary"
    | "inherit"
    | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
}

export function getButtonByOperationName(
  name: string,
  handleOnClick: () => void,
  key?: string | number | undefined
): ReactNode {
  switch (name) {
    case "detail":
      return <DetailButton handleOnClick={handleOnClick} key={key} />;
    case "delete":
      return <DeleteButton handleOnClick={handleOnClick} key={key} />;
    case "release":
      return <ReleaseButton handleOnClick={handleOnClick} key={key} />;
  }
}

export const DetailButton = (props: TableButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      color={props?.color || "info"}
      onClick={props?.handleOnClick}
      variant={props?.variant || "text"}
    >
      {props?.label || t("components.standard-button.detail")}
    </Button>
  );
};

export const ReleaseButton = (props: TableButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      color={props?.color || "warning"}
      onClick={props?.handleOnClick}
      variant={props?.variant || "text"}
    >
      {props?.label || t("components.standard-button.release")}
    </Button>
  );
};

export const DeleteButton = (props: TableButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      color={props?.color || "error"}
      onClick={props?.handleOnClick}
      variant={props?.variant || "text"}
    >
      {props?.label || t("components.standard-button.delete")}
    </Button>
  );
};
