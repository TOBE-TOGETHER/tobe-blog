import { useMemo } from 'react';
import { generateArticleStructuredData, generatePlanStructuredData, generateVocabularyStructuredData, generateCollectionStructuredData } from '../components';
import { IBaseUserContentDTO, IPlanInfo, IVocabularyDetailDTO, ICollectionDTO, IUserFullProfileDTO } from '../global/types';
import { getPathFromContentType } from '../commons';
import config from '../../customization.json';

type ContentType = 'article' | 'plan' | 'vocabulary' | 'collection' | 'profile';

interface UseSEOProps {
  content?: IBaseUserContentDTO | IPlanInfo | IVocabularyDetailDTO | ICollectionDTO | null;
  profile?: IUserFullProfileDTO | null;
  contentType: ContentType;
  defaultDescription?: string;
  defaultKeywords?: string;
}

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
  type: 'article' | 'website' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author: string;
  section: string;
  tags: string[];
  structuredData: object;
}

const CONTENT_TYPE_CONFIG = {
  article: {
    section: 'Articles',
    defaultKeywords: 'blog, article, learning, growth',
    defaultDescription: 'Read this article on Tobe Blog',
  },
  plan: {
    section: 'Plans',
    defaultKeywords: 'blog, plan, learning, growth, goals',
    defaultDescription: 'View this plan on Tobe Blog',
  },
  vocabulary: {
    section: 'Vocabularies',
    defaultKeywords: 'blog, vocabulary, learning, language, words',
    defaultDescription: 'Explore this vocabulary collection on Tobe Blog',
  },
  collection: {
    section: 'Collections',
    defaultKeywords: 'blog, collection, learning, resources',
    defaultDescription: 'Explore this collection on Tobe Blog',
  },
  profile: {
    section: 'Profile',
    defaultKeywords: 'profile, user, blog, learning, growth',
    defaultDescription: 'View this user profile on Tobe Blog',
  },
};

function generateContentUrl(contentType: ContentType, contentId: string): string {
  if (contentType === 'profile') {
    return `${config.baseUrl}/personal-portal/${contentId}`;
  }
  
  const pathSegment = getPathFromContentType(contentType);
  return `${config.baseUrl}/news/${pathSegment}/${contentId}`;
}

function generateStructuredDataByType(
  content: any,
  contentType: ContentType,
  baseData: {
    title: string;
    description: string;
    author: string;
    publishedTime?: string;
    modifiedTime?: string;
    image: string;
    url: string;
  }
) {
  switch (contentType) {
    case 'article':
      return generateArticleStructuredData(baseData as any);

    case 'plan':
      return generatePlanStructuredData({
        ...baseData,
        startDate: content.targetStartTime,
        endDate: content.targetEndTime,
      } as any);

    case 'vocabulary':
      return generateVocabularyStructuredData({
        ...baseData,
        language: content.language,
      } as any);

    case 'collection':
      return generateCollectionStructuredData(baseData as any);

    case 'profile':
      return generateProfileStructuredData(baseData);

    default:
      return generateArticleStructuredData(baseData as any);
  }
}

function generateProfileStructuredData({ title, description, author, image, url }: { title: string; description: string; author: string; image: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'name': title,
    'description': description,
    'image': image,
    'url': url,
    'mainEntity': {
      '@type': 'Person',
      'name': author,
      'image': image,
      'description': description,
      'url': url,
    },
    'publisher': {
      '@type': 'Organization',
      'name': config.title,
      'logo': {
        '@type': 'ImageObject',
        'url': config.image,
      },
    },
  };
}

export function useSEO({ content, profile, contentType, defaultDescription, defaultKeywords }: UseSEOProps): SEOData | null {
  return useMemo(() => {
    // Handle profile pages
    if (contentType === 'profile' && profile) {
      const typeConfig = CONTENT_TYPE_CONFIG[contentType];
      const fullName = `${profile.firstName} ${profile.lastName}`.trim();
      const description = profile.introduction || profile.blog || defaultDescription || typeConfig.defaultDescription;
      
      const keywords = [fullName, profile.profession, 'profile', 'user', 'blog', 'learning'].filter(Boolean).join(', ') || defaultKeywords || typeConfig.defaultKeywords;

      const url = generateContentUrl(contentType, profile.id);

      const baseStructuredData = {
        title: `${fullName} | ${config.title}`,
        description: description,
        author: fullName,
        image: profile.avatarUrl || profile.photoImg || config.image,
        url: url,
      };

      return {
        title: `${fullName} | ${config.title}`,
        description,
        keywords,
        image: profile.avatarUrl || profile.photoImg || config.image,
        url: url,
        type: 'profile' as const,
        author: fullName,
        section: typeConfig.section,
        tags: [],
        structuredData: generateStructuredDataByType(profile, contentType, baseStructuredData),
      };
    }

    // Handle content pages
    if (!content) return null;

    const typeConfig = CONTENT_TYPE_CONFIG[contentType];
    const description = content.description || (contentType === 'article' ? (content as any).subTitle : '') || defaultDescription || typeConfig.defaultDescription;

    const keywords = content.tags?.map(tag => tag.label).join(', ') || defaultKeywords || typeConfig.defaultKeywords;

    const url = generateContentUrl(contentType, content.id);

    const baseStructuredData = {
      title: content.title,
      description: description,
      author: content.ownerName || 'Tobe Blog',
      publishedTime: content.createTime,
      modifiedTime: content.updateTime,
      image: content.coverImgUrl || config.image,
      url: url,
    };

    return {
      title: `${content.title} | ${config.title}`,
      description,
      keywords,
      image: content.coverImgUrl || config.image,
      url: url,
      type: 'article' as const,
      publishedTime: content.createTime,
      modifiedTime: content.updateTime,
      author: content.ownerName || 'Tobe Blog',
      section: typeConfig.section,
      tags: content.tags?.map(tag => tag.label) || [],
      structuredData: generateStructuredDataByType(content, contentType, baseStructuredData),
    };
  }, [content, profile, contentType, defaultDescription, defaultKeywords]);
}
