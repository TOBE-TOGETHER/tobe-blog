import { AxiosPromise } from 'axios';
import { IWordCreateDTO, IWordUpdateDTO } from '../../../global/types';
import server from '../../../services/server';

const WORD_URI = 'v1/words';

export function createWord(target: IWordCreateDTO): AxiosPromise {
  return server.post(`/${WORD_URI}`, target);
}

export function updateWord(target: IWordUpdateDTO): AxiosPromise {
  return server.put(`/${WORD_URI}/${target.id}`, target);
}

export function deleteWordById(id: number): AxiosPromise {
  return server.delete(`/${WORD_URI}/${id}`);
}
