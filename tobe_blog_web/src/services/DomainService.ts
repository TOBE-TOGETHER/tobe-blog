import { AxiosPromise } from 'axios';

import { server } from '.';

export default class DomainService {
  baseUri: string = '';

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  get(size: number, current: number, keyword: string, status: string): AxiosPromise {
    return server.get(`/${this.baseUri}?size=${size}&current=${current}&keyword=${keyword}&status=${status}`);
  }

  getById(id: string): AxiosPromise {
    return server.get(`/${this.baseUri}/${id}`);
  }

  releaseById(id: string | number): AxiosPromise {
    return server.put(`/${this.baseUri}/${id}/release`);
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
