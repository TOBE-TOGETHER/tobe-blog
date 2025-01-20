import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useCommonUtils } from '../../../commons';
import { IWordGeneralDTO } from '../../../global/types';
import * as WordService from './WordService';

export function WordDetailDialog(props: { word: IWordGeneralDTO | null; setWord: (word: IWordGeneralDTO | null) => void; loadData: Function; handleDeleteWord: Function }) {
  const { t, enqueueSnackbar } = useCommonUtils();

  function handleClose() {
    props.setWord(null);
  }

  function handleSave() {
    WordService.updateWord({
      id: props.word?.id ?? 0,
      text: props.word?.text ?? '',
      partOfSpeech: props.word?.partOfSpeech ?? '',
      meaningInChinese: props.word?.meaningInChinese ?? '',
      meaningInEnglish: props.word?.meaningInEnglish ?? '',
    })
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        handleClose();
        props.loadData(props.word?.vocabularyId);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      });
  }

  return (
    props.word && (
      <Grid
        item
        sx={{ mb: 1 }}
      >
        <Dialog
          fullWidth={true}
          maxWidth={'sm'}
          open={props.word != null}
          onClose={handleClose}
        >
          <DialogTitle>{t('word-dialog.title')}</DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                xs={6}
              >
                <TextField
                  margin="dense"
                  id="word"
                  label={t('word-dialog.fields.word')}
                  fullWidth
                  defaultValue={props.word?.text}
                  onChange={e => Object.assign(props.word || {}, { word: e.target.value })}
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <TextField
                  margin="dense"
                  id="partOfSpeech"
                  label={t('word-dialog.fields.partOfSpeech')}
                  fullWidth
                  defaultValue={props.word?.partOfSpeech}
                  onChange={e => {
                    Object.assign(props.word || {}, {
                      partOfSpeech: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  margin="dense"
                  id="meaningInChinese"
                  label={t('word-dialog.fields.meaningInChinese')}
                  fullWidth
                  defaultValue={props.word?.meaningInChinese}
                  onChange={e =>
                    Object.assign(props.word || {}, {
                      meaningInChinese: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  margin="dense"
                  id="meaningInEnglish"
                  label={t('word-dialog.fields.meaningInEnglish')}
                  fullWidth
                  defaultValue={props.word?.meaningInEnglish}
                  onChange={e =>
                    Object.assign(props.word || {}, {
                      meaningInEnglish: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={() => props.handleDeleteWord?.(props.word?.id)}>{t('word-dialog.delete')}</Button>
              <Button
                onClick={handleSave}
                variant="contained"
              >
                {t('word-dialog.save')}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Grid>
    )
  );
}
