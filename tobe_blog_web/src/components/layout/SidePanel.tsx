import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Grid, Link, Paper, Typography } from '@mui/material';

export default function SidePanel(props: Readonly<{ title: string, readMoreUrl?: string, children: any }>) {
  return (
    <Paper sx={{ p: 1, borderRadius: 4 }}>
      <Grid
        container
        alignItems="center"
        item
        xs={12}
        sx={{
          px: 2,
          py: 1.5,
          mb: 1,
          borderBottom: '1px solid rgba(0,0,0,0.12)',
        }}
      >
        <Typography
          color="text.secondary"
          variant="subtitle1"
        >
          {props.title}
        </Typography>
        <Grid flexGrow={1} />
        {props.readMoreUrl && (
          <Link
            href={props.readMoreUrl}
            sx={{ alignContent: 'center' }}
          >
            <ReadMoreIcon sx={{ color: 'text.secondary' }} />
          </Link>
        )}
      </Grid>
      {props.children}
    </Paper>
  );
}
