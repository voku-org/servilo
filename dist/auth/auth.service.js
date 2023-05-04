"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entities/user.entity");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const login_user_dto_1 = require("../user/dto/login-user.dto");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validate(userData) {
        const findedUser = await this.userService.findByEmail(userData.username);
        return findedUser;
    }
    async verify(decodedUser) {
        const found = await this.userService.findOne(decodedUser.id);
        if (!found) {
            throw new common_1.UnauthorizedException();
        }
        return {
            id: found.id,
            names: found.names,
            email: found.email,
            username: found.username,
            profile_picture: found.profile_picture,
            gender: found.gender
        };
    }
    async login(user) {
        return await this.validate(user).then(async (userData) => {
            const valid = await userData.validatePassword(user.password);
            if (!valid) {
                return { status: 404 };
            }
            let payload = {
                id: userData.id,
                names: userData.names + " " + userData.last_name,
                email: userData.email,
                username: userData.username,
                gender: userData.gender
            };
            const accessToken = this.jwtService.sign(payload);
            return Object.assign(Object.assign({ expires_in: '1 day', access_token: accessToken }, payload), { profile_picture: userData.profile_picture, status: 200 });
        });
    }
    async register(user) {
        return this.userService.create(user);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map