import DomainService from './DomainService';

const BASE_URI = 'v1/vocabularies';
export const VocabularyService: DomainService = new DomainService(BASE_URI);
