import { serverEnv } from '@/env';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { UploadServices } from '../upload.services';
import { HttpErrorHandler } from '@/http/middlewares/httpErrorHandler';

class S3SerVices implements UploadServices {
  private s3Client;
  constructor() {
    this.s3Client = new S3Client({
      region: serverEnv.AWS_REGION,
      credentials: {
        accessKeyId: serverEnv.AWS_ACCESS_KEY_ID,
        secretAccessKey: serverEnv.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  async upload(file: string, userIdentifier: string, billIdentifier: string) {
    try {
      const objectKey = `faturas/${userIdentifier}/${billIdentifier}.pdf`;
      const command = new PutObjectCommand({
        Body: file,
        Bucket: serverEnv.AWS_S3_BUCKET_NAME,
        ContentType: 'application/pdf',
        Key: objectKey,
      });

      await this.s3Client.send(command);

      return objectKey;
    } catch (error) {
      throw new HttpErrorHandler(424, (error as Error).message);
    }
  }

  async generatePresignedUrl(objectKey: string) {
    try {
      if (!objectKey) {
        throw new Error('Informe uma KEY válida');
      }
      const command = new GetObjectCommand({
        Bucket: serverEnv.AWS_S3_BUCKET_NAME,
        Key: objectKey,
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });

      return signedUrl;
    } catch (error) {
      throw new HttpErrorHandler(424, (error as Error).message);
    }
  }
}
const s3SerVices = new S3SerVices();

export { s3SerVices };
