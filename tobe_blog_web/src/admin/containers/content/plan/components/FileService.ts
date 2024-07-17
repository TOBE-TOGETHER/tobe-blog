import { AxiosPromise } from 'axios';
import server from '../../../../../services/server';

const FILE_URI = 'v1/files';

export function upload(srcId: string, fileType: string, file: Blob): AxiosPromise {
  const formData = new FormData();
  formData.append('file', file);
  return server.post(`/${FILE_URI}/upload?srcId=${srcId}&fileType=${fileType}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function batchUpload(srcId: string, fileType: string, files: File[]): AxiosPromise {
  const formData = new FormData();
  files.forEach((f: File) => {
    formData.append('files', f, f.name);
  });
  return server.post(`/${FILE_URI}/batch-upload?srcId=${srcId}&fileType=${fileType}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
