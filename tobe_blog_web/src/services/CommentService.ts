import { AxiosPromise } from 'axios';
import { ICommentCreateDTO, ICommentsPageDTO, ICommentDTO } from '../global/types';
import server from './server';

const COMMENT_URI = 'v1/comments';

export function createComment(data: ICommentCreateDTO): AxiosPromise<ICommentDTO> {
  return server.post(`/${COMMENT_URI}`, data);
}

export function getComments(
  contentId: string,
  contentType: string,
  page: number = 1,
  size: number = 10
): AxiosPromise<ICommentsPageDTO> {
  return server.get(`/${COMMENT_URI}`, {
    params: {
      contentId,
      contentType,
      page,
      size,
    },
  });
}

export function deleteComment(commentId: number): AxiosPromise<void> {
  return server.delete(`/${COMMENT_URI}/${commentId}`);
}

export function toggleCommentLike(commentId: number, isLike: boolean): AxiosPromise<number> {
  return server.post(`/${COMMENT_URI}/${commentId}/like`, null, {
    params: { isLike },
  });
} 