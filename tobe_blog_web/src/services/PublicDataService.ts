import { AxiosPromise } from 'axios';
import { EContentType } from '../global/enums.ts';
import { TopicPropsType } from '../global/types.ts';
import server from './server.ts';

const API_DATA_URI = 'v1/api';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export function getNewsByTags(
  contentTypes: EContentType[] | EContentType | string,
  size: number,
  current: number,
  tags: number[],
  ownerId: string,
  topic: TopicPropsType,
  keyword: string
): AxiosPromise {
  // Handle both single contentType and array of contentTypes
  const contentTypeParam = Array.isArray(contentTypes) 
    ? contentTypes.join(',') 
    : contentTypes;
    
  return server.get(
    `/${API_DATA_URI}/contents?size=${size}&current=${current}&tags=${tags}&contentTypes=${contentTypeParam}&ownerId=${ownerId}&topic=${topic ?? ''}&keyword=${keyword}`,
    options
  );
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

export function getContentBasicInfo(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/content-basic-info/${id}`);
}

export function getProgressesByPlanId(planId: string, size: number, current: number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/plans/${planId}/progresses?size=${size}&current=${current}`);
}

export function getWordsByVOCId(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/vocabularies/${id}/words`);
}

export function getBriefProfileByUserId(userId: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/brief-profile/${userId}`);
}

export function getFullProfileByUserId(userId: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/full-profile/${userId}`);
}

export function getTagStatistics(contentTypes: EContentType[], ownerId: string, topic: TopicPropsType, keyword: string): AxiosPromise {
  return server.get(`/${API_DATA_URI}/tag-statistics?contentTypes=${contentTypes}&ownerId=${ownerId}&topic=${topic ?? ''}&keyword=${keyword}`);
}

export function likeContent(contentId: string): AxiosPromise {
  return server.post(`/${API_DATA_URI}/like-content/${contentId}`);
}

export function requestPasswordReset(email: string): AxiosPromise {
  return server.post(`/${API_DATA_URI}/request-password-reset?email=${encodeURIComponent(email)}`);
}

export function resetPassword(email: string, token: string, newPassword: string): AxiosPromise {
  return server.post(`/${API_DATA_URI}/reset-password`, null, {
    params: {
      email: email,
      token: token,
      newPassword: newPassword
    }
  });
}