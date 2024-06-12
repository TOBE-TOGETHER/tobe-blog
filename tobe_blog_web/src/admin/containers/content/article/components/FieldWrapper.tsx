import { Grid, Typography } from "@mui/material";
export const FieldWrapper = (props: {
  label: string;
  children: any;
  labelPosition: "left" | "right";
}) => {
  return props.labelPosition === "left" ? (
    <Grid container item xs={12} mt={1}>
      <Grid
        item
        sx={{
          flexGrow: 0,
          alignSelf: "end",
          textAlign: "end",
          pr: 1,
        }}
        xs={3}
        sm={2}
        md={1}
      >
        <Typography variant="subtitle1" color="text.secondary">
          {props.label}
        </Typography>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {props.children}
      </Grid>
    </Grid>
  ) : (
    <Grid container item xs={12} mt={1} alignItems="center">
      <Grid
        item
        sx={{
          flexGrow: 0,
          alignSelf: "end",
          textAlign: "end",
          pr: 1,
        }}
        xs={3}
        sm={2}
        md={1}
      >
        {props.children}
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {props.label}
        </Typography>
      </Grid>
    </Grid>
  );
};
