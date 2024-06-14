import VerifiedIcon from '@mui/icons-material/Verified';
import {
  Box,
  Tooltip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PlanInfo } from '../../../../../global/types';

interface PlanStatusToolbarProps {
  plan: PlanInfo;
}

export default function PlanStatusToolbar(props: PlanStatusToolbarProps) {
  const { t } = useTranslation();
  return (
    <Box>
      {props.plan.publicToAll && (
        <Tooltip title={t('plan-table.card.tooltip.public-to-all')}>
          <VerifiedIcon color="info" />
        </Tooltip>
      )}
    </Box>
  );
}
