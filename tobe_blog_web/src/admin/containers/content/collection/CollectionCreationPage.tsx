import { useCommonUtils } from '../../../../commons';
import { Page } from '../../../../components/layout';
import { URL } from '../../../../routes';
import { SaveButtonPanel } from '../../../components';
import { useCommonContentState } from '../commons';
import { CollectionService } from '../UserContentService';
import ContentEditMainSection from './components/CollectionEditMainSection';

export default function CollectionCreationPage() {
  const { t, enqueueSnackbar, navigate } = useCommonUtils();
  const { loading, setLoading, title, setTitle, description, setDescription, coverImgUrl, setCoverImgUrl, tagValues, setTagValues, topic, setTopic } = useCommonContentState();

  const handleSubmit = () => {
    if (!title) {
      enqueueSnackbar(t('collection-creation-page.msg.warning.name-empty'), {
        variant: 'warning',
      });
      return;
    }
    handleCreation();
  };

  function handleCreation(): void {
    setLoading(true);
    CollectionService.create({
      title: title,
      description: description,
      coverImgUrl: coverImgUrl,
      tags: tagValues,
      topic: topic,
    })
      .then(() => {
        enqueueSnackbar(t('msg.success'), {
          variant: 'success',
        });
        navigate(URL.COLLECTIONS);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Page
      openLoading={loading}
      pageTitle={t('collection-creation-page.page-main-title')}
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
        editable={true}
        sx={{ mt: 6 }}
        topic={topic}
        setTopic={setTopic}
      />
      <SaveButtonPanel primaryEvent={handleSubmit} />
    </Page>
  );
}
