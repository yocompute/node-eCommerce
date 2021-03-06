import multer from "multer";
import * as mime from "mime-types";
import { IFileRequest } from "../uploader/uploader.model";
import { Request } from "express";

/**
 * Upload to local folder, then save to s3
 */
export const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, `${process.env.AWS_S3_PATH}/`);
  },
  filename: function (req: IFileRequest, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const name = Math.random().toString(36).substring(2) + "_" + Date.now();
    const extension = mime.extension(file.mimetype);
    const filename = `${name}.${extension}`;
    req.fileInfo = {
      filename,
      name,
      extension
    }
    cb(null, filename);
  },
});
export const MulterUploader = multer({ storage: storage });