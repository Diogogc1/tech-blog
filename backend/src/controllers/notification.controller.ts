import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import NotificationPayload from 'src/dtos/payload/notification.payload';
import NotificationResponse from 'src/dtos/response/notification.response';
import { NotificationService } from 'src/services/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiBody({ type: NotificationPayload })
  create(@Body() notificationPayload: NotificationPayload): Promise<NotificationResponse> {
    return this.notificationService.create(notificationPayload);
  }

  @Get()
  getAll(): Promise<NotificationResponse[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<NotificationResponse> {
    return this.notificationService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() notificationPayload: NotificationPayload,
  ): Promise<number> {
    return this.notificationService.update(Number(id), notificationPayload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.notificationService.delete(Number(id));
  }
}