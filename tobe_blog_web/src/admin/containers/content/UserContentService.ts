import BaseContentService from './BaseContentService';
import { AxiosPromise } from 'axios';
import server from '../../../services/server';

export const ArticleService: BaseContentService = new BaseContentService('v1/articles');

class ExtendedCollectionService extends BaseContentService {
  constructor(baseUri: string) {
    super(baseUri);
  }

  getByIdWithRelatedContents(id: string): AxiosPromise {
    return server.get(`/${this.baseUri}/${id}/preview`);
  }
}

export const CollectionService: ExtendedCollectionService = new ExtendedCollectionService('v1/collections');
export const PlanService: BaseContentService = new BaseContentService('v1/plans');
export const VocabularyService: BaseContentService = new BaseContentService('v1/vocabularies');
