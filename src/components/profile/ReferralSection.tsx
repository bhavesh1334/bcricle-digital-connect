import React from 'react';
import { Share2, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ReferralSectionProps {
  referralCount: number;
  referralLink: string;
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ referralCount, referralLink }) => {
  const getBadgeLevel = (count: number) => {
    if (count >= 10) return { name: 'Platinum', color: 'bg-gradient-to-r from-purple-400 to-purple-600' };
    if (count >= 7) return { name: 'Gold', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600' };
    if (count >= 3) return { name: 'Silver', color: 'bg-gradient-to-r from-gray-300 to-gray-500' };
    return { name: 'Bronze', color: 'bg-gradient-to-r from-amber-700 to-amber-900' };
  };

  const badge = getBadgeLevel(referralCount);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Bcircle Digital Connect',
          text: 'Register your business on Bcircle Digital Connect!',
          url: referralLink
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Referrals</h3>
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <Users className="h-6 w-6 mx-auto mb-2 text-bcircle-blue" />
          <p className="text-2xl font-bold text-gray-900">{referralCount}</p>
          <p className="text-sm text-gray-600">Total Referrals</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <Award className="h-6 w-6 mx-auto mb-2 text-bcircle-blue" />
          <p className={`text-lg font-bold ${badge.color} text-white rounded-full py-1 px-3 inline-block`}>
            {badge.name}
          </p>
          <p className="text-sm text-gray-600">Current Badge</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">Your Referral Link</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
          />
          <Button
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              alert('Referral link copied!');
            }}
            variant="outline"
            size="sm"
          >
            Copy
          </Button>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t">
        <p className="text-sm font-medium text-gray-900">Badge Levels:</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2 bg-gradient-to-r from-gray-300 to-gray-500 text-white rounded text-center">
            3+ referrals: Silver
          </div>
          <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded text-center">
            7+ referrals: Gold
          </div>
          <div className="p-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded text-center">
            10+ referrals: Platinum
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReferralSection;
