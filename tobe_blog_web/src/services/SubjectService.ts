import { AxiosPromise } from 'axios';

import { server } from '.';
import { SubjectInfoCreationDTO, SubjectInfoUpdateDTO, TagRelationshipCreateDTO } from '../global/types';

const SUBJECT_URI = 'v1/subjects';
const TAG_RELATIONSHIP_URI = 'v1/tag-relationship';

export function get(size: number, current: number): AxiosPromise {
  return server.get(`/${SUBJECT_URI}?size=${size}&current=${current + 1}`);
}

export function getById(id: string): AxiosPromise {
  return server.get(`/${SUBJECT_URI}/${id}`);
}

export function releaseById(id: string | number): AxiosPromise {
  return server.put(`/${SUBJECT_URI}/${id}/release`);
}

export function deleteById(id: string | number): AxiosPromise {
  return server.delete(`/${SUBJECT_URI}/${id}`);
}

export function create(target: SubjectInfoCreationDTO): AxiosPromise {
  return server.post(`/${SUBJECT_URI}`, target);
}

export function update(target: SubjectInfoUpdateDTO): AxiosPromise {
  return server.put(`/${SUBJECT_URI}/${target.id}`, target);
}

export function createRelationship(target: TagRelationshipCreateDTO): AxiosPromise {
  return server.post(`/${TAG_RELATIONSHIP_URI}`, target);
}

export function deleteRelationship(id: string | number): AxiosPromise {
  return server.delete(`/${TAG_RELATIONSHIP_URI}/${id}`);
}
