import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectID;

    @PrimaryColumn({unique: true, nullable: false})
    id: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({unique: true, nullable: false})
    password: string;

    @Column()
    salt: string;

    @Column()
    profile_picture: string;

    @Column({ nullable: false})
    names: string;
    
    @Column({ nullable: false})
    last_name: string;

    @Column()
    biography: string;

    @Column()
    interests: string;

    @Column({nullable: false})
    native_language: string;

    @Column({type: 'simple-array', nullable: false})
    spoken_languages: string[];

    @Column({nullable: false})
    esperanto_level: string;

    @Column()
    gender: string;


}
