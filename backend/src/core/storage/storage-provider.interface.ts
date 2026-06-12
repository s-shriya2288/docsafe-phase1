import { Readable } from 'stream';

export interface StorageProvider {
  uploadFile(fileStream: Readable, filename: string): Promise<{ fileAssetId: string; filePath: string }>;
  getFileUrl(fileAssetId: string): Promise<string>;
}
