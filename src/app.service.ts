import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! James your awesome! simple-api-cloud-run v1.4';
  }
}
