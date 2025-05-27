import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read configuration file
const configPath = path.join(__dirname, '../customization.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Generate base URL for sitemap
const baseUrl = config.baseUrl;

// Static page configuration
const staticUrls = [
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
  },
  {
    loc: '/personal-portal',
    changefreq: 'weekly',
    priority: 0.6
  }
];

// Example dynamic content URLs (actual usage should fetch from API)
const exampleDynamicUrls = [
  // Article example - using actual path /news/articles/:id
  {
    loc: '/news/articles/article-example-1',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  // Plan example - using actual path /news/plans/:id
  {
    loc: '/news/plans/plan-example-1',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  // Vocabulary example - using actual path /news/vocabularies/:id
  {
    loc: '/news/vocabularies/vocabulary-example-1',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  // Collection example - using actual path /news/collections/:id
  {
    loc: '/news/collections/collection-example-1',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  // Personal data example
  {
    loc: '/personal-portal/user-example-1',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/personal-portal/user-example-2',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Function to get dynamic content (future implementation)
async function fetchDynamicContent() {
  try {
    // This should call your API to get all public content
    // const response = await fetch(`${apiEndpoint}/api/sitemap/content`);
    // const data = await response.json();
    
    // Currently returning example data
    console.log('📝 Note: Using example dynamic URLs. Implement API call for production.');
    return exampleDynamicUrls;
  } catch (error) {
    console.warn('⚠️ Failed to fetch dynamic content for sitemap:', error);
    return exampleDynamicUrls;
  }
}

function generateSitemap(urls) {
  const urlElements = urls.map(url => {
    const loc = `${baseUrl}${url.loc}`;
    const lastmod = url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : '';
    const changefreq = url.changefreq ? `\n    <changefreq>${url.changefreq}</changefreq>` : '';
    const priority = url.priority !== undefined ? `\n    <priority>${url.priority}</priority>` : '';
    
    return `  <url>
    <loc>${loc}</loc>${lastmod}${changefreq}${priority}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /
Allow: /topic
Allow: /news/
Allow: /personal-portal

# Content types (actual paths)
# Articles: ${baseUrl}/news/articles/*
# Plans: ${baseUrl}/news/plans/*
# Vocabularies: ${baseUrl}/news/vocabularies/*
# Collections: ${baseUrl}/news/collections/*
# User Profiles: ${baseUrl}/personal-portal/*

# Redirect path (for crawlers that might find these)
Allow: /content/`;
}

// Main function
async function main() {
  try {
    console.log('🚀 Generating sitemap and robots.txt...');
    
    // Get dynamic content
    const dynamicUrls = await fetchDynamicContent();
    
    // Merge static and dynamic URLs
    const allUrls = [...staticUrls, ...dynamicUrls];
    
    // Generate sitemap
    const sitemapContent = generateSitemap(allUrls);
    const distPath = path.join(__dirname, '../dist');
    
    // Ensure dist directory exists
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
    }
    
    // Write sitemap.xml
    fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapContent);
    console.log('✅ sitemap.xml generated successfully');
    
    // Write robots.txt
    const robotsContent = generateRobotsTxt();
    fs.writeFileSync(path.join(distPath, 'robots.txt'), robotsContent);
    console.log('✅ robots.txt generated successfully');
    
    console.log(`📍 Base URL: ${baseUrl}`);
    console.log(`📄 Generated ${allUrls.length} URLs in sitemap`);
    console.log(`   - Static pages: ${staticUrls.length}`);
    console.log(`   - Dynamic content: ${dynamicUrls.length}`);
    
    // Group by content type for display
    const contentTypes = {
      articles: dynamicUrls.filter(url => url.loc.includes('/news/articles/')).length,
      plans: dynamicUrls.filter(url => url.loc.includes('/news/plans/')).length,
      vocabularies: dynamicUrls.filter(url => url.loc.includes('/news/vocabularies/')).length,
      collections: dynamicUrls.filter(url => url.loc.includes('/news/collections/')).length,
      profiles: dynamicUrls.filter(url => url.loc.includes('personal-portal')).length
    };
    
    console.log('📊 Content breakdown:');
    console.log(`   - Articles: ${contentTypes.articles}`);
    console.log(`   - Plans: ${contentTypes.plans}`);
    console.log(`   - Vocabularies: ${contentTypes.vocabularies}`);
    console.log(`   - Collections: ${contentTypes.collections}`);
    console.log(`   - User Profiles: ${contentTypes.profiles}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main(); 