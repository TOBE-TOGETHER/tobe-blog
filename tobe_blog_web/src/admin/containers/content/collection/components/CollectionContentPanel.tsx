import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useCommonUtils } from '../../../../../commons/index.ts';
import { FormPanel } from '../../../../../components';
import { IRenderTree, ITagOption } from '../../../../../global/types';
import { SingleTagSelecter, TreePanel } from '../../../../components';
import * as TagRelationshipService from '../TagRelationshipService.ts';

export default function CollectionContentPanel(props: Readonly<{ collectionId: string; loadData: (id: string) => void; treeData: IRenderTree }>) {
  const ROOT = 'root';
  const { t } = useCommonUtils();
  const [currentNodeId, setCurrentNodeId] = useState<string>(ROOT);
  const [targetTag, setTargetTag] = useState<ITagOption | null>(null);
  function handleCreateNewRelationship() {
    const parentId = currentNodeId === ROOT ? null : Number.parseInt(currentNodeId);
    if (!targetTag || !props.collectionId) {
      return;
    }
    const tagId = Number.parseInt(targetTag.value);
    TagRelationshipService.createRelationship({
      parentId,
      tagId,
      collectionId: props.collectionId,
    }).then(() => {
      props.loadData(props.collectionId);
      setTargetTag(null);
    });
  }

  function handleDeleteRelationship() {
    const targetId = currentNodeId === ROOT ? null : Number.parseInt(currentNodeId);
    if (!targetId || !props.collectionId) {
      return;
    }
    TagRelationshipService.deleteRelationship(targetId).then(() => {
      props.loadData(props.collectionId);
      setTargetTag(null);
    });
  }
  return (
    <FormPanel sx={{ mt: 1 }}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{ p: 2 }}
      >
        <TreePanel
          nodes={props.treeData}
          onNodeFocus={(_event, id) => setCurrentNodeId(id)}
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={6}
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
    </FormPanel>
  );
}
