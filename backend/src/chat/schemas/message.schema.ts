import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ required: true })
  username: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
