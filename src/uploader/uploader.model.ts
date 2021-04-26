import fs from "fs";
import AWS from 'aws-sdk';
import { IModelResult } from "../model";
import { Request } from "express";

export interface IFileInfo{
  filename: string,
  name?: string,
  extension?: string | false,
}

export interface IFileRequest extends Request {
  fileInfo: IFileInfo // or any other type
}

export interface IPicture {
  name: string,
  url: string,
}

export const UploaderModel = {
  /**
   * 
   * @param {*} fname name with extension
   * @param {*} fpath 
   */
  saveToAws(fname: string, fpath: string): Promise<IModelResult<IPicture>> {
    const s3: AWS.S3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_ID,
      secretAccessKey: process.env.AWS_S3_ACCESS_KEY
    });

    const fileContent = fs.readFileSync(fpath);

    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '',
      Key: `${process.env.AWS_S3_PATH}/${fname}`, // File name you want to save as in S3
      Body: fileContent,
      ACL: 'public-read'
    };

    // data:
    // Bucket:'upload.shippal.ca'
    // ETag:'"c95cae733b8a45e912d2c4074291eb08"'
    // key:'uploads/5tn4c1wzwff_1607880185265.gif'
    // Key:'uploads/5tn4c1wzwff_1607880185265.gif'
    // Location:'https://s3.amazonaws.com/upload.shippal.ca/uploads/5tn4c1wzwff_1607880185265.gif'
    return new Promise((resolve) => {
      s3.upload(params, (error: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (error) {
          resolve({ error: error.message });
        } else {
          const pic: IPicture = { url: data.Location, name: data.Key };
          resolve({ error: null, data: pic });
        }
        console.log(`File uploaded to AWS S3 successfully: ${data.Location}`);
      });
    });
  }
}