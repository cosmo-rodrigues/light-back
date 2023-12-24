import { serverEnv } from '@/env';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function uploadToS3(file: string) {
  try {
    const s3Client = new S3Client({
      region: serverEnv.AWS_REGION,
      credentials: {
        accessKeyId: serverEnv.AWS_ACCESS_KEY_ID,
        secretAccessKey: serverEnv.AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new PutObjectCommand({
      Bucket: serverEnv.AWS_S3_BUCKET_NAME,
      ContentType: 'application/pdf',
      Key: file,
    });

    const uploadResponse = await s3Client.send(command);
    console.log('UPLOAD SUCCESS: ', uploadResponse);

    return uploadResponse;
  } catch (error) {
    const errorMessage =
      typeof error === 'string' ? error : JSON.stringify(error);
    console.log('UPLOAD ERROR: ', errorMessage);

    throw new Error(errorMessage);
  }
}
