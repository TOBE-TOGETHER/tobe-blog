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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WordService } from '../../../../services';

export function WordCreateDialog(props: {
  vocabularyId: string;
  loadData: Function;
  open: boolean;
  setOpen: Function;
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [text, setText] = useState<string>('');
  const [partOfSpeech, setPartOfSpeech] = useState<string>('');
  const [meaningInChinese, setMeaningInChinese] = useState<string>('');
  const [meaningInEnglish, setMeaningInEnglish] = useState<string>('');
  
  function handleClose() {
    setText('');
    setPartOfSpeech('');
    setMeaningInChinese('');
    setMeaningInEnglish('');
    props.setOpen(false);
  }
  
  function handleSave() {
    WordService.createWord({
      vocabularyId: props.vocabularyId,
      text: text,
      partOfSpeech: partOfSpeech,
      meaningInChinese: meaningInChinese,
      meaningInEnglish: meaningInEnglish,
    })
      .then(() => {
        enqueueSnackbar(t('word-dialog.msg.success'), {
          variant: 'success',
        });
        handleClose();
        props.loadData(props.vocabularyId);
      })
      .catch(() => {
        enqueueSnackbar(t('word-dialog.msg.error'), {
          variant: 'error',
        });
      });
  }
  
  return (
    <Grid
      item
      sx={{ mb: 1 }}
    >
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={props.open}
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
                value={text}
                onChange={(e) => setText(e.target.value)}
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
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
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
                value={meaningInChinese}
                onChange={(e) => setMeaningInChinese(e.target.value)}
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
                value={meaningInEnglish}
                onChange={(e) => setMeaningInEnglish(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose}>{t('word-dialog.back')}</Button>
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
  );
}
