import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { NumericType } from "mongodb";

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

    @Column()
    nationality: string;

    @Column()
    residence: string;

    @Column({ type: "date", nullable: false})
    birthday: string;

    @Column()
    age: number;

    @Column({ type: "timestamp", nullable: false})
    registration_date: number;

    @Column({type: "timestamp", nullable: false})
    last_connection: number;

    @Column({type: "json"})
    contact: JSON;

    @Column()
    status: string;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}
