import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { Code } from "../model";
import { UploaderModel } from "../uploader/uploader.model";
import { QrcodeModel } from "./qrcode.model";

export class QrcodeController extends Controller {
    qrcodeModel: QrcodeModel;
    constructor(model: QrcodeModel) {
        super(model);
        this.qrcodeModel = model;
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    async find(req: Request, res: Response): Promise<void> {
        const query: any = req.query;

        // mongoose
        const r = await this.qrcodeModel.find(query);

        res.setHeader('Content-Type', 'application/json');
        res.send(r);
    }


    // async upload(req: Request, res: Response) {
    //     const qrcodeId = req.params.id;
    //     const r = await this.qrcodeModel.findOne({ _id: qrcodeId });

    //     // @ts-ignore
    //     const defaultFilename = `${req.fileInfo.filename}`;
    //     const projectPath = process.cwd();
    //     const srcPath = `${projectPath}/${process.env.AWS_S3_PATH}/${defaultFilename}`;
    //     const ret: any = await UploaderModel.saveToAws(defaultFilename, srcPath);

    //     const qrcode = r.data;
    //     if (qrcode) {
    //         if (!qrcode.pictures) {
    //             qrcode.pictures = [ret.data];
    //         } else if (qrcode.pictures.length === 0) {
    //             qrcode.pictures[0] = (ret.data);
    //         }

    //         try {
    //             await this.qrcodeModel.update({ _id: qrcodeId }, qrcode);
    //         } catch (e) {
    //             console.error(e);
    //             return res.json({
    //                 code: Code.FAIL,
    //             });
    //         }
    //     }

    //     return res.json({
    //         code: Code.SUCCESS,
    //         data: qrcode,
    //     });
    // }
}