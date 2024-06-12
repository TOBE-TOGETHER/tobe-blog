import {
  Box,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import {
  TagOption,
  VocabularyDetailDTO,
  VocabularyUpdateDTO,
} from '../../../../global/types';
import { VocabularyService } from '../../../../services';
import {
  EditIconButton,
  MultipleTagSelecter,
} from '../../../components';
import { WordListPanel } from '../components/WordListPanel';

export default function VOCDetailPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [vocabulary, setVocabulary] = useState<VocabularyDetailDTO | null>(
    null,
  );
  const [description, setDescription] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  
  const loadData = useCallback(
    (vocabularyId: string): void => {
      setOpenLoading(true);
      VocabularyService.getById(vocabularyId)
        .then((response) => {
          setVocabulary(response.data);
          setDescription(response.data.description);
          setLanguage(response.data.language);
          setTagValue(response.data.tags);
        })
        .catch(() => {
          enqueueSnackbar(t('vocabulary-detail-page.msg.error'), {
            variant: 'error',
          });
        })
        .finally(() => setOpenLoading(false));
    },
    [
      enqueueSnackbar,
      t,
    ],
  );
  
  useEffect(() => loadData(id || ''), [
    id,
    loadData,
  ]);
  
  const handleEditableChange = () => {
    if (!vocabulary) {
      return;
    }
    if (editable) {
      handleUpdate({
        id: vocabulary.id,
        title: vocabulary.title,
        description: description || '',
        language: language || '',
        tags: tagValue,
      });
    }
    setEditable(!editable);
  };
  
  function handleUpdate(updateDTO: VocabularyUpdateDTO): void {
    setOpenLoading(true);
    VocabularyService.update(updateDTO)
      .then((response) => {
        enqueueSnackbar(t('vocabulary-detail-page.msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('vocabulary-detail-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={vocabulary?.title || ''}
    >
      {vocabulary && (
        <Grid
          container
          sx={{ my: 0, pr: { xs: 0.5, md: 1 }, py: { xs: 0.5, md: 1 } }}
          alignItems="center"
        >
          <Grid
            item
            flexGrow={1}
          ></Grid>
          <Grid
            item
            flexGrow={0}
          >
            <EditIconButton
              editable={editable}
              handleEditableChange={handleEditableChange}
            />
          </Grid>
        </Grid>
      )}
      <Paper
        variant="outlined"
        sx={{ mt: 0, mb: 1, p: { xs: 2, md: 3 } }}
      >
        <Box justifyContent="center">
          {vocabulary && (
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  id="language"
                  name="language"
                  label={t('vocabulary-creation-page.fields.language')}
                  fullWidth
                  autoComplete="language"
                  variant="standard"
                  disabled={!editable}
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  id="description"
                  name="description"
                  label={t('vocabulary-creation-page.fields.description')}
                  fullWidth
                  autoComplete="description"
                  variant="standard"
                  disabled={!editable}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <MultipleTagSelecter
                  value={tagValue}
                  setValue={setTagValue}
                  disabled={!editable}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
      {id && (
        <Paper
          variant="outlined"
          sx={{ my: 1, p: { xs: 2, md: 3 } }}
        >
          <WordListPanel
            editable={true}
            vocabularyId={id}
          />
        </Paper>
      )}
    </Page>
  );
}
