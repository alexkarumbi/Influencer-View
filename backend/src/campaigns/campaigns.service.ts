import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const createdCampaign = new this.campaignModel(createCampaignDto);
    return createdCampaign.save();
  }
  
  async getPerformanceMetrics(influencerId: string) {
    const campaigns = await this.campaignModel.find({ influencerId }).exec();
    const totalPosts = campaigns.reduce((sum, campaign) => sum + campaign.totalPosts, 0);
    const engagementEstimates = campaigns.map(campaign => ({
      campaignId: campaign._id,
      estimatedEngagement: campaign.totalPosts * 100, // Example calculation
    }));

    return {
      totalPosts,
      engagementEstimates,
    };
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignModel.find().exec();
  }

  async findOne(id: string): Promise<Campaign> {
    return this.campaignModel.findById(id).exec();
  }

  async findByInfluencer(influencerId: string): Promise<Campaign[]> {
    return this.campaignModel.find({ influencerId }).exec();
  }
  async submitContent(id: string, submission: string): Promise<Campaign> {
    const campaign = await this.campaignModel.findById(id);
    
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
  
    campaign.submissions.push(submission);
    campaign.totalPosts = campaign.submissions.length;
    
    return campaign.save();
  }
}