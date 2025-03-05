import { Module } from '@nestjs/common'
import { notificationGateway } from './notification-gateway'

@Module({
  providers: [notificationGateway],
})
export class GatewayModule {}
