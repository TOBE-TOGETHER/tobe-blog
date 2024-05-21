import { Grid, Typography, Paper, Link } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

export default function SidePanel(props: {
  title: string;
  readMoreUrl?: string;
  children: any;
}) {
  return (
    <Grid container component={Paper} sx={{ p: 0 }} variant="outlined">
      <Grid
        container
        alignItems="center"
        item
        xs={12}
        sx={{
          px: 2,
          py: 1.5,
          mb: 1,
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <Typography color="text.secondary" variant="subtitle1">
          {props.title}
        </Typography>
        <Grid flexGrow={1} />
        {props.readMoreUrl && (
          <Link href={props.readMoreUrl} sx={{ alignContent: "center" }}>
            <ReadMoreIcon sx={{ color: "text.secondary" }} />
          </Link>
        )}
      </Grid>
      {props.children}
    </Grid>
  );
}
