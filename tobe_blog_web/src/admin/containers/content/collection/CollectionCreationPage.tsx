import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { ITagOption } from '../../../../global/types';
import { CollectionService } from '../../../../services';
import { URL } from '../../../URL';
import { SaveButtonPanel } from '../../../components';
import ContentEditMainSection from './components/CollectionEditMainSection';

export default function CollectionCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [title, setTitle] = useState<string | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

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
    CollectionService.create({
      title: title,
      description: description,
      coverImgUrl: coverImgUrl,
      tags: tagValues,
    })
      .then(() => {
        enqueueSnackbar(t('collection-creation-page.msg.success'), {
          variant: 'success',
        });
        navigate(URL.COLLECTIONS);
      })
      .catch(() => {
        enqueueSnackbar(t('collection-creation-page.msg.error'), {
          variant: 'error',
        });
      });
  }

  return (
    <Page
      openLoading={false}
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
      />
      <SaveButtonPanel primaryEvent={handleSubmit} />
    </Page>
  );
}
