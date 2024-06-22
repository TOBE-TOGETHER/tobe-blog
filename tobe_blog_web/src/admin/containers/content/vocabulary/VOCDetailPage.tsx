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
  OneRow,
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
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(null);
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  
  const loadData = useCallback(
    (vocabularyId: string): void => {
      setOpenLoading(true);
      VocabularyService.getById(vocabularyId)
        .then((response) => {
          setVocabulary(response.data);
          setDescription(response.data.description);
          setLanguage(response.data.language);
          setCoverImgUrl(response.data.coverImgUrl);
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
        coverImgUrl: coverImgUrl || '',
        tags: tagValue,
      });
    }
    setEditable(!editable);
  };
  
  function handleUpdate(updateDTO: VocabularyUpdateDTO): void {
    setOpenLoading(true);
    VocabularyService.update(updateDTO)
      .then(() => {
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
              <OneRow>
                <TextField
                  label={t('vocabulary-creation-page.fields.language')}
                  fullWidth
                  autoComplete="language"
                  disabled={!editable}
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                />
              </OneRow>
              <OneRow>
                <TextField
                  label={t('vocabulary-creation-page.fields.description')}
                  fullWidth
                  autoComplete="description"
                  disabled={!editable}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </OneRow>
              <OneRow>
                <TextField
                  label={t('vocabulary-creation-page.fields.cover-img-url')}
                  fullWidth
                  onChange={e => setCoverImgUrl(e.target.value)}
                  disabled={!editable}
                  />
              </OneRow>
              <OneRow>
                <MultipleTagSelecter
                  value={tagValue}
                  setValue={setTagValue}
                  disabled={!editable}
                />
              </OneRow>
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
