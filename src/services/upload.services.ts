export interface UploadServices {
  upload(
    file: string,
    userIdentifier: string,
    billIdentifier: string
  ): Promise<string>;
}
