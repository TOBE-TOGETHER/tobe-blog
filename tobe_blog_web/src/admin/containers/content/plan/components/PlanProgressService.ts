import { AxiosPromise } from 'axios';
import { IPlanProgressCreationDTO, IPlanProgressUpdateDTO } from '../../../../../global/types';
import server from '../../../../../services/server';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const PROGRESSES_URI = 'v1/plan-progresses';

export function createProgress(newProgress: IPlanProgressCreationDTO): AxiosPromise {
  return server.post(`/${PROGRESSES_URI}`, newProgress, options);
}

export function updateProgress(updatedProgress: IPlanProgressUpdateDTO): AxiosPromise {
  return server.put(
    `/${PROGRESSES_URI}/${updatedProgress.id}`,
    {
      id: updatedProgress.id,
      planId: updatedProgress.planId,
      description: updatedProgress.description,
    },
    options
  );
}
