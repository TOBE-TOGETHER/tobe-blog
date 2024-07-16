import { AxiosPromise } from 'axios';
import { ITagRelationshipCreateDTO } from '../../../../global/types';
import server from '../../../../services/server';

const TAG_RELATIONSHIP_URI = 'v1/tag-relationships';

export function createRelationship(target: ITagRelationshipCreateDTO): AxiosPromise {
  return server.post(`/${TAG_RELATIONSHIP_URI}`, target);
}

export function deleteRelationship(id: string | number): AxiosPromise {
  return server.delete(`/${TAG_RELATIONSHIP_URI}/${id}`);
}
