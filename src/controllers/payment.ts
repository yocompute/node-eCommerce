import { Request, Response } from "express";

// import { IPayment, Payment, PaymentMethod, PaymentStatus } from "../models/payment";
import { Controller, IControllerParams, Code } from "./index";
// import { DataBase } from "../../dbs";
// import { Model } from "../models";
// import { Order } from "../models/order";
// import { User } from "../models/user";

export class PaymentController extends Controller {
  // model: Payment;
  // orderModel: Order;
  // userModel: User;

  // constructor(params: IControllerParams) {
  //   const model = new Payment(params.db, params.sse);
  //   super(model, params);
  //   this.model = model;
  //   this.orderModel = new Order(params.db, null);
  //   this.userModel = new User(params.db);
  // }

  // async insertOne(req: Request, res: Response): Promise<void> {
  //   const d = req.body.data;
  //   let code = Code.FAIL;
  //   let data = null;
  //   const tokenId: any = this.getAuthToken(req);
  //   const user = await this.userModel.getUserByToken(tokenId);
  //   if (!user) {
  //     res.send({
  //       code: Code.FAIL,
  //       msg: "authentication failed"
  //     })
  //   } else {
  //     try {
  //       if (req.body) {

  //         const payment: IPayment = { 
  //           price: d.price,
  //           cost: d.cost,
  //           tax: d.tax,
  //           payable: d.payable,
  //           method: d.paymentMethod,
  //           note: d.note,
  //           status: PaymentStatus.UNPAY
  //         };

  //         const r: any = await this.model.insertOne(payment);
  //         const paymentId = r.insertedId;
  //         payment._id = r.insertedId;

  //         // split to orders and insert to order table
  //         const orderMap = this.model.getOrderMap(paymentId.toString(), d.items, d.pickupUTC);
  //         const keys = Object.keys(orderMap);
  //         for (let i = 0; i < keys.length; i++) {
  //           const key = keys[i];
  //           const order = orderMap[key];
  //           this.orderModel.insertOne(order);
  //         }

  //         // pay by pament gateway
  //         if(payment.method === PaymentMethod.CARD){
  //           const card = {...d};

  //             const ret = await this.model.pay(user._id.toString(), user.username, payment, card);

  //         }else{

  //         }

  //         // send envent to backoffice
  //         if (this.sse) {

  //         }

  //         if (r) {
  //           code = Code.SUCCESS;
  //           data = r; // r.upsertedId ?
  //         } else {
  //           code = Code.FAIL;
  //         }
  //       }
  //     } catch (error) {
  //       // logger.error(`updateOne error: ${error}`);
  //     } finally {
  //       res.setHeader("Content-Type", "application/json");
  //       res.send({
  //         code,
  //         data,
  //       });
  //     }
  //   }
  // }



  // snappayNotify(req: Request, res: Response) {
  //   const rsp = req.body;
  //   // console.log('snappayNotify trans_status:' + b.trans_status);
  //   // console.log('snappayNotify trans_no:' + b.trans_no);
  //   // console.log('snappayNotify out_order_no' + b.out_order_no);
  //   // console.log('snappayNotify customer_paid_amount' + b.customer_paid_amount);
  //   // console.log('snappayNotify trans_amount' + b.trans_amount);
  //   const paymentMethod = req.body.payment_method;
  //   const amount = Math.round(+req.body.trans_amount * 100) / 100;
  //   const paymentId = rsp ? rsp.out_order_no : "";

  //   console.log(`Snappay notify req --- paymentId: ${paymentId}, ${JSON.stringify(req.body)}`);


  //   // await Log.save({ msg: `Snappay notify req --- paymentId: ${paymentId}, ${JSON.stringify(req.body)}` });

  //   if (rsp && rsp.trans_status === "SUCCESS") {
  //     // const paymentActionCode = this.snappay.getTransactionActionCode(paymentMethod); // TransactionAction.PAY_BY_WECHAT.code;
  //     // console.log(`before process pay`);
  //     // this.orderModel.processAfterPay(paymentId, paymentActionCode, amount, '').then(() => {
  //     //   console.log('after process pay');
  //     //   res.setHeader("Content-Type", "application/json");
  //     //   res.send({ code: "0" }); // must return as snappay gateway required
  //     // });
  //   }
  // }
}