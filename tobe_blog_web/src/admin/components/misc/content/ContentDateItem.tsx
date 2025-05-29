import { Box, Typography } from '@mui/material';
import { TimeFormat } from '../../../../commons';

interface IContentDateItemProps {
  readonly label: string;
  readonly date: string | undefined;
}

export default function ContentDateItem({ label, date }: IContentDateItemProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.75rem', mb: 0.25 }}>
        {label}
      </Typography>
      <Typography variant="body2">
        {TimeFormat.dateAndTimeFormat(date)}
      </Typography>
    </Box>
  );
} 