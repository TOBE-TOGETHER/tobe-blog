import { Box, Typography } from '@mui/material';

interface IContentStatItemProps {
  readonly icon: React.ReactElement;
  readonly label: string;
  readonly value: number;
  readonly color: string;
}

export default function ContentStatItem({ icon, label, value, color }: IContentStatItemProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {icon}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color }}>
          {value?.toLocaleString() || 0}
        </Typography>
      </Box>
    </Box>
  );
} 