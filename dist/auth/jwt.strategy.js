"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const app_config_1 = require("../config/app.config");
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: (0, app_config_1.default)().appSecret
        });
        this.configService = configService;
    }
    async validate(payload) {
        return {
            id: payload.id,
            names: payload.names,
            email: payload.email,
            username: payload.username,
            gender: payload.gender,
            profile_picture: payload.profile_picture
        };
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map