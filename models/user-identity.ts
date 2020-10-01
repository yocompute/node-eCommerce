export interface IUserIdentity {
    type: string;       // phone number login, google, facebook ...
    profileId: string;
    email: string;
    phone: string;
    name: string;
    imageUrl: string;

    accountId: string;
}

import { Model } from ".";
import { DataBase } from "../dbs";


  export class UserIdentity extends Model {
    constructor(db: DataBase) {
      super(db, "user_identities");
    }
}