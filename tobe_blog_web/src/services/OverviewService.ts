import { AxiosPromise } from 'axios';

import { server } from '.';
import { EContentType } from '../global/enums.ts';

const OVERVIEW_URI = 'v1/analytics';

export function getOverviewData(contentType: EContentType): AxiosPromise {
  return server.get(`/${OVERVIEW_URI}/${contentType}`);
}
