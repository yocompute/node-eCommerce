import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Model } from ".";
import { DataBase } from "../dbs";
import { Log } from "./log";

export interface IUser {
  _id: string;
  type: string; // wechat, google, fb
  realm?: string;
  username: string;
  email?: string;
  phone?: string;
  password?: string;
  imageUrl?: string;
  roles?: string[]; // 'super', 'merchant-admin', 'merchant-stuff', 'driver', 'user'
  balance: number;
}


  export class User extends Model {
    constructor(db: DataBase) {
      super(db, "users");

    }

    // 3rd login
    mylogin(){
      // 3rd login
      // if no such identity save identity and create a guest user.

      // if Identity exist, check if it has associated user, if has use that user

      // if not, create a guest user
    }

    // phone + verification code
    phoneLogin(){

    }

    // local login by email + password for drivers
    login(){

    }

    // driver user cannot bind
    bindPhoneNumber(){
      // check if identity has associated phone number.
      
      // if not ask bind phone number

      // check if phone number exist in user table, bind user with phone number

      // if not create user in user table
    }


    // To do: test token is undefined or null
  async getUserByToken(tokenId: string) {
    if (tokenId && tokenId !== "undefined" && tokenId !== "null") {
      try {
        const r: any = jwt.verify(tokenId, process.env.JWT_SECRET);
        if (r.userId) {
          const user = await this.findOne({ _id: r.userId });
          if (user && user.password) {
            delete user.password;
          }
          return user;
        } else {
          Log.save({msg: `getUserByToken Fail: jwt verify fail, tokenId: ${tokenId}`});
          return;
        }
      } catch (e) {
        Log.save({msg: `getUserByToken Fail: jwt verify exception, tokenId: ${tokenId}`});
        return;
      }
    } else {
      Log.save({msg: 'getUserByToken fail: tokenId is null'});
      return;
    }
  }

}