import { Grid } from '@mui/material';

function RichContentReader(props: Readonly<{ htmlValue: string }>) {
  return (
    <Grid sx={{ width: '100%' }}>
      <div
        className="reader"
        dangerouslySetInnerHTML={{ __html: props.htmlValue }}
        style={{ width: '100%' }}
      />
    </Grid>
  );
}

export default RichContentReader;
