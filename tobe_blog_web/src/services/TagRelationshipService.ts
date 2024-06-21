import { AxiosPromise } from 'axios';

import { server } from '.';
import { TagRelationshipCreateDTO } from '../global/types';

const TAG_RELATIONSHIP_URI = 'v1/tag-relationships';

export function createRelationship(target: TagRelationshipCreateDTO): AxiosPromise {
  return server.post(`/${TAG_RELATIONSHIP_URI}`, target);
}

export function deleteRelationship(id: string | number): AxiosPromise {
  return server.delete(`/${TAG_RELATIONSHIP_URI}/${id}`);
}