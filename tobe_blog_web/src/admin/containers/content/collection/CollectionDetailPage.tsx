import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ICollectionDTO, ICollectionUpdateDTO, IRenderTree, ITagRelationship } from '../../../../global/types';
import { useCommonContentState } from '../commons';
import BaseContentPage from '../components/ContentPage';
import { CollectionService } from '../UserContentService';
import CollectionContentPanel from './components/CollectionContentPanel';
import ContentEditMainSection from './components/CollectionEditMainSection';

export default function CollectionDetailPage() {
  const ROOT = 'root';
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [collection, setCollection] = useState<ICollectionDTO | null>(null);
  const [treeData, setTreeData] = useState<IRenderTree>({
    id: ROOT,
    name: 'ROOT',
    children: [],
  });
  const { loading, setLoading, editable, setEditable, title, setTitle, description, setDescription, coverImgUrl, setCoverImgUrl, tagValues, setTagValues } =
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
          treeData.children = convert(response.data.tagTree);
          setTreeData(treeData);
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

  useEffect(() => loadData(id || ''), [loadData, id]);

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
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }

  return collection ? (
    <BaseContentPage
      loading={loading}
      title={title}
      editable={editable}
      handleEditableChange={handleEditableChange}
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
      />
      <CollectionContentPanel
        collectionId={collection.id}
        loadData={loadData}
        treeData={treeData}
      />
    </BaseContentPage>
  ) : (
    <></>
  );
}
