import { Grid, Paper, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export const FormPanel = (props: { children?: ReactNode[]; sx?: SxProps<Theme> }) => {
  return props.children ? (
    <Paper sx={{ mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: 4, ...props.sx }}>
      <Grid
        container
        spacing={2}
      >
        {...props.children}
      </Grid>
    </Paper>
  ) : (
    <></>
  );
};

export const QuarterRow = (props: { children: ReactNode; sx?: SxProps<Theme> }) => {
  return (
    <Grid
      item
      xs={6}
      sm={3}
      sx={props.sx}
    >
      {props.children}
    </Grid>
  );
};

export const HalfRow = (props: { children: ReactNode; sx?: SxProps<Theme> }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      sx={props.sx}
    >
      {props.children}
    </Grid>
  );
};

export const OneRow = (props: { children: ReactNode; sx?: SxProps<Theme> }) => {
  return (
    <Grid
      item
      xs={12}
      sx={props.sx}
    >
      {props.children}
    </Grid>
  );
};
