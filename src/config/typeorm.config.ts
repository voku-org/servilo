import { ConfigService } from "@nestjs/config";
import { ConfigModule } from "@nestjs/config/dist";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    if(configService.get<string>('NODE_ENV') === 'development')
    {
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
    else
    {
      return {
        type: 'mongodb',
        url: `mongodb+srv://${configService.get('DB_USERNAME')}:${configService.get('DB_PASSWORD')}@dbaas-db-3792387-a53f452f.mongo.ondigitalocean.com/${configService.get('DB_NAME')}?tls=true&authSource=admin&replicaSet=dbaas-db-3792387`,
        synchronize: true,
        logger: "debug",
        logging:true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        entities: [__dirname + '/../**/*.entity{.js,.ts}'],
        autoLoadEntities: true
      };
    }
  }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
}