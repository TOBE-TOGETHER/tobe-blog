import { AxiosPromise } from 'axios';
import { EContentType, ETopic } from '../global/enums.ts';
import { TopicPropsType } from '../global/types.ts';
import server from './server.ts';

const API_DATA_URI = 'v1/api';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export function getNewsByTags(contentType: EContentType | string, size: number, current: number, tags: number[], ownerId: string, topic: TopicPropsType): AxiosPromise {
  return server.get(`/${API_DATA_URI}/contents?size=${size}&current=${current}&tags=${tags}&contentType=${contentType}&ownerId=${ownerId}&topic=${topic || ''}`, options);
}

export function getSubjects(size: number, current: number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/collections?size=${size}&current=${current}`);
}

export function getSubjectById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/collections/${id}`);
}

export function getArticleById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/articles/${id}`);
}

export function getPlanById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/plans/${id}`);
}

export function getVocabularyById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/vocabularies/${id}`);
}

export function getProgressesByPlanId(planId: string, size: number, current: number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/plans/${planId}/progresses?size=${size}&current=${current}`);
}

export function getWordsByVocabularyId(id: string): AxiosPromise {
  return server.get(`/${API_DATA_URI}/vocabularies/${id}/words`);
}

export function getBriefProfileByUserId(userId: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/brief-profile/${userId}`);
}

export function getFullProfileByUserId(userId: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/full-profile/${userId}`);
}

export function getTagStatistics(contentType: EContentType, ownerId: string, topic: string | ETopic | null | undefined): AxiosPromise {
  return server.get(`/${API_DATA_URI}/tag-statistics?contentType=${contentType}&ownerId=${ownerId}&topic=${topic || ''}`);
}

export function getTop5ActiveUsers() {
  return server.get(`/${API_DATA_URI}/top5-active-users`);
}

export function getBySrcIdAndFileType(srcId: string, fileType: string) {
  return server.get(`/${API_DATA_URI}/files?srcId=${srcId}&fileType=${fileType}`);
}

export function likeContent(contentId: string) {
  return server.post(`/${API_DATA_URI}/like-content/${contentId}`);
}
