import {
  Box,
  Button,
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
import { Page } from '../../../components/layout';
import {
  RenderTree,
  SubjectInfoGeneralDTO,
  SubjectInfoUpdateDTO,
  TagOption,
  TagRelationship,
} from '../../../global/types';
import { SubjectService } from '../../../services';
import {
  EditIconButton,
  TreePanel,
} from '../../components';
import SingleTagSelecter from './SingleTagSelecter';

export default function SubjectDetailPage() {
  const ROOT = 'root';
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [editable, setEditable] = useState<boolean>(false);
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [subject, setSubject] = useState<SubjectInfoGeneralDTO | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(null);
  const [treeData, setTreeData] = useState<RenderTree>({
    id: ROOT,
    name: 'ROOT',
    children: [],
  });
  const [currentNodeId, setCurrentNodeId] = useState<string>(ROOT);
  const [targetTag, setTargetTag] = useState<TagOption | null>(null);
  
  const loadData = useCallback(
    (id: string): void => {
      function convert(tagRelationships: TagRelationship[]): RenderTree[] {
        if (!Array.isArray(tagRelationships) || tagRelationships.length === 0) {
          return [];
        }
        return tagRelationships.map((t) => {
          return {
            id: t.id + '',
            name: t.label,
            children: convert(t.children),
          };
        });
      }
      
      setOpenLoading(true);
      SubjectService.getById(id)
        .then((response) => {
          setSubject(response.data);
          setDescription(response.data.description);
          setCoverImgUrl(response.data.coverImgUrl);
          treeData.children = convert(response.data.tagTree);
          setTreeData(treeData);
        })
        .catch(() => {
          enqueueSnackbar(t('subject-detail-page.msg.error'), {
            variant: 'error',
          });
        })
        .finally(() => setOpenLoading(false));
    },
    [
      treeData,
      t,
      enqueueSnackbar,
    ],
  );
  
  useEffect(() => loadData(id || ''), [
    loadData,
    id,
  ]);
  
  const handleEditableChange = () => {
    if (!subject) {
      return;
    }
    if (editable) {
      handleUpdate({
        id: subject.id,
        name: subject.name,
        description: description || '',
        coverImgUrl: coverImgUrl || '',
      });
    }
    setEditable(!editable);
  };
  
  function handleUpdate(target: SubjectInfoUpdateDTO): void {
    setOpenLoading(true);
    SubjectService.update(target)
      .then(() => {
        enqueueSnackbar(t('subject-detail-page.msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('subject-detail-page.msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setOpenLoading(false));
  }
  
  function handleCreateNewRelationship() {
    setOpenLoading(true);
    const parentId =
      currentNodeId === ROOT ? null : Number.parseInt(currentNodeId);
    if (!targetTag || !id) {
      return;
    }
    const tagId = Number.parseInt(targetTag.value);
    SubjectService.createRelationship({
      parentId,
      tagId,
      subjectId: id,
    }).then(() => {
      loadData(id);
      setTargetTag(null);
    });
  }
  
  function handleDeleteRelationship() {
    setOpenLoading(true);
    const targetId =
      currentNodeId === ROOT ? null : Number.parseInt(currentNodeId);
    if (!targetId || !id) {
      return;
    }
    SubjectService.deleteRelationship(targetId).then(() => {
      loadData(id);
      setTargetTag(null);
    });
  }
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={subject?.name || ''}
    >
      {subject && (
        <Grid
          container
          sx={{ m: 0, p: { xs: 0.5, md: 1 } }}
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
          {subject && (
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  id="coverImgUrl"
                  name="coverImgUrl"
                  label={t('subject-creation-page.fields.cover-img-url')}
                  fullWidth
                  disabled={!editable}
                  autoComplete="coverImgUrl"
                  variant="standard"
                  value={coverImgUrl}
                  onChange={(event) => setCoverImgUrl(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  id="description"
                  name="description"
                  label={t('subject-creation-page.fields.description')}
                  fullWidth
                  autoComplete="description"
                  variant="standard"
                  multiline
                  maxRows={2}
                  minRows={2}
                  disabled={!editable}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
      <Grid
        container
        component={Paper}
        variant="outlined"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{ p: 2 }}
        >
          <TreePanel
            nodes={treeData}
            onNodeFocus={(_event, id) => setCurrentNodeId(id)}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          sx={{ p: 2 }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            sx={{ alignSelf: 'flex-start', p: 1 }}
          >
            <SingleTagSelecter
              value={targetTag}
              setValue={setTargetTag}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ alignSelf: 'flex-end', p: 1 }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateNewRelationship}
            >
              {t('subject-detail-page.btn.add')}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ alignSelf: 'flex-end', p: 1 }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleDeleteRelationship}
            >
              {t('subject-detail-page.btn.delete')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
