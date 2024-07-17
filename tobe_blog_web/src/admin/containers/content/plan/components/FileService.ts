import { AxiosPromise } from 'axios';
import Compressor from 'compressorjs';
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
  return compressImages(files).then((compressedFiles: File[]) => {
    compressedFiles.forEach((f: File) => {
      formData.append('files', f, f.name);
    });
    return server.post(`/${FILE_URI}/batch-upload?srcId=${srcId}&fileType=${fileType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  });
}

function compressImages(files: File[]): Promise<File[]> {
  return new Promise(async function (resolve) {
    let processedImages = 0;
    const numImagesToProcess = files.length;
    for (let i = 0; i < numImagesToProcess; i++) {
      const file = files[i];
      await new Promise(resolve => {
        const com = new Compressor(file, {
          quality: 0.5,
          success(result: File) {
            files[i] = result;
            resolve('Done');
          },
          error: () => {
            resolve('Failed');
          },
        });
        com.abort();
      });
      processedImages += 1;
    }
    if (processedImages === numImagesToProcess) {
      resolve(files);
    }
  });
}
