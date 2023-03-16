import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

@Module({
  imports: [UserModule, 
    ConfigModule.forRoot({ isGlobal:true, envFilePath: `${process.env.NODE_ENV}.env`, load: [appConfig]}), 
    TypeOrmModule.forRootAsync(typeOrmConfig), 
    AuthModule],
})
export class AppModule {}
