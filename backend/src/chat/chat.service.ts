import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  async create(text: string, userId: string, username: string) {
    console.log("CREATE MESSAGE CALLED:", { text, userId, username });
    
    return this.messageModel.create({
      text,
      sender: userId,
      username,
    });
  }

  async findAll() {
    return this.messageModel.find().sort({ createdAt: 1 });
  }

  async update(messageId: string, userId: string, text: string) {
    const msg = await this.messageModel.findById(messageId);

    if (!msg) return null;
    if (msg.sender.toString() !== userId)
      throw new ForbiddenException("You can't edit this message");

    msg.text = text;
    return msg.save();
  }

  async delete(messageId: string, userId: string) {
    const msg = await this.messageModel.findById(messageId);

    if (!msg) return null;
    if (msg.sender.toString() !== userId)
      throw new ForbiddenException("You can't delete this message");

    await msg.deleteOne();
    return messageId;
  }
}
