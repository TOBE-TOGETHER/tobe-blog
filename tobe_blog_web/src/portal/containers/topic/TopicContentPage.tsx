import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../../../customization.json';
import { useCommonUtils } from '../../../commons';
import { EContentType } from '../../../global/enums';
import { PortalLayout } from '../../components';
import FunctionSection from '../../components/FunctionSection';
import { SearchBox } from './SearchBox';

export default function TopicContentPage() {
  const { id } = useParams();
  const [keyword, setKeyword] = useState<string>('');
  const { t } = useCommonUtils();
  useEffect(() => {
    window.document.title = `${config.title} - ${t(`home-page.categories.${id}.title`)}`;
    return () => {
      window.document.title = window.document.title = `${config.title}`;
    };
  }, [id]);

  return (
    <PortalLayout
      headerStyles={{ backgroundColor: 'transparent' }}
      bodyStyles={{ background: 'linear-gradient(135deg, #E6F0FA, #F0FFF0)' }}
    >
      <Typography
        variant="h5"
        sx={{ mt: '60px' }}
      >
        {t(`home-page.categories.${id}.title`)}
      </Typography>
      <SearchBox setKeyword={setKeyword} />
      <FunctionSection
        sx={{ mt: 2 }}
        extraPanels={[]}
        ownerId={''}
        topic={id}
        keyword={keyword}
        availableContentTypes={[EContentType.Article, EContentType.Plan, EContentType.Vocabulary, EContentType.Collection]}
      />
    </PortalLayout>
  );
}
