// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ChatGateway } from './chat.gateway';
// import { ChatService } from './chat.service';
// import { Message, MessageSchema } from './schemas/message.schema';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [
//     JwtModule.register({}),
//     MongooseModule.forFeature([
//       { name: Message.name, schema: MessageSchema },
//     ]),
//   ],
//   providers: [ChatGateway, ChatService],
// })
// export class ChatModule {}





import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Message, MessageSchema } from './schemas/message.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
    ]),
    AuthModule, // ✅ provides JwtService with secret
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
