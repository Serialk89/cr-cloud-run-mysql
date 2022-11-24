import { Injectable } from '@nestjs/common';
import { MysqlUnixConnection } from './services/mysql-unix-connection.service';

@Injectable()
export class AppService {

  constructor(private mysqlService: MysqlUnixConnection) { }
  async getHello(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const pool = await this.mysqlService.createUnixSocketPool();
      const stmt = 'SELECT COUNT(vote_id) as count FROM votes WHERE candidate=?';
      const tabsQuery = pool.query(stmt, ['TABS']);
      const spacesQuery = pool.query(stmt, ['SPACES']);
      return {
        tabsQuery, spacesQuery
      };
    });
  }
}

