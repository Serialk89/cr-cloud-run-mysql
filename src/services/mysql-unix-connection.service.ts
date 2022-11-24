import { Injectable } from '@nestjs/common';
import mysql from 'promise-mysql';
import { SecretManagerService } from './secret-manager.service';

@Injectable()
export class MysqlUnixConnection {
  
  constructor(private secretManagerService: SecretManagerService){}

  async createUnixSocketPool(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const config = {
          connectionLimit: 5, // maximo de conexiones al pool
          connectTimeout: 10000, // 10 seconds antes del timeout
          acquireTimeout: 10000, // 10 seconds verificando una conexion antes de que ocurra un error
          waitForConnections: true, // Determinamos si esperamos o no una coneccion cuando pool está 
          queueLimit: 0 // es el numero maximo de solicitudes de conexion en cola, 0 no hay limite
        };

        await this.secretManagerService.settingCredentials();

        const pool = mysql.createPool({
          user: process.env.DB_USER, // e.g. 'my-db-user'
          password: process.env.DB_PASS, // e.g. 'my-db-password'
          database: process.env.DB_NAME, // e.g. 'my-database'
          socketPath: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
          // Specify additional properties here.
          ...config,
        });
        resolve(pool);
      } catch (error) {
        console.error(error);
        reject('Error trying to create pool');
      }
    });
  };
}