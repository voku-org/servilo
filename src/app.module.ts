import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRootAsync(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
