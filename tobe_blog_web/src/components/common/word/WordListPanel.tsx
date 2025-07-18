import Add from '@mui/icons-material/Add';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useCommonUtils } from '../../../commons';
import { IWordGeneralDTO } from '../../../global/types';
import * as PublicDataService from '../../../services/PublicDataService';
import theme from '../../../theme';
import { WordCreateDialog } from './WordCreateDialog';
import { WordDetailDialog } from './WordDetailDialog';
import { WordDisplayDialog } from './WordDisplayDialog';
import * as WordService from './WordService';

export function WordListPanel(props: Readonly<{ editable: boolean; vocabularyId: string }>) {
  const { t, enqueueSnackbar } = useCommonUtils();
  const [open, setOpen] = useState<boolean>(false);
  const [openedWord, setOpenedWord] = useState<IWordGeneralDTO | null>(null);
  const [words, setWords] = useState<IWordGeneralDTO[]>([]);

  const loadWordsData = useCallback(
    (vocabularyId: string): void => {
      PublicDataService.getWordsByVOCId(vocabularyId)
        .then(response => {
          setWords(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t('msg.error'), {
            variant: 'error',
          });
        })
        .finally();
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => loadWordsData(props.vocabularyId || ''), [props.vocabularyId, loadWordsData]);

  function handleDeleteWord(wordId: number) {
    WordService.deleteWordById(wordId)
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        loadWordsData(props.vocabularyId || '');
        setOpenedWord(null);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      });
  }

  function render(words: IWordGeneralDTO[]) {
    const letterSet: Set<string> = new Set(
      words
        .map(w => w.text[0].toUpperCase())
        .sort((w1, w2) => {
          if (w1 > w2) {
            return 1;
          } else if (w1 < w2) {
            return -1;
          } else {
            return 0;
          }
        })
    );
    const elements: JSX.Element[] = [];
    Array.from(letterSet).forEach(l => {
      let groupedWords = words
        .filter(w => w.text.toUpperCase().startsWith(l))
        .sort((w1, w2) => {
          if (w1.text > w2.text) {
            return 1;
          } else if (w1.text < w2.text) {
            return -1;
          } else {
            return 0;
          }
        });
      elements.push(
        <Grid
          item
          sx={{ m: 0.5 }}
          key={l}
        >
          <Typography variant="h6">{`${l} - ${groupedWords.length}`}</Typography>
          <Divider />
        </Grid>
      );
      const wordEles: JSX.Element[] = [];
      groupedWords.forEach(w => {
        wordEles.push(
          <Grid
            item
            key={w.id}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            xl={2}
          >
            <Button
              variant="text"
              onClick={() => setOpenedWord(w)}
              size="large"
              sx={{ color: theme.palette.text.secondary }}
            >
              {w.text}
            </Button>
          </Grid>
        );
      });
      props.editable &&
        wordEles.push(
          <Grid
            item
            key={'add-btn-' + l}
            flexGrow={1}
            sx={{
              'opacity': 0,
              '&:hover': {
                opacity: 100,
              },
            }}
          >
            <Button
              variant="text"
              onClick={() => setOpen(true)}
              size="large"
              sx={{ color: 'rgba(0,0,0,0.4)' }}
            >
              <Add />
            </Button>
          </Grid>
        );
      elements.push(
        <Grid
          key={'sec-' + elements.length}
          item
          container
          sx={{ m: 0.5 }}
        >
          {wordEles}
        </Grid>
      );
    });

    if ((!letterSet || letterSet.size === 0) && props.editable) {
      elements.push(
        <Grid
          key={'sec-0'}
          item
          container
          sx={{ m: 0.5 }}
        >
          <Grid
            item
            key={'add-btn-0'}
            flexGrow={1}
            sx={{
              'opacity': 0,
              '&:hover': {
                opacity: 100,
              },
            }}
          >
            <Button
              variant="text"
              onClick={() => setOpen(true)}
              size="large"
              sx={{ color: 'rgba(0,0,0,0.4)' }}
            >
              <Add />
            </Button>
          </Grid>
        </Grid>
      );
    }
    return elements;
  }

  return (
    <Box justifyContent="center">
      <Grid
        container
        direction="column"
        sx={{ minHeight: '30vh' }}
      >
        {render(words)}
      </Grid>
      <WordCreateDialog
        open={open}
        setOpen={setOpen}
        vocabularyId={props.vocabularyId}
        loadData={loadWordsData}
      />
      {props.editable ? (
        <WordDetailDialog
          word={openedWord}
          setWord={setOpenedWord}
          loadData={loadWordsData}
          handleDeleteWord={handleDeleteWord}
        />
      ) : (
        <WordDisplayDialog
          word={openedWord}
          setWord={setOpenedWord}
        />
      )}
    </Box>
  );
}
