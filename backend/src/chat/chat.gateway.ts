import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';


@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}


  async handleConnection(client: Socket) {
  try {
    const token = client.handshake.auth?.token;

    if (!token) {
      console.log("❌ No token provided");
      client.disconnect();
      return;
    }

    const payload = this.jwtService.verify(token);

    client.data.user = {
      id: payload.sub,
      username: payload.username,
    };

    console.log("✅ Socket authenticated:", client.data.user);
  } catch (err) {
    console.error("❌ Socket auth failed:", err.message);
    client.disconnect();
  }
}


  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    @MessageBody() text: string,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;

    if (!user?.id) {
      console.error("❌ Missing user in socket");
      return;
    }

    const message = await this.chatService.create(
      text,
      user.id,
      user.username,
    );

    this.server.emit("newMessage", message);
  }


  @SubscribeMessage('getMessages')
  async handleGetMessages(@ConnectedSocket() client: Socket) {
    const messages = await this.chatService.findAll();
    client.emit('getMessages', messages);
  }
}
