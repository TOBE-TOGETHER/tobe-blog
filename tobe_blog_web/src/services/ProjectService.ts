import DomainService from './DomainService';

const PROJECT_URI = 'v1/projects';
export const ProjectService: DomainService = new DomainService(PROJECT_URI);
