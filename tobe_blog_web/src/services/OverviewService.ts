import { AxiosPromise } from 'axios';

import { server } from '.';
import { EDomain } from '../global/enums.ts';

const OVERVIEW_URI = 'v1/overview';

export function getOverviewData(domain: EDomain): AxiosPromise {
  return server.get(`/${OVERVIEW_URI}/${domain}`);
}
