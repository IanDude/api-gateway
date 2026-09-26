import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('dashboard/:userUUID')
  async onDashboardData(@Param('userUUID') userUUID: string) {
    return await this.appService.onDashboardData(userUUID);
  }
}
