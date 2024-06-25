import { Grid, Paper } from "@mui/material";
import { ReactNode } from "react";

export default function ContentPageFrame(props: {
  mainContent: ReactNode;
  sideContents: ReactNode[];
}) {
  return props.mainContent ? (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={9}>
        <Paper
          sx={{
            py: { xs: 0, sm: 2 },
            px: { xs: 0, sm: 2 },
            borderWidth: { xs: "0px", sm: "1px" },
          }}
          variant="outlined"
        >
          {props.mainContent}
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={3}>
        {props.sideContents}
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
