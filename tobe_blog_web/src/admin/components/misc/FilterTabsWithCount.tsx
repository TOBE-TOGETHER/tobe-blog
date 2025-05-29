import { Grid, Tab, Tabs, Tooltip, Typography } from '@mui/material';

interface ITabOption {
  readonly label: string;
  readonly value: string;
}

interface IFilterTabsWithCountProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly tabs: ITabOption[];
  readonly count: number;
  readonly countTooltip?: string;
}

export default function FilterTabsWithCount({
  value,
  onChange,
  tabs,
  count,
  countTooltip
}: IFilterTabsWithCountProps) {
  return (
    <Grid
      sx={{ mb: 1, width: '100%' }}
      container
      justifyContent="space-between"
    >
      <Grid item>
        <Tabs
          value={value}
          onChange={(_, v: string) => onChange(v)}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              disableRipple
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
      </Grid>
      <Grid
        item
        alignSelf="center"
        px={2}
      >
        <Tooltip title={countTooltip || ''}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontWeight: 800 }}
          >
            {count}
          </Typography>
        </Tooltip>
      </Grid>
    </Grid>
  );
} 