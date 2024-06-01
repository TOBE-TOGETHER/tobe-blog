import { Grid, Link } from "@mui/material";

export const ImagesPanel = (props: {
  keyProfix: string;
  imageURLs: string[];
}) =>
  props.imageURLs.length > 0 ? (
    <Grid container sx={{ width: "calc(100% + 8px)", my: 1 }} spacing={1}>
      {props.imageURLs.map((imgURL: string, index: number) => (
        <Grid
          item
          xl={3}
          lg={3}
          md={4}
          sm={6}
          xs={6}
          key={`${props.keyProfix}_img_${index}`}
        >
          <Link target="_blank" href={imgURL}>
            <Grid
              container
              sx={{
                backgroundImage: `url(${imgURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                height: "200px",
                width: "100%",
                p: 1,
              }}
              key={imgURL}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  ) : (
    <></>
  );
