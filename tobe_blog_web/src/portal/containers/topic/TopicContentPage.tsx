import { Typography } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../../../customization.json';
import { useCommonUtils } from '../../../commons';
import { SEOHead, generateWebsiteStructuredData } from '../../../components';
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

  // Generate SEO data
  const seoData = useMemo(() => {
    const topicName = t(`home-page.categories.${id}.title`);
    return {
      title: `${topicName} | ${config.title}`,
      description: `Explore ${topicName.toLowerCase()} content on ${config.title}. Discover articles, plans, vocabularies, and collections related to ${topicName.toLowerCase()}.`,
      keywords: `${topicName.toLowerCase()}, blog, learning, growth, articles, plans, vocabularies, collections`,
      image: config.image,
      url: `${config.baseUrl}/topic/${id}`,
      type: 'website' as const,
      author: config.title,
      section: topicName,
      tags: [topicName.toLowerCase()],
      structuredData: generateWebsiteStructuredData(),
    };
  }, [id, t]);

  return (
    <>
      <SEOHead {...seoData} />
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
    </>
  );
}
