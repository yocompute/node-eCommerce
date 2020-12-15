import express, {Request, Response} from "express";
import multer from "multer";
import { UploaderController } from "./uploader.controller";

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, `${process.env.AWS_S3_PATH}/`);
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, req.body.fname + "." + req.body.ext);
    },
});

const uploader = multer({ storage: storage });

  
export function UploaderRoute(){
  const router = express.Router();

    router.post('/upload', uploader.single("file"), UploaderController.upload);

    return router;
}