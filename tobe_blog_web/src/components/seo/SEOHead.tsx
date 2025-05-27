import { useEffect } from 'react';
import config from '../../../customization.json';

interface SEOHeadProps {
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: string;
  readonly image?: string;
  readonly url?: string;
  readonly type?: 'website' | 'article' | 'profile';
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
  readonly author?: string;
  readonly section?: string;
  readonly tags?: string[];
  readonly structuredData?: object;
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  structuredData
}: SEOHeadProps) {
  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, 'og:description');
    }

    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    if (author) {
      updateMetaTag('author', author);
    }

    // Open Graph tags
    if (title) {
      updateMetaTag('og:title', title, 'og:title');
    }

    if (image) {
      updateMetaTag('og:image', image, 'og:image');
      updateMetaTag('twitter:image', image, 'twitter:image');
    }

    if (url) {
      updateMetaTag('og:url', url, 'og:url');
      updateMetaTag('twitter:url', url, 'twitter:url');
    }

    updateMetaTag('og:type', type, 'og:type');
    updateMetaTag('og:site_name', config.title, 'og:site_name');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'twitter:card');
    if (title) {
      updateMetaTag('twitter:title', title, 'twitter:title');
    }
    if (description) {
      updateMetaTag('twitter:description', description, 'twitter:description');
    }

    // Article-specific meta tags
    if (type === 'article') {
      if (author) {
        updateMetaTag('article:author', author, 'article:author');
      }
      if (section) {
        updateMetaTag('article:section', section, 'article:section');
      }
      
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, 'article:published_time');
      }
      
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, 'article:modified_time');
      }
      
      // Article tags
      if (tags) {
        tags.forEach((tag, index) => {
          updateMetaTag(`article:tag:${index}`, tag, 'article:tag');
        });
      }
    }

    // Add structured data
    let structuredDataElement = document.querySelector('#structured-data') as HTMLScriptElement;
    if (!structuredDataElement) {
      structuredDataElement = document.createElement('script');
      structuredDataElement.id = 'structured-data';
      structuredDataElement.type = 'application/ld+json';
      document.head.appendChild(structuredDataElement);
    }
    structuredDataElement.textContent = JSON.stringify(structuredData);

    // Cleanup function - remove dynamically added tags
    return () => {
      const dynamicTags = document.querySelectorAll('meta[data-dynamic="true"]');
      dynamicTags.forEach(tag => tag.remove());
    };
  }, [title, description, keywords, image, url, type, publishedTime, modifiedTime, author, section, tags, structuredData]);

  return null;
}

// Helper function to generate article structured data
export function generateArticleStructuredData({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
}: {
  title: string;
  description: string;
  author: string;
  publishedTime?: string;
  modifiedTime?: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: config.title,
      logo: {
        '@type': 'ImageObject',
        url: config.image,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    url: url,
  };
}

// Helper function to generate plan structured data
export function generatePlanStructuredData({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
  startDate,
  endDate,
}: {
  title: string;
  description: string;
  author: string;
  publishedTime?: string;
  modifiedTime?: string;
  image: string;
  url: string;
  startDate?: string;
  endDate?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    additionalType: 'Plan',
    name: title,
    description: description,
    image: image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: config.title,
      logo: {
        '@type': 'ImageObject',
        url: config.image,
      },
    },
    dateCreated: publishedTime,
    dateModified: modifiedTime,
    url: url,
    startDate: startDate,
    endDate: endDate,
  };
}

// Helper function to generate vocabulary structured data
export function generateVocabularyStructuredData({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
  language,
}: {
  title: string;
  description: string;
  author: string;
  publishedTime?: string;
  modifiedTime?: string;
  image: string;
  url: string;
  language?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    additionalType: 'Vocabulary',
    name: title,
    description: description,
    image: image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: config.title,
      logo: {
        '@type': 'ImageObject',
        url: config.image,
      },
    },
    dateCreated: publishedTime,
    dateModified: modifiedTime,
    url: url,
    inLanguage: language,
  };
}

// Helper function to generate collection structured data
export function generateCollectionStructuredData({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
}: {
  title: string;
  description: string;
  author: string;
  publishedTime?: string;
  modifiedTime?: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Collection',
    name: title,
    description: description,
    image: image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: config.title,
      logo: {
        '@type': 'ImageObject',
        url: config.image,
      },
    },
    dateCreated: publishedTime,
    dateModified: modifiedTime,
    url: url,
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.title,
    "description": config.description,
    "url": config.baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${config.baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
} 