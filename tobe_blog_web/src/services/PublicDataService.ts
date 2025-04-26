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
  contentType: EContentType | string,
  size: number,
  current: number,
  tags: number[],
  ownerId: string,
  topic: TopicPropsType,
  keyword: string
): AxiosPromise {
  return server.get(
    `/${API_DATA_URI}/contents?size=${size}&current=${current}&tags=${tags}&contentType=${contentType}&ownerId=${ownerId}&topic=${topic ?? ''}&keyword=${keyword}`,
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

export function getTagStatistics(contentType: EContentType, ownerId: string, topic: TopicPropsType, keyword: string): AxiosPromise {
  return server.get(`/${API_DATA_URI}/tag-statistics?contentType=${contentType}&ownerId=${ownerId}&topic=${topic ?? ''}&keyword=${keyword}`);
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

export function searchContents(
  current: number,
  size: number,
  tags?: string,
  ownerId?: number,
  contentType?: string,
  topic?: string,
  keyword?: string,
): AxiosPromise {
  return server.get(
    `/${API_DATA_URI}/contents?current=${current}&size=${size}${tags ? '&tags=' + tags : ''}${
      ownerId ? '&ownerId=' + ownerId : ''
    }${contentType ? '&contentType=' + contentType : ''}${topic ? '&topic=' + topic : ''}${
      keyword ? '&keyword=' + keyword : ''
    }`,
  );
}

export function getCollectionById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/collections/${id}`);
}

export function getUserFullProfile(id: number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/full-profile/${id}`);
}

export function getUserBriefProfile(id: number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/brief-profile/${id}`);
}
