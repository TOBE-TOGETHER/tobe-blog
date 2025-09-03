import { Grid } from '@mui/material';
import { EditorStyle } from '../../../../components/common/EditorStyle';
import '@wangeditor/editor/dist/css/style.css';

function RichContentReader(props: Readonly<{ htmlValue: string }>) {
  return (
    <Grid className="w-e-text-container" container sx={{
        ...EditorStyle,
        width: '100%',
        "& .w-e-text-container ul": {
          ml: '20px'
        },
        "& .w-e-text-container ol": {
          ml: '20px'
        },
        "& .w-e-text-container hr": {
          margin: '20px auto',
          border: 'none',
          borderBottom: '1px solid #e0e0e0',
        },
        
       }}>
        <div
          className='w-e-text-container'
          data-slate-editor
          dangerouslySetInnerHTML={{ __html: props.htmlValue }}
          style={{
            width: '100%',
            padding: '0px'
          }}
        />
    </Grid>
  );
}

export default RichContentReader;
