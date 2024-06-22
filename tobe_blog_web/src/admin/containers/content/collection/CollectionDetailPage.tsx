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
import { Page } from '../../../../components/layout';
import {
  CollectionUpdateDTO,
  ICollectionDTO,
  RenderTree,
  TagOption,
  TagRelationship
} from '../../../../global/types';
import { CollectionService, TagRelationshipService } from '../../../../services';
import {
  EditIconButton,
  MultipleTagSelecter,
  OneRow,
  TreePanel,
} from '../../../components';
import SingleTagSelecter from './SingleTagSelecter';

export default function CollectionDetailPage() {
  const ROOT = 'root';
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [editable, setEditable] = useState<boolean>(false);
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [collection, setCollections] = useState<ICollectionDTO | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(null);
  const [tagValues, setTagValues] = useState<TagOption[]>([]);
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
      CollectionService.getById(id)
        .then((response) => {
          setCollections(response.data);
          setDescription(response.data.description);
          setCoverImgUrl(response.data.coverImgUrl);
          setTagValues(response.data.tags);
          treeData.children = convert(response.data.tagTree);
          setTreeData(treeData);
        })
        .catch(() => {
          enqueueSnackbar(t('collection-detail-page.msg.error'), {
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
    if (!collection) {
      return;
    }
    if (editable) {
      handleUpdate({
        id: collection.id,
        title: collection.title,
        description: description || '',
        coverImgUrl: coverImgUrl || '',
        tags: tagValues
      });
    }
    setEditable(!editable);
  };
  
  function handleUpdate(target: CollectionUpdateDTO): void {
    setOpenLoading(true);
    CollectionService.update(target)
      .then(() => {
        enqueueSnackbar(t('collection-detail-page.msg.success'), {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(t('collection-detail-page.msg.error'), {
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
    TagRelationshipService.createRelationship({
      parentId,
      tagId,
      collectionId: id,
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
    TagRelationshipService.deleteRelationship(targetId).then(() => {
      loadData(id);
      setTargetTag(null);
    });
  }
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={collection?.title || ''}
    >
      {collection && (
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
          {collection && (
            <Grid
              container
              spacing={3}
            >
              <OneRow>
                <TextField
                  label={t('collection-creation-page.fields.description')}
                  fullWidth
                  multiline
                  maxRows={2}
                  minRows={2}
                  disabled={!editable}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </OneRow>
              <OneRow>
                <TextField
                  label={t('collection-creation-page.fields.cover-img-url')}
                  fullWidth
                  disabled={!editable}
                  autoComplete="coverImgUrl"
                  value={coverImgUrl}
                  onChange={(event) => setCoverImgUrl(event.target.value)}
                />
              </OneRow>
              <OneRow>
                <MultipleTagSelecter
                  value={tagValues}
                  setValue={setTagValues}
                  disabled={!editable}
                />
              </OneRow>
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
              {t('collection-detail-page.btn.add')}
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
              {t('collection-detail-page.btn.delete')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
