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
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
let UtilsService = class UtilsService {
    constructor() { }
    calculateAge(birthday) {
        let birhtDate = new Date(birthday);
        let today = new Date();
        let age = today.getFullYear() - birhtDate.getFullYear();
        let monthDifference = today.getMonth() - birhtDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate())) {
            age--;
        }
        return age;
    }
    ;
};
UtilsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map