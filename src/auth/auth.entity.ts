import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

@Entity({name: "auth"})
export class Auth {

    @ObjectIdColumn()
    _id: ObjectID | undefined;

    @Column()
    userId: ObjectID | undefined;

    @Column()
    email: string | undefined;
    
    @Column()
    phone: string | undefined;

    @Column()
    password: string | undefined;

    @Column()
    createUTC: Date;
}
