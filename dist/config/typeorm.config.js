"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const dist_1 = require("@nestjs/config/dist");
class TypeOrmConfig {
    static getOrmConfig(configService) {
        return {
            type: 'mongodb',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [__dirname + '/../**/*.entity{.js,.ts}'],
            synchronize: true,
            logging: true
        };
    }
}
exports.default = TypeOrmConfig;
exports.typeOrmConfig = {
    imports: [dist_1.ConfigModule],
    useFactory: async (configService) => TypeOrmConfig.getOrmConfig(configService),
    inject: [config_1.ConfigService]
};
//# sourceMappingURL=typeorm.config.js.map