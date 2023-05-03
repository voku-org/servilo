import { ObjectID } from "typeorm";
export declare class User {
    _id: ObjectID;
    id: string;
    username: string;
    email: string;
    password: string;
    salt: string;
    profile_picture: string;
    names: string;
    last_name: string;
    biography: string;
    interests: string[];
    native_language: string;
    spoken_languages: string[];
    esperanto_level: string;
    gender: string;
    nationality: string;
    residence: string;
    birthday: string;
    age: number;
    registration_date: number;
    last_connection: number;
    contact: JSON;
    status: string;
    validatePassword(password: string): Promise<boolean>;
}
