import { Injectable } from '@nestjs/common';
import { StorageProvider } from './storage-provider.interface';
import { Readable, pipeline } from 'stream';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { randomUUID } from 'crypto';

const pump = util.promisify(pipeline);

@Injectable()
export class LocalStorageProvider implements StorageProvider {
  private readonly uploadDir = path.join(process.cwd(), 'storage', 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(fileStream: Readable, filename: string): Promise<{ fileAssetId: string; filePath: string }> {
    const fileAssetId = randomUUID();
    const extension = path.extname(filename);
    const storedFilename = `${fileAssetId}${extension}`;
    const destinationPath = path.join(this.uploadDir, storedFilename);

    await pump(fileStream, fs.createWriteStream(destinationPath));

    return {
      fileAssetId,
      filePath: destinationPath,
    };
  }

  async getFileUrl(fileAssetId: string): Promise<string> {
    const files = await fs.promises.readdir(this.uploadDir);
    const matchedFile = files.find((file) => file.startsWith(fileAssetId));
    if (!matchedFile) {
      throw new Error(`File with asset ID ${fileAssetId} not found`);
    }
    return `/storage/uploads/${matchedFile}`;
  }
}

@Injectable()
export class StorageService extends LocalStorageProvider {}
