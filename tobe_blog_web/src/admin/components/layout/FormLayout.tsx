import { Grid } from "@mui/material"
import { ReactNode } from "react"

export const QuarterRow = (props: {children: ReactNode}) => {
  return <Grid item xs={6} sm={3}>{props.children}</Grid>
}

export const HalfRow = (props: {children: ReactNode}) => {
  return <Grid item xs={12} sm={6}>{props.children}</Grid>
}

export const OneRow = (props: {children: ReactNode}) => {
  return <Grid item xs={12}>{props.children}</Grid>
}