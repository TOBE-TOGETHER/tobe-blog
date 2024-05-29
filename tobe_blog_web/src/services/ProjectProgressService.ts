import { AxiosPromise } from 'axios';

import { server } from '.';
import { ProjectProgressCreationDTO, ProjectProgressUpdateDTO } from '../global/types';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const PROGRESSES_URI = 'v1/project-progresses';

export function createProgress(newProgress: ProjectProgressCreationDTO): AxiosPromise {
  return server.post(`/${PROGRESSES_URI}`, newProgress, options);
}

export function updateProgress(updatedProgress: ProjectProgressUpdateDTO): AxiosPromise {
  return server.put(
    `/${PROGRESSES_URI}/${updatedProgress.id}`,
    {
      id: updatedProgress.id,
      projectId: updatedProgress.projectId,
      description: updatedProgress.description,
    },
    options
  );
}
