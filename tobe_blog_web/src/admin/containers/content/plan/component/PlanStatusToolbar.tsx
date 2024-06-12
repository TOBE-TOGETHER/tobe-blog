import { Box, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ProjectInfo } from "../../../../../global/types";


interface PlanStatusToolbarProps {
  project: ProjectInfo;
}

export default function PlanStatusToolbar(props: PlanStatusToolbarProps) {
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
