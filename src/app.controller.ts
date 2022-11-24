import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<any> {
    try {
      const response = await this.appService.getHello();
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
