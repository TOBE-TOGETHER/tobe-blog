import { AxiosPromise } from 'axios';
import server from '../../../services/server';

export default class BaseContentService {
  baseUri: string = '';

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  get(size: number, current: number, keyword: string, status: string, tags: string[]): AxiosPromise {
    return server.get(`/${this.baseUri}?size=${size}&current=${current}&keyword=${keyword}&status=${status}&tags=${tags}`);
  }

  getById(id: string): AxiosPromise {
    return server.get(`/${this.baseUri}/${id}`);
  }

  updateVisibility(id: string | number, visibility: 'PUBLIC' | 'PRIVATE'): AxiosPromise {
    return server.put(`/${this.baseUri}/${id}/visibility`, { visibility: visibility, id: id });
  }

  deleteById(id: string | number): AxiosPromise {
    return server.delete(`/${this.baseUri}/${id}`);
  }

  create(creationDTO: any): AxiosPromise {
    return server.post(`/${this.baseUri}`, creationDTO);
  }

  update(updatedDTO: any): AxiosPromise {
    return server.put(`/${this.baseUri}/${updatedDTO.id}`, updatedDTO);
  }
}
