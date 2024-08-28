import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import Speech from 'react-text-to-speech';
import { IWordGeneralDTO } from '../../../global/types';

export function WordDisplayDialog(props: Readonly<{ word: IWordGeneralDTO | null; setWord: (word: IWordGeneralDTO | null) => void }>) {
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
              <Grid
                container
                item
                sx={{ alignItems: 'self-end' }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, mr: 2 }}
                >
                  {props.word?.text}
                </Typography>
                <Speech
                  id={props.word?.id + ''}
                  text={props.word?.text ?? 'Unknown'}
                  useStopOverPause={true}
                  rate={0.8}
                  volume={10}
                  pitch={1.2}
                  lang={'en-GB'}
                />
              </Grid>
              <Typography variant="body2">{props.word?.partOfSpeech}</Typography>
            </Grid>
            {props.word?.meaningInChinese && (
              <Grid
                item
                xs={12}
                sx={{ display: 'inline' }}
              >
                <Typography variant="subtitle2">中: {props.word.meaningInChinese}</Typography>
              </Grid>
            )}
            {props.word?.meaningInEnglish && (
              <Grid
                item
                xs={12}
              >
                <Typography variant="subtitle2">EN: {props.word.meaningInEnglish}</Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
