import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { WordGeneralDTO } from '../../../../global/types';
import { WordService } from '../../../../services';

export function WordDetailDialog(props: {
  word: WordGeneralDTO | null;
  setWord: (word: WordGeneralDTO | null) => void;
  loadData: Function;
  handleDeleteWord: Function;
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  
  function handleClose() {
    props.setWord(null);
  }
  
  function handleSave() {
    WordService.updateWord({
      id: props.word?.id || 0,
      text: props.word?.text || '',
      partOfSpeech: props.word?.partOfSpeech || '',
      meaningInChinese: props.word?.meaningInChinese || '',
      meaningInEnglish: props.word?.meaningInEnglish || '',
    })
      .then(() => {
        enqueueSnackbar(t('word-dialog.msg.success'), {
          variant: 'success',
        });
        handleClose();
        props.loadData(props.word?.vocabularyId);
      })
      .catch(() => {
        enqueueSnackbar(t('word-dialog.msg.error'), {
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
              spacing={3}
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
                  variant="standard"
                  defaultValue={props.word?.text}
                  onChange={(e) =>
                    Object.assign(props.word || {}, { word: e.target.value })
                  }
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
                  variant="standard"
                  defaultValue={props.word?.partOfSpeech}
                  onChange={(e) => {
                    Object.assign(props.word || {}, {
                      partOfSpeech: e.target.value,
                    });
                    console.log(props.word);
                    console.log(e.target.value);
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
                  variant="standard"
                  defaultValue={props.word?.meaningInChinese}
                  onChange={(e) =>
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
                  variant="standard"
                  defaultValue={props.word?.meaningInEnglish}
                  onChange={(e) =>
                    Object.assign(props.word || {}, {
                      meaningInEnglish: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={() =>
                  props.handleDeleteWord &&
                  props.handleDeleteWord(props.word?.id)
                }
              >
                {t('word-dialog.delete')}
              </Button>
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
