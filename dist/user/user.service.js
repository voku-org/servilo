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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const utils_service_1 = require("../utils/utils.service");
let UserService = class UserService {
    constructor(userRepo, utilService) {
        this.userRepo = userRepo;
        this.utilService = utilService;
    }
    async create(createUserDto) {
        const user = this.userRepo.create(createUserDto);
        user.id = (0, uuid_1.v1)();
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(createUserDto.password, user.salt);
        user.age = this.utilService.calculateAge(createUserDto.birthday);
        await this.userRepo.save(user);
        return {
            email: user.email,
            names: user.names,
        };
    }
    async findByEmail(email) {
        return await this.userRepo.findOne({
            where: {
                email: email,
            }
        });
    }
    async findAll() {
        return await this.userRepo.find({});
    }
    async findOne(id) {
        return await this.userRepo.findOne({ where: { id: id } });
    }
    async update(id, updateUserDto) {
        let toUpdate = updateUserDto;
        for (let key of Object.keys(toUpdate)) {
            if (toUpdate[key] === undefined || toUpdate[key] === "" || key === 'id' || key === 'last_connection' || key === 'registration_date') {
                delete toUpdate[key];
            }
        }
        return await this.userRepo.update({ id: id }, toUpdate);
    }
    async remove(id) {
        return await this.userRepo.delete({ id: id });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utils_service_1.UtilsService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map