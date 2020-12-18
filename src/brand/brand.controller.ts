import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { Code } from "../model";
import { UploaderModel } from "../uploader/uploader.model";
import { BrandModel } from "./brand.model";

export class BrandController extends Controller {
    brandModel: BrandModel;
    constructor(model: BrandModel) {
        super(model);
        this.brandModel = model;
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    async find(req: Request, res: Response): Promise<void> {
        const query: any = req.query;

        // mongoose
        const r = await this.brandModel.find(query);

        res.setHeader('Content-Type', 'application/json');
        res.send(r);
    }


    async upload(req: Request, res: Response) {
        const brandId = req.params.id;
        const r = await this.brandModel.findOne({ _id: brandId });

        // @ts-ignore
        const defaultFilename = `${req.fileInfo.filename}`;
        const projectPath = process.cwd();
        const srcPath = `${projectPath}/${process.env.AWS_S3_PATH}/${defaultFilename}`;
        const ret: any = await UploaderModel.saveToAws(defaultFilename, srcPath);

        const brand = r.data;
        if (brand) {
            if (!brand.pictures) {
                brand.pictures = [ret.data];
            } else if (brand.pictures.length === 0) {
                brand.pictures[0] = (ret.data);
            }

            try {
                // await this.brandModel.update({ _id: brandId }, brand);
                await this.brandModel.updateOne({ _id: brandId }, brand);
            } catch (e) {
                console.error(e);
                return res.json({
                    code: Code.FAIL,
                });
            }
        }

        return res.json({
            code: Code.SUCCESS,
            data: brand,
        });
    }
}