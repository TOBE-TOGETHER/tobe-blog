import { Box, Tooltip } from "@mui/material";
import { ProjectInfo } from "../../../../../global/types";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useTranslation } from "react-i18next";

interface ProjectStatusToolbarProps {
  project: ProjectInfo;
}

export default function ProjectStatusToolbar(props: ProjectStatusToolbarProps) {
  const { t } = useTranslation();
  return (
    <Box>
      {props.project.publicToAll && (
        <Tooltip title={t("project-table.card.tooltip.public-to-all")}>
          <VerifiedIcon color="info" />
        </Tooltip>
      )}
    </Box>
  );
}
