import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import {
  CollectionInfo,
  Operation,
} from '../../../../global/types';
import { CardHeaderActionButton } from '../../../components';

export default function CollectionCardView(props: {
  data: CollectionInfo[];
  operations: Operation[];
  onClick?: (id: number | string) => void;
}) {
  return (
    <Grid
      container
      spacing={1}
    >
      {props.data.map((subject: CollectionInfo) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={subject.id}
        >
          <Card variant="outlined">
            <CardHeader
              sx={{ py: 1 }}
              action={
                <CardHeaderActionButton
                  data={subject}
                  operations={props.operations}
                />
              }
            />
            <CardActionArea
              onClick={() => props.onClick && props.onClick(subject.id)}
            >
              <CardMedia
                sx={{
                  height: 140,
                  alignContent: 'center',
                }}
                image={subject.coverImgUrl}
                title={subject.title}
              >
                <Typography
                  gutterBottom
                  variant="h4"
                  color={subject.coverImgUrl?.length > 0 ? 'white' : 'primary'}
                  sx={{
                    width: '100%',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                  }}
                >
                  {subject.title}
                </Typography>
              </CardMedia>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    width: '100%',
                    height: '20px',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {subject.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
