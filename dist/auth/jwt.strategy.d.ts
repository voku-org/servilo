import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    protected configService: ConfigService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        id: any;
        names: any;
    }>;
}
export {};
