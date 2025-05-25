import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommonUtils } from '../../../../commons';
import { ICollectionDTO, ICollectionUpdateDTO, IRenderTree, ITagRelationship } from '../../../../global/types';
import { useCommonContentState } from '../commons';
import BaseContentPage from '../components/ContentPage';
import { CollectionService } from '../UserContentService';
import CollectionContentPanel from './components/CollectionContentPanel';
import CollectionPreviewPanel from './components/CollectionPreviewPanel';
import ContentEditMainSection from './components/CollectionEditMainSection';

export default function CollectionDetailPage() {
  const ROOT = 'root';
  const { id } = useParams();
  const { t, enqueueSnackbar } = useCommonUtils();
  const [collection, setCollection] = useState<ICollectionDTO | null>(null);
  const [treeData, setTreeData] = useState<IRenderTree>({
    id: ROOT,
    name: 'ROOT',
    children: [],
  });
  const [previewRefreshTrigger, setPreviewRefreshTrigger] = useState<number>(0);
  const { loading, setLoading, editable, setEditable, title, setTitle, description, setDescription, coverImgUrl, setCoverImgUrl, tagValues, setTagValues, topic, setTopic } =
    useCommonContentState();

  const loadData = useCallback(
    (id: string): void => {
      function convert(tagRelationships: ITagRelationship[]): IRenderTree[] {
        if (!Array.isArray(tagRelationships) || tagRelationships.length === 0) {
          return [];
        }
        return tagRelationships.map(t => {
          return {
            id: t.id + '',
            name: t.label,
            children: convert(t.children),
          };
        });
      }
      setLoading(true);
      CollectionService.getById(id)
        .then(response => {
          setCollection(response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCoverImgUrl(response.data.coverImgUrl);
          setTagValues(response.data.tags);
          setTopic(response.data.topic);
          const newTreeData = treeData;
          newTreeData.children = convert(response.data.tagTree);
          setTreeData(newTreeData);
          // Trigger preview refresh when tag tree changes
          setPreviewRefreshTrigger(prev => prev + 1);
        })
        .catch(() => {
          enqueueSnackbar(t('msg.error'), {
            variant: 'error',
          });
        })
        .finally(() => setLoading(false));
    },
    [treeData, t, enqueueSnackbar]
  );

  useEffect(() => loadData(id ?? ''), [loadData, id]);

  const handleEditableChange = () => {
    if (!collection) {
      return;
    }
    if (!title) {
      enqueueSnackbar(t('collection-creation-page.msg.warning.name-empty'), {
        variant: 'warning',
      });
      return;
    }
    if (editable) {
      handleUpdate({
        id: collection.id,
        title: title,
        description: description,
        coverImgUrl: coverImgUrl,
        tags: tagValues,
        topic: topic,
      });
    }
    setEditable(!editable);
  };

  function handleUpdate(target: ICollectionUpdateDTO): void {
    setLoading(true);
    CollectionService.update(target)
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        // Trigger preview refresh after update
        setPreviewRefreshTrigger(prev => prev + 1);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }

  const handleTagTreeChange = useCallback(() => {
    // Called when tag tree is modified in CollectionContentPanel
    setPreviewRefreshTrigger(prev => prev + 1);
  }, []);

  return collection ? (
    <BaseContentPage
      loading={loading}
      id={id}
      title={title}
      editable={editable}
      handleEditableChange={handleEditableChange}
      service={CollectionService}
      contentData={collection}
      onVisibilityChange={() => loadData(id ?? '')}
    >
      <ContentEditMainSection
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        coverImgUrl={coverImgUrl}
        setCoverImgUrl={setCoverImgUrl}
        tagValues={tagValues}
        setTagValues={setTagValues}
        editable={editable}
        topic={topic}
        setTopic={setTopic}
      />
      <CollectionContentPanel
        collectionId={collection.id}
        loadData={(id: string) => {
          loadData(id);
          handleTagTreeChange();
        }}
        treeData={treeData}
      />
      <CollectionPreviewPanel
        collectionId={collection.id}
        refreshTrigger={previewRefreshTrigger}
      />
    </BaseContentPage>
  ) : (
    <></>
  );
}
