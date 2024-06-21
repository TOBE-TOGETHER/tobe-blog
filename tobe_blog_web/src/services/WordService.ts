import { AxiosPromise } from 'axios';

import { server } from '.';
import { WordCreateDTO, WordUpdateDTO } from '../global/types';

const WORD_URI = 'v1/words';

export function createWord(target: WordCreateDTO): AxiosPromise {
  return server.post(`/${WORD_URI}`, target);
}

export function updateWord(target: WordUpdateDTO): AxiosPromise {
  return server.put(`/${WORD_URI}/${target.id}`, target);
}

export function deleteWordById(id: number): AxiosPromise {
  return server.delete(`/${WORD_URI}/${id}`);
}
