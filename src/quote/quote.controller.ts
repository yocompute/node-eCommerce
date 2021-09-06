// import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { IModelResult } from "../model";
import { IFileRequest, IPicture, UploaderModel } from "../uploader/uploader.model";
import { IQuote } from "./quote.entity";
import { QuoteModel } from "./quote.model";

export class QuoteController extends Controller<IQuote> {
    quoteModel: QuoteModel;
    constructor(model: QuoteModel) {
        super(model);
        this.quoteModel = model;
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
    //         const r = await this.quoteModel.find(query);
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
    // async upload(req: IFileRequest): Promise<IModelResult<IQuote>> {
    //     const quoteId = req.params.id;
    //     const r = await this.quoteModel.findOne({ _id: quoteId });

    //     const defaultFilename = `${req.fileInfo.filename}`;
    //     const projectPath: string = process.cwd();
    //     const srcPath = `${projectPath}/${process.env.AWS_S3_PATH}/${defaultFilename}`;
    //     const ret: IModelResult<IPicture> = await UploaderModel.saveToAws(defaultFilename, srcPath);

    //     const quote = r.data;
    //     if (quote) {
    //         const pic: IPicture = ret.data || {name:'', url: ''};
    //         if (!quote.pictures) {
    //             quote.pictures = [pic];
    //         } else if (quote.pictures.length === 0) {
    //             quote.pictures[0] = (pic);
    //         }

    //         try {
    //             await this.quoteModel.updateOne({ _id: quoteId }, quote);
    //         } catch (e) {
    //             console.error(e);
    //             return { error: e };
    //         }
    //     }

    //     return { error: null, data: quote };
    // }
}