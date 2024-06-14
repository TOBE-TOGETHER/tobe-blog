import { AxiosPromise } from 'axios';

import { server } from '.';
import { EDomain } from '../global/enums.ts';

const API_DATA_URI = 'v1/api';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export function getNewsByTags(domain: EDomain, size: number, current: number, tags: string[], ownerId: string): AxiosPromise {
  return server.get(`/${API_DATA_URI}/news?size=${size}&current=${current}&tags=${tags}&domain=${domain}&ownerId=${ownerId}`, options);
}

export function getSubjects(size: number, current: number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/subjects?size=${size}&current=${current}`);
}

export function getSubjectById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/subjects/${id}`);
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
  return server.get(`/${API_DATA_URI}/detail-profile/${userId}`);
}

export function getTagStatistics(domain: EDomain, ownerId: string) {
  return server.get(`/${API_DATA_URI}/tag-statistics?domain=${domain}&ownerId=${ownerId}`);
}

export function getTop5ActiveUsers() {
  return server.get(`/${API_DATA_URI}/top5-active-users`);
}

export function getBySrcIdAndFileType(srcId: string, fileType: string) {
  return server.get(`/${API_DATA_URI}/files?srcId=${srcId}&fileType=${fileType}`);
}
