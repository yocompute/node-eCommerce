import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { UploaderModel } from "./uploader.model";

export const UploaderController = {

    async upload(req: Request, res: Response) {
        const defaultFilename = `${req.body.fname}.${req.body.ext}`;
        const projectPath = process.cwd();
        const srcPath = `${projectPath}/${process.env.AWS_S3_PATH}/${defaultFilename}`;
        return await UploaderModel.saveToAws(defaultFilename, srcPath);
    }
}