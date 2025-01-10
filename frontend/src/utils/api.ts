import { Campaign,PerformanceMetrics } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCampaigns = async (influencerId: string): Promise<Campaign[]> => {
  console.log('Fetching from:', `${API_URL}/campaigns/influencer/${influencerId}`);
  try {
    const response = await fetch(`${API_URL}/campaigns/influencer/${influencerId}`);
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
export const fetchPerformanceMetrics = async (influencerId: string): Promise<PerformanceMetrics> => {
  const response = await fetch(`${API_URL}/campaigns/performance/${influencerId}`);
  if (!response.ok) throw new Error('Failed to fetch performance metrics');
  return response.json();
};
export const fetchCampaignDetails = async (id: string): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`);
  if (!response.ok) throw new Error('Failed to fetch campaign details');
  return response.json();
};

export const submitContent = async (campaignId: string, contentLink: string): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${campaignId}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ submission: contentLink }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit content');
  }
  
  return response.json();
};
