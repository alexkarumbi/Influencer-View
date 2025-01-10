// filepath: frontend/src/components/PerformanceSnapshot.tsx
import React, { useEffect, useState } from 'react';
import { fetchPerformanceMetrics } from '../utils/api';

interface PerformanceMetrics {
  totalPosts: number;
  engagementEstimates: { campaignId: string; estimatedEngagement: number }[];
}

const PerformanceSnapshot: React.FC<{ influencerId: string }> = ({ influencerId }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchPerformanceMetrics(influencerId);
        setMetrics(data);
      } catch (err) {
        setError('Failed to load performance metrics');
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [influencerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Performance Snapshot</h2>
      <p>Total Posts: {metrics?.totalPosts}</p>
      <ul>
        {metrics?.engagementEstimates.map((estimate) => (
          <li key={estimate.campaignId}>
            Campaign {estimate.campaignId}: {estimate.estimatedEngagement} estimated engagements
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceSnapshot;