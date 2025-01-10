'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Campaign } from '@/types';
import { fetchCampaignDetails, submitContent } from '@/utils/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import PerformanceSnapshot from '@/components/PerformanceSnapshot';

export default function CampaignDetailsPage() {
  const params = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentLink, setContentLink] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    loadCampaign();
  }, [params.id]);

  const loadCampaign = async () => {
    try {
      const data = await fetchCampaignDetails(params.id as string);
      setCampaign(data);
    } catch (err) {
      setError('Failed to load campaign details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentLink.trim()) {
      setSubmitMessage({ type: 'error', text: 'Please enter a content link' });
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const updatedCampaign = await submitContent(params.id as string, contentLink);
      setCampaign(updatedCampaign);
      setContentLink('');
      setSubmitMessage({ type: 'success', text: 'Content submitted successfully!' });
    } catch (err) {
      setSubmitMessage({ type: 'error', text: 'Failed to submit content' });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!campaign) return <div className="p-4">Campaign not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Campaign Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
          <p className="text-gray-600 mb-4">{campaign.description}</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
            <span>Status: {campaign.status}</span>
          </div>
        </div>

        {/* Submission Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Submit Content</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={contentLink}
                onChange={(e) => setContentLink(e.target.value)}
                placeholder="Enter your content link (e.g., TikTok video URL)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={submitting}
              />
            </div>
            
            {submitMessage && (
              <div className={`p-3 rounded-lg ${
                submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {submitMessage.text}
              </div>
            )}
            <PerformanceSnapshot influencerId="123" />

            <button
              type="submit"
              disabled={submitting}
              className={`w-full p-3 rounded-lg text-white font-medium
                ${submitting 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              {submitting ? 'Submitting...' : 'Submit Content'}
            </button>
          </form>
        </div>

        {/* Previous Submissions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Previous Submissions</h2>
          {campaign.submissions.length > 0 ? (
            <ul className="space-y-3">
              {campaign.submissions.map((submission, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <a 
                    href={submission}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {submission}
                  </a>
                  <span className="text-sm text-gray-500">
                    Submission #{campaign.submissions.length - index}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No submissions yet</p>
          )}
        </div>
      </div>
    </div>
  );
}