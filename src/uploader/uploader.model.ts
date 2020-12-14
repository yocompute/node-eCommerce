import fs from "fs";
import AWS from 'aws-sdk';
import { Code } from "../model";

export const UploaderModel = {
  /**
   * 
   * @param {*} fname name with extension
   * @param {*} fpath 
   */
  saveToAws(fname: string, fpath: string) {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_ID,
      secretAccessKey: process.env.AWS_S3_ACCESS_KEY
    });

    const fileContent = fs.readFileSync(fpath);

    const params: any = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
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
    return new Promise((resolve, reject) => {
        s3.upload(params, (err: any, data: any) => {
        if (err) {
          resolve({code: Code.FAIL, err, data: null});
        }else{
          const pic = {url: data.Location, name: data.key}
          resolve({code: Code.SUCCESS, err: null, data: pic});
        }
        console.log(`File uploaded to AWS S3 successfully: ${data.Location}`);
      });
    });
  }
}