import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlUnixConnection } from './services/mysql-unix-connection.service';
import { SecretManagerService } from './services/secret-manager.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MysqlUnixConnection, SecretManagerService, AppService],
})
export class AppModule {}
