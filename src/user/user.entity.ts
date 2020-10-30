import {Entity, PrimaryColumn, ObjectID, Column} from "typeorm";

@Entity({name: "users"})
export class User {

    @PrimaryColumn()
    _id: ObjectID | undefined;

    @Column()
    username: string;

    @Column()
    password: string | undefined;

    @Column()
    email: string | undefined;
    
    @Column()
    phone: string | undefined;

    @Column()
    balance: number;

    @Column()
    createUTC: Date;
}
