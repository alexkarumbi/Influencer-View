export interface Campaign {
    _id: string;
    title: string;
    description: string;
    deadline: Date;
    status: string;
    submissions: string[];
    influencerId: string;
    totalPosts: number;
  }
  
  export interface PerformanceMetrics {
    totalPosts: number;
    engagementEstimates: { campaignId: string; estimatedEngagement: number }[];
  }