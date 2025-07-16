import axios, { AxiosInstance } from 'axios';
import {
  ApiConfig,
  ArticleDTO,
  ArticleCreationDTO,
  ArticleUpdateDTO,
  PlanDTO,
  PlanCreationDTO,
  PlanUpdateDTO,
  PlanProgressDTO,
  PlanProgressCreationDTO,
  PlanProgressUpdateDTO,
  VOCDTO,
  VOCCreationDTO,
  VOCUpdateDTO,
  WordDTO,
  WordCreationDTO,
  WordUpdateDTO,
  BaseContentDTO,
  ContentBasicInfoDTO,
  ContentVisibilityUpdateDTO,
  PageResponse,
  Topic
} from './types.js';

export class TobeBlogApiClient {
  private client: AxiosInstance;

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    });
  }

  // Articles API
  async createArticle(data: ArticleCreationDTO): Promise<ArticleDTO> {
    const response = await this.client.post('/v1/articles', data);
    return response.data;
  }

  async updateArticle(id: string, data: ArticleUpdateDTO): Promise<ArticleDTO> {
    const response = await this.client.put(`/v1/articles/${id}`, data);
    return response.data;
  }

  async deleteArticle(id: string): Promise<void> {
    await this.client.delete(`/v1/articles/${id}`);
  }

  async getArticleById(id: string): Promise<ArticleDTO> {
    const response = await this.client.get(`/v1/articles/${id}`);
    return response.data;
  }

  async searchArticles(params: {
    current?: number;
    size?: number;
    status?: string;
    createFrom?: string;
    createTo?: string;
    updateFrom?: string;
    updateTo?: string;
    tags?: string;
    keyword?: string;
    topic?: Topic;
  }): Promise<PageResponse<ArticleDTO>> {
    const response = await this.client.get('/v1/articles', { params });
    return response.data;
  }

  async updateArticleVisibility(id: string, data: ContentVisibilityUpdateDTO): Promise<ArticleDTO> {
    const response = await this.client.put(`/v1/articles/${id}/visibility`, data);
    return response.data;
  }

  // Plans API
  async createPlan(data: PlanCreationDTO): Promise<PlanDTO> {
    const response = await this.client.post('/v1/plans', data);
    return response.data;
  }

  async updatePlan(id: string, data: PlanUpdateDTO): Promise<PlanDTO> {
    const response = await this.client.put(`/v1/plans/${id}`, data);
    return response.data;
  }

  async deletePlan(id: string): Promise<void> {
    await this.client.delete(`/v1/plans/${id}`);
  }

  async getPlanById(id: string): Promise<PlanDTO> {
    const response = await this.client.get(`/v1/plans/${id}`);
    return response.data;
  }

  async searchPlans(params: {
    current?: number;
    size?: number;
    status?: string;
    createFrom?: string;
    createTo?: string;
    updateFrom?: string;
    updateTo?: string;
    tags?: string;
    keyword?: string;
    topic?: Topic;
  }): Promise<PageResponse<PlanDTO>> {
    const response = await this.client.get('/v1/plans', { params });
    return response.data;
  }

  async updatePlanVisibility(id: string, data: ContentVisibilityUpdateDTO): Promise<PlanDTO> {
    const response = await this.client.put(`/v1/plans/${id}/visibility`, data);
    return response.data;
  }

  async getPlanProgresses(id: string, params?: { current?: number; size?: number }): Promise<PageResponse<PlanProgressDTO>> {
    const response = await this.client.get(`/v1/plans/${id}/progresses`, { params });
    return response.data;
  }

  // Plan Progress API
  async createPlanProgress(data: PlanProgressCreationDTO): Promise<PlanProgressDTO> {
    const response = await this.client.post('/v1/plan-progresses', data);
    return response.data;
  }

  async updatePlanProgress(data: PlanProgressUpdateDTO): Promise<PlanProgressDTO> {
    const response = await this.client.put(`/v1/plan-progresses/${data.id}`, data);
    return response.data;
  }

  async deletePlanProgress(id: number): Promise<void> {
    await this.client.delete(`/v1/plan-progresses/${id}`);
  }

  async getPlanProgressById(id: string): Promise<PlanProgressDTO> {
    const response = await this.client.get(`/v1/plan-progresses/${id}`);
    return response.data;
  }

  async getPlanProgressesByPlanId(planId: string, params?: { current?: number; size?: number }): Promise<PageResponse<PlanProgressDTO>> {
    const response = await this.client.get('/v1/plan-progresses', { 
      params: { planId, ...params } 
    });
    return response.data;
  }

  // Vocabularies API
  async createVocabulary(data: VOCCreationDTO): Promise<VOCDTO> {
    const response = await this.client.post('/v1/vocabularies', data);
    return response.data;
  }

  async updateVocabulary(id: string, data: VOCUpdateDTO): Promise<VOCDTO> {
    const response = await this.client.put(`/v1/vocabularies/${id}`, data);
    return response.data;
  }

  async deleteVocabulary(id: string): Promise<void> {
    await this.client.delete(`/v1/vocabularies/${id}`);
  }

  async getVocabularyById(id: string): Promise<VOCDTO> {
    const response = await this.client.get(`/v1/vocabularies/${id}`);
    return response.data;
  }

  async searchVocabularies(params: {
    current?: number;
    size?: number;
    status?: string;
    createFrom?: string;
    createTo?: string;
    updateFrom?: string;
    updateTo?: string;
    tags?: string;
    keyword?: string;
    topic?: Topic;
  }): Promise<PageResponse<VOCDTO>> {
    const response = await this.client.get('/v1/vocabularies', { params });
    return response.data;
  }

  async updateVocabularyVisibility(id: string, data: ContentVisibilityUpdateDTO): Promise<VOCDTO> {
    const response = await this.client.put(`/v1/vocabularies/${id}/visibility`, data);
    return response.data;
  }

  async getWordsByVocabularyId(vocabularyId: string): Promise<WordDTO[]> {
    const response = await this.client.get(`/v1/vocabularies/${vocabularyId}/words`);
    return response.data;
  }

  // Words API
  async createWord(data: WordCreationDTO): Promise<WordDTO> {
    const response = await this.client.post('/v1/words', data);
    return response.data;
  }

  async updateWord(id: number, data: WordUpdateDTO): Promise<WordDTO> {
    const response = await this.client.put(`/v1/words/${id}`, data);
    return response.data;
  }

  async deleteWord(id: number): Promise<void> {
    await this.client.delete(`/v1/words/${id}`);
  }

  async getWordById(id: number): Promise<WordDTO> {
    const response = await this.client.get(`/v1/words/${id}`);
    return response.data;
  }

  async getWordsByVocabularyIdFromWords(vocabularyId: string): Promise<WordDTO[]> {
    const response = await this.client.get('/v1/words', { 
      params: { vocabularyId } 
    });
    return response.data;
  }

  // Content Admin API
  async searchPublishedContents(params: {
    current?: number;
    size?: number;
    keyword?: string;
    status?: string;
    topic?: string;
  }): Promise<PageResponse<BaseContentDTO>> {
    const response = await this.client.get('/v1/contents', { params });
    return response.data;
  }

  // Content Basic Info API
  async getContentBasicInfo(id: string): Promise<ContentBasicInfoDTO> {
    const response = await this.client.get(`/v1/content/${id}/basic-info`);
    return response.data;
  }
} 