export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    salt: string;
    name: string;
    lastname: string;
    gender: string;
    nationality: string;
    esperanto_level: string;
    birthday: string;
    age: number;
    registration_date: number;
    last_connection: number;
    profile_picture: string | undefined;
    biography: string | undefined;
    residence: string | undefined;
    interests: string[] | undefined;
    native_language: string | undefined;
    spoken_languages: string[] | undefined;
    contact: JSON | undefined;
    status: string | undefined;
}
