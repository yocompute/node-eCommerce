import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

@Entity({name: "brands"})
export class Brand {

    @ObjectIdColumn()
    _id: ObjectID | undefined;

    @Column()
    name: string;

    @Column()
    description: string | undefined;
    
    @Column()
    imageUrl: string | undefined;

    @Column()
    createUTC: Date;

    @Column()
    updateUTC: Date;
}
