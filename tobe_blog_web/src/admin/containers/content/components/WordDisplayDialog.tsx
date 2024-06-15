import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import Speech from 'react-text-to-speech';
import { WordGeneralDTO } from '../../../../global/types';

export function WordDisplayDialog(props: {
  word: WordGeneralDTO | null;
  setWord: (word: WordGeneralDTO | null) => void;
}) {
  return (
    <Grid
      item
      sx={{ mb: 1 }}
    >
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={props.word != null}
        onClose={() => props.setWord(null)}
      >
        <DialogContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <Grid container>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600 }}
                >
                  {props.word?.text}
                </Typography>
                <Speech
                  id={props.word?.id || ''}
                  text={props.word?.text || 'Unknown'}
                  startBtn={
                    <IconButton>
                      <PlayCircleOutlineIcon
                        sx={{ width: '1.1rem', height: '1.1rem' }}
                      />
                    </IconButton>
                  }
                  stopBtn={
                    <IconButton>
                      <PauseCircleOutlineIcon
                        sx={{ width: '1.1rem', height: '1.1rem' }}
                      />
                    </IconButton>
                  }
                  rate={4}
                  volume={10}
                  pitch={5}
                  lang={'en'}
                />
              </Grid>
              <Typography variant="body2">
                {props.word?.partOfSpeech}
              </Typography>
            </Grid>
            {props.word?.meaningInChinese && (
              <Grid
                item
                xs={12}
                sx={{ display: 'inline' }}
              >
                <Typography variant="subtitle2">
                  中: {props.word.meaningInChinese}
                </Typography>
              </Grid>
            )}
            {props.word?.meaningInEnglish && (
              <Grid
                item
                xs={12}
              >
                <Typography variant="subtitle2">
                  EN: {props.word.meaningInEnglish}
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
