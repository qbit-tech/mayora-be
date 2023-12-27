import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FileDownloader } from './interfaces/file-downloader';
import { AttachmentModel } from './uploader.entity';
import { v4 as uuidv4 } from 'uuid';
import cryptoRandomString from 'crypto-random-string';

export type AttachmentProperties = {
  iAttachment?: number;
  ipAttachment: string;
  iTicket: number;
  iType: number;
  vRawData: object;
  dCreated: Date;
  dTaskDone?: Date;
  iTask?: number;
};

export type FileOptions = {
  cacheTimeout: number;
  defaultMetadata: object;
};

@Injectable()
export class UploaderService {
  constructor(
    @Inject('FILE_OPTIONS')
    private readonly fileOptions: FileOptions,
    @Inject('FILE_DOWNLOADER')
    private readonly fileDownloader: FileDownloader,
    @InjectModel(AttachmentModel)
    private readonly fileRepository: typeof AttachmentModel,
  ) {}

  async fileUploaded(params: {
    filePath: string;
    iTicket: number;
    iTask: number;
    metadata?: object;
    iType?: number;
    dTaskDone?: Date;
  }): Promise<{ data: AttachmentProperties; url: string }> {
    const vRawData = {
      fileCacheTimeout:
        this.fileOptions.cacheTimeout === -1
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 360 * 100)
          : new Date(Date.now() + 1000 * this.fileOptions.cacheTimeout),
      fileLinkCache: await (this.fileOptions.cacheTimeout === 0
        ? Promise.resolve(null)
        : this.fileDownloader.getLink({
            filePath: params.filePath,
            metadata: {
              ...this.fileOptions.defaultMetadata,
              ...(params.metadata || {}),
            },
            expired: this.fileOptions.cacheTimeout,
          })),
    };

    const ipAttachment = cryptoRandomString({ length: 15 });
    const today = new Date();
    const iTask = params.iTask ? params.iTask : null;

    const data: AttachmentProperties = {
      vRawData: vRawData,
      ipAttachment: ipAttachment,
      dCreated: today,
      dTaskDone: params.iType == 2 ? today : null, 
      iTicket: params.iTicket,
      iType: params.iType ?? 1, // 1 means task attachment, 2 means task submission attachment
      iTask: iTask,
    };
    const result = await this.fileRepository.create(data);

    return { data: result.get(), url: vRawData.fileLinkCache };
  }

  async fileSearchByiAttachment(
    iAttachment: number,
  ): Promise<AttachmentProperties> {
    const results = await this.fileRepository.findOne({
      where: {
        iAttachment: iAttachment,
      },
    });

    return results ? results.get() : null;
  }

  async deleteByiAttachment(iAttachment: number): Promise<number> {
    const result = await this.fileRepository.destroy({
      where: {
        iAttachment: iAttachment,
      },
    });
    return result;
  }

  async uploadProfilePicture(params: {
    filePath: string;
    iUser: number;
    metadata?: object;
  }): Promise<{ data: any; url: string }> {
    const vRawData = {
      fileCacheTimeout:
        this.fileOptions.cacheTimeout === -1
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 360 * 100)
          : new Date(Date.now() + 1000 * this.fileOptions.cacheTimeout),
      fileLinkCache: await (this.fileOptions.cacheTimeout === 0
        ? Promise.resolve(null)
        : this.fileDownloader.getLink({
            filePath: params.filePath,
            metadata: {
              ...this.fileOptions.defaultMetadata,
              ...(params.metadata || {}),
            },
            expired: this.fileOptions.cacheTimeout,
          })),
    };

    return { data: vRawData, url: vRawData.fileLinkCache };
  }

  async uploadLogFile(params: {
    filePath: string;
    metadata?: object;
  }): Promise<{ data: any; url: string }> {
    const vRawData = {
      fileCacheTimeout:
        this.fileOptions.cacheTimeout === -1
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 360 * 100)
          : new Date(Date.now() + 1000 * this.fileOptions.cacheTimeout),
      fileLinkCache: await (this.fileOptions.cacheTimeout === 0
        ? Promise.resolve(null)
        : this.fileDownloader.getLink({
            filePath: params.filePath,
            metadata: {
              ...this.fileOptions.defaultMetadata,
              ...(params.metadata || {}),
            },
            expired: this.fileOptions.cacheTimeout,
          })),
    };

    return { data: vRawData, url: vRawData.fileLinkCache };
  }
}
