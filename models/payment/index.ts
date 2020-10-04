import axios from "axios"
import { Model } from "..";
import { DataBase } from "../../dbs";
import { IOrderItem } from "../order";
import { IUser } from "../user";
import { moneris, MonerisPayment } from "./moneris";

export const PaymentStatus = {
    PAID: 'Paid',
    UNPAY: 'Unpay'
}

export const PaymentMethod = {
  CARD: 'Card' // credit card, debit card
}

export interface IPayment{
    _id?: string;
    price: number;
    cost: number;
    tax: number;
    payable: number;
    method: string;
    note: string;
    status: string;

    originalPrice?: number;
    orderIds?: string[];
}

export interface ICard{
  cc: string;
  cvd: string;
  exp: string;
}
// logger.info("inserting client credit");
// await this.clientCreditModel.insertOne(clientCredit);

export class Payment extends Model {

    constructor(db: DataBase, definition: any) {
        super(db, "payments", definition);
    }


    getOrderMap(paymentId: string, items: IOrderItem[], pickupUTC: string){
        const orderMap: any = {};
        items.forEach(it => {
            const key = `${it.merchantId}`;

            // pickupDateTime: string;
            // createDateTime: string;
            // modifyDateTime: string;
            orderMap[key] = { paymentId, items: [], price: 0, cost:0, tax: 0, pickupUTC }
        });

        items.forEach((it: IOrderItem) => {
            const key = `${it.merchantId}`;
            orderMap[key].items.push(it);
            orderMap[key].price += it.price;
            orderMap[key].cost += it.cost;
            orderMap[key].tax += Math.round(it.price * it.taxRate) / 100;
        });

        return orderMap;
    }


  getDescription(payment: IPayment) {
    let description = "";
    // for (let order of orders) {
    //   for (let item of (order.items || [])) {
    //     let productName = item.productName;
    //     description += `${productName || "Unknown"} x ${item.quantity} `;
    //   }
    // }

    // if (description.length > 90) {
    //   description = description.substring(0, 90) + "...";
    // }
    return description;
  }

  getPayable(payment: IPayment, account: IUser) {
      let total = payment.price + payment.tax;
    if (account.balance) {
      total -= Number(account.balance);
    }
    return total;
  }

  async pay(userId: string, userName: string, payment: IPayment, card?: ICard){
      if(payment.method === PaymentMethod.CARD){
        const moneris = new MonerisPayment();
        const paymentId: any = payment._id;
        if(process.env.MOCK){ // for test 
          return await axios.post('http://localhost/api/payments/notify/moneris', {code: 'success'});
        }else{

          return await moneris.pay(userId, userName, payment.payable, paymentId.toString(), card);
        }
      }
  }

  // notify post will call multiple times, processAfterPay shall be able to handle the repeated requests.
  // paymentId --- order paymentId
  async processAfterPay(paymentId: string, actionCode: string, amount: number, chargeId: string) {
    // logger.info("--- BEGIN PROCESS AFTER PAY ---");
    // logger.info(`paymentId: ${paymentId}, amount: ${amount}`);
    // const orders = await this.find({
    //   paymentId,
    //   status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED] }, paymentStatus: { $ne: PaymentStatus.PAID }});

    // if (orders && orders.length > 0) {
    //   // logger.info("orders found");
    //   const order = orders[0];
    //   // logger.info(`first order id: ${order._id}`);
    //   if (order.paymentStatus === PaymentStatus.UNPAID) {
    //     // logger.info("order is not paid");
    //     // add two transactions for placing order for duocun and merchant
    //     // logger.info("Add debit transactions");
    //     await this.addDebitTransactions(orders);

    //     // add transaction to Bank and update the balance
    //     const delivered: any = order.delivered;
    //     const clientId = order.clientId.toString();
    //     // logger.info(`Client ID: ${clientId}`);
    //     // logger.info("Add credit transaction");
    //     await this.addCreditTransaction(paymentId, clientId, order.clientName, amount, actionCode, delivered); // .then(t => {

    //     // update payment status to 'paid' for the orders in batch
    //     // logger.info("update order status to be paid");
    //     const data = { status: OrderStatus.NEW, paymentStatus: PaymentStatus.PAID };
    //     const updates = orders.map(order => ({ query: { _id: order._id }, data }));
    //     await this.bulkUpdate(updates);
    //     // orders.forEach(order => {
    //     //   amount -= order.total;
    //     // });
    //     // if (amount) {
    //     //   logger.info("Amount after orders payment", amount);
    //     //   const client = await this.accountModel.findOne({ _id: clientId });
    //     //   if (client) {
    //     //     logger.info("Client balance: " + client.balance);
    //     //     client.balance = parseFloat(client.balance || 0) + amount;
    //     //     client.balance = Number(Number(client.balance).toFixed(2));
    //     //     logger.info("Client new balance: " + client.balance);
    //     //     await this.accountModel.updateOne({ _id: client._id }, client);
    //     //   } else {
    //     //     logger.warn("Client not found");
    //     //   }
          
    //     // }
        
    //   }
    // } else { // add credit for Wechat
    //   // logger.info("orders not found. Add credit to duocun account");
    //   const credit = await this.clientCreditModel.findOne({ paymentId }); // .then((credit) => {
      
    //   if (credit) {
    //     // logger.info("Credit found");
    //     if (credit.status === PaymentStatus.UNPAID) {
    //       // logger.info("Credit unpaid");
    //       // logger.info("Updating payment status to be paid")
    //       await this.clientCreditModel.updateOne({ _id: credit._id }, { status: PaymentStatus.PAID }); // .then(() => {
    //       const accountId = credit.accountId.toString();
    //       const accountName = credit.accountName;
    //       const note = credit.note;
    //       const paymentMethod = credit.paymentMethod;
    //       // logger.info(`Add credit ${amount} to ${accountName}`);
    //       await this.transactionModel.doAddCredit(accountId, accountName, amount, paymentMethod, note); // .then(() => {
    //     } else {
    //       // logger.info("Credit already paid");
    //     }
    //   } else {
    //     // logger.info("Credit not found");
    //   }
    // }

    // // called multiple times
    // for (let order of orders) {
    //   if (order.paymentMethod === PaymentMethod.CREDIT_CARD || order.paymentMethod === PaymentMethod.WECHAT) {
    //     // logger.info(`Change product quantity after payment (type: ${order.paymentMethod}). Client Name: ${order.clientName} Payment ID: ${order.paymentId} Order ID: ${order._id}`);
    //     await this.changeProductQuantity(order, true);
    //   }
    // }
    // // logger.info("--- END PROCESS AFTER PAY ---");
  }


  // async getPaymentInfo(user: IUser, paymentId: string) {


  //   const orders: Array<IOrder>  = await this.orderModel.find({
  //     paymentId,
  //     status: OrderStatus.TEMP
  //   });

  //   if (!orders || !orders.length) {
  //   //   logger.info("orders empty");
  //   //   logger.info("--- END MONERIS PRELOAD ---");
  //     return {
  //       code: Code.FAIL,
  //       msg: "cannot find orders"
  //     };
  //   }

  //   const total = this.getPayable(orders, account);
  //   if (total <= 0) {
  //     //   logger.warning('Total amount is below zero');
  //     //   logger.info('---  END ALPHAPAY  ---');
  //     return {
  //       code: Code.FAIL,
  //       msg: 'total_amount_is_below_zero'
  //     };
  //   }
  //   return {
  //     code: Code.SUCCESS,
  //     account,
  //     orders,
  //     total
  //   };
  // }
}