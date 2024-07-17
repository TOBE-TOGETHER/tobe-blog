import { AxiosPromise } from 'axios';
import { EContentType } from '../../../global/enums';
import server from '../../../services/server';

const OVERVIEW_URI = 'v1/analytics';

export function getOverviewData(contentType: EContentType): AxiosPromise {
  return server.get(`/${OVERVIEW_URI}/${contentType}`);
}
