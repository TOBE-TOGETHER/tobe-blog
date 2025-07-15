import { Grid } from '@mui/material';
import '@wangeditor/editor/dist/css/style.css';

function RichContentReader(props: Readonly<{ htmlValue: string }>) {
  return (
    <Grid className="w-e-text-container" container>
        <div
          className='w-e-text-container'
          data-slate-editor
          dangerouslySetInnerHTML={{ __html: props.htmlValue }}
        />
    </Grid>
  );
}

export default RichContentReader;
