import { Breadcrumbs as MBreadcrumbs, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BreadcrumbsNode } from "../../../global/types";

export default function Breadcrumbs(props: { nodes?: BreadcrumbsNode[] }) {
  const { t } = useTranslation();
  return (
    <MBreadcrumbs
      aria-label="breadcrumb"
      sx={{ m: 1, ml: 0, flexGrow: 1, fontSize: "0.875rem" }}
    >
      <Link underline="hover" color="inherit" href="/">
        {t("breadcrumbs.home")}
      </Link>
      {props.nodes?.map((n) => {
        return (
          <Link underline="hover" color="inherit" href={n.href} key={n.href}>
            {n.label}
          </Link>
        );
      })}
      <Typography color="text.primary" sx={{ fontSize: "inherit" }}>
        {t("breadcrumbs.content")}
      </Typography>
    </MBreadcrumbs>
  );
}
