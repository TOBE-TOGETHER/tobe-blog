import DomainService from './DomainService';

const ARTICLE_URI = 'v1/articles';
export const ArticleService: DomainService = new DomainService(ARTICLE_URI);
