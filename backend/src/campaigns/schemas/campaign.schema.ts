import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ required: true, enum: ['active', 'pending', 'completed'] })
  status: string;

  @Prop({ type: [{ type: String }] })
  submissions: string[];

  @Prop({ required: true })
  influencerId: string;

  @Prop({ type: Number, default: 0 })
  totalPosts: number;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);