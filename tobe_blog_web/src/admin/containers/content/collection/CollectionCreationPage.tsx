import {
  Grid,
  Paper,
  TextField
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
import { TagOption } from '../../../../global/types';
import { CollectionService } from '../../../../services';
import { URL } from '../../../URL';
import { MultipleTagSelecter, OneRow, SaveButtonPanel } from '../../../components';

export default function CollectionCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [tagValues, setTagValues] = useState<TagOption[]>([]);
  const [title, setTitle] = useState<string>();
  const [coverImgUrl, setCoverImgUrl] = useState<string>();
  const [description, setDescription] = useState<string>();
  
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
    setOpenLoading(true);
    CollectionService.create({
      title: title,
      description: description,
      coverImgUrl: coverImgUrl,
      tags: tagValues
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
      })
      .finally(() => setOpenLoading(false));
  }
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={t('collection-creation-page.page-main-title')}
    >
      <Paper
        variant="outlined"
        sx={{ mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
          <Grid
            container
            spacing={3}
          >
            <OneRow>
              <TextField
                label={t('collection-creation-page.fields.name')}
                fullWidth
                onChange={e => setTitle(e.target.value)}
              />
            </OneRow>
            <OneRow>
              <TextField
                label={t('collection-creation-page.fields.cover-img-url')}
                fullWidth
                onChange={e => setCoverImgUrl(e.target.value)}
              />
            </OneRow>
            <OneRow>
              <TextField
                label={t('collection-creation-page.fields.description')}
                fullWidth
                onChange={e => setDescription(e.target.value)}
                multiline
                maxRows={2}
                minRows={2}
              />
            </OneRow>
            <OneRow>
                <MultipleTagSelecter
                  value={tagValues}
                  setValue={setTagValues}
                />
            </OneRow>
          </Grid>
      </Paper>
      <SaveButtonPanel primaryEvent={handleSubmit}/>
    </Page>
  );
}
