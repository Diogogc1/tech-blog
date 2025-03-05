import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class notificationGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('notification')
  handleNotification(@MessageBody() data: string) {
    console.log(`Mensagem recebida de ${data}`)
  }

  sendNotification(message: string) {
    this.server.emit('notification', { message })
    console.log(`Mensagem enviada: ${message}`)
  }
}
