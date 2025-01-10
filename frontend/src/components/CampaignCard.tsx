import Link from 'next/link';
import { Campaign } from '@/types';

interface Props {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{campaign.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          campaign.status === 'active' ? 'bg-green-100 text-green-800' :
          campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {campaign.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Deadline: {new Date(campaign.deadline).toLocaleDateString()}
        </span>
        <Link
          href={`/campaigns/${campaign._id}`}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
