import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

@Entity({name: "users"})
export class User {

    @ObjectIdColumn()
    _id: ObjectID | undefined;

    @Column()
    username: string;

    // @Column()
    // password: string | undefined;

    @Column()
    email: string | undefined;
    
    @Column()
    phone: string | undefined;

    @Column()
    balance: number;

    @Column()
    createUTC: Date;
}
