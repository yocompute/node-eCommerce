import {Entity, PrimaryColumn, ObjectID, Column} from "typeorm";

@Entity({name: "products"})
export class Product {

    @PrimaryColumn()
    id: ObjectID | undefined;

    @Column()
    name: string;

    @Column()
    description: string | undefined;

    @Column()
    storeId: ObjectID | undefined;
    
    @Column()
    price: number;

    @Column()
    cost: number;

    @Column()
    taxRate: number;

}
