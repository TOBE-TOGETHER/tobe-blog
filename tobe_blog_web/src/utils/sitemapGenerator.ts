interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface SitemapConfig {
  baseUrl: string;
  urls: SitemapUrl[];
}

export function generateSitemap(config: SitemapConfig): string {
  const { baseUrl, urls } = config;
  
  const urlElements = urls.map(url => {
    const loc = `${baseUrl}${url.loc}`;
    const lastmod = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : '';
    const changefreq = url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : '';
    const priority = url.priority !== undefined ? `<priority>${url.priority}</priority>` : '';
    
    return `  <url>
    <loc>${loc}</loc>${lastmod}${changefreq}${priority}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

export function generateStaticSitemap(baseUrl: string): string {
  const staticUrls: SitemapUrl[] = [
    {
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      loc: '/topic',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      loc: '/sign-in',
      changefreq: 'monthly',
      priority: 0.3
    },
    {
      loc: '/sign-up',
      changefreq: 'monthly',
      priority: 0.3
    }
  ];

  return generateSitemap({ baseUrl, urls: staticUrls });
}

export async function generateDynamicSitemap(
  baseUrl: string,
  apiEndpoint: string
): Promise<string> {
  try {
    // Adjust this according to your API structure
    const response = await fetch(`${apiEndpoint}/api/content/sitemap`);
    const data = await response.json();
    
    const dynamicUrls: SitemapUrl[] = data.map((item: any) => ({
      loc: `/content/${item.id}`,
      lastmod: item.updatedAt ? new Date(item.updatedAt).toISOString().split('T')[0] : undefined,
      changefreq: 'weekly' as const,
      priority: 0.7
    }));

    const staticUrls = [
      {
        loc: '/',
        changefreq: 'daily' as const,
        priority: 1.0,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/topic',
        changefreq: 'weekly' as const,
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0]
      }
    ];

    return generateSitemap({ 
      baseUrl, 
      urls: [...staticUrls, ...dynamicUrls] 
    });
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    return generateStaticSitemap(baseUrl);
  }
} 