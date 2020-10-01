import { Model } from ".";
import { DataBase } from "../dbs";

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

    // driver account cannot bind
    bindPhoneNumber(){
      // check if identity has associated phone number.
      
      // if not ask bind phone number

      // check if phone number exist in user table, bind user with phone number

      // if not create user in user table
    }

}