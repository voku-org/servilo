import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

@Module({
  imports: [UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),   // <-- path to the static files
      exclude: ['/api/(.*)'],
    }),
    ConfigModule.forRoot({ isGlobal:true, envFilePath: `${process.env.NODE_ENV}.env`, load: [appConfig]}), 
    TypeOrmModule.forRootAsync(typeOrmConfig), 
    AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
