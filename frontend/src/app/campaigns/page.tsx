'use client';

import { useEffect, useState } from 'react';
import { Campaign } from '@/types';
import { fetchCampaigns } from '@/utils/api';
import CampaignCard from '@/components/CampaignCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        // Using a hardcoded influencerId for demo purposes
        const data = await fetchCampaigns('123');
        setCampaigns(data);
      } catch (err) {
        setError('Failed to load campaigns');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Campaigns</h1>
        <div className="text-gray-600">
          Total Campaigns: {campaigns.length}
        </div>
      </div>
      
      {campaigns.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No campaigns found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}