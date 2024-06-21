import { AxiosPromise } from 'axios';

import { server } from '.';
import { PlanProgressCreationDTO, PlanProgressUpdateDTO } from '../global/types';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const PROGRESSES_URI = 'v1/plan-progresses';

export function createProgress(newProgress: PlanProgressCreationDTO): AxiosPromise {
  return server.post(`/${PROGRESSES_URI}`, newProgress, options);
}

export function updateProgress(updatedProgress: PlanProgressUpdateDTO): AxiosPromise {
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
