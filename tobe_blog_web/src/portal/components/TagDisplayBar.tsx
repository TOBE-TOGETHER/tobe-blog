import { Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ITagOption } from '../../global/types';

const ListItem = styled('li')(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  marginTop: theme.spacing(1),
}));

export default function TagDisplayBar(props: Readonly<{ tags: ITagOption[] }>) {
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0,
        m: 0,
      }}
      component="ul"
    >
      {props.tags.map(data => {
        return (
          <ListItem key={data.value}>
            <Chip
              label={data.label}
              variant="outlined"
              size="small"
              sx={{
                color: 'text.secondary',
                margin: 'auto',
                borderRadius: 3,
              }}
            />
          </ListItem>
        );
      })}
    </Grid>
  );
}
