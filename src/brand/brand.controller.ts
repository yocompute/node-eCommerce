// import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { IModelResult } from "../model";
import { IFileRequest, IPicture, UploaderModel } from "../uploader/uploader.model";
import { IBrand } from "./brand.entity";
import { BrandModel } from "./brand.model";

export class BrandController extends Controller<IBrand> {
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
    // async find(req: Request, res: Response): Promise<void> {
    //     const query: core.Query = req.query;
    //     res.setHeader('Content-Type', 'application/json');

    //     try {
    //         const r = await this.brandModel.find(query);
    //         if (r.data) {
    //             res.status(200).send(r);
    //         } else {
    //             res.status(403).send(r);
    //         }
    //     } catch (error) {
    //         res.status(500).send({ error: error.message });
    //     }
    // }

    // fix me req type
    async upload(req: IFileRequest): Promise<IModelResult<IBrand>> {
        const brandId = req.params.id;
        const r = await this.brandModel.findOne({ _id: brandId });

        const defaultFilename = `${req.fileInfo.filename}`;
        const projectPath: string = process.cwd();
        const srcPath = `${projectPath}/${process.env.AWS_S3_PATH}/${defaultFilename}`;
        const ret: IModelResult<IPicture> = await UploaderModel.saveToAws(defaultFilename, srcPath);

        const brand = r.data;
        if (brand) {
            const pic: IPicture = ret.data || {name:'', url: ''};
            if (!brand.pictures) {
                brand.pictures = [pic];
            } else if (brand.pictures.length === 0) {
                brand.pictures[0] = (pic);
            }

            try {
                await this.brandModel.updateOne({ _id: brandId }, brand);
            } catch (e) {
                console.error(e);
                return { error: e };
            }
        }

        return { error: null, data: brand };
    }
}