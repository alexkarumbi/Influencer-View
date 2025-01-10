import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Get()
  async findAll() {
    return this.campaignsService.findAll();
  }
  
  @Get('performance/:influencerId')
  async getPerformanceMetrics(@Param('influencerId') influencerId: string) {
    return this.campaignsService.getPerformanceMetrics(influencerId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Get('influencer/:influencerId')
  async findByInfluencer(@Param('influencerId') influencerId: string) {
    return this.campaignsService.findByInfluencer(influencerId);
  }
  @Post(':id/submit')
async submitContent(
  @Param('id') id: string,
  @Body('submission') submission: string,
) {
  return this.campaignsService.submitContent(id, submission);
}

}
