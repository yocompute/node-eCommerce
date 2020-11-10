import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

@Entity({name: "products"})
export class Product {

    @ObjectIdColumn()
    _id: ObjectID | undefined;

    @Column()
    name: string;

    @Column()
    description: string | undefined;
    
    @Column()
    price: number;

    @Column()
    cost: number;

    @Column()
    taxRate: number;

    @Column()
    imageUrl: string | undefined;
    
    @Column()
    createUTC: Date;

    @Column()
    updateUTC: Date;
}
