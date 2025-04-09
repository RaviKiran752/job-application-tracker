
import React from 'react';
import { Calendar, CheckCircle, Clock, MapPin, MessageCircle, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export type Activity = {
  id: string;
  type: 'application' | 'interview' | 'offer' | 'rejection' | 'followup' | 'note';
  title: string;
  description?: string;
  date: Date;
  company: string;
  position: string;
};

type ActivityTimelineProps = {
  activities: Activity[];
};

const activityIcons = {
  application: <CheckCircle className="h-5 w-5 text-brand-500" />,
  interview: <Calendar className="h-5 w-5 text-blue-500" />,
  offer: <CheckCircle className="h-5 w-5 text-green-500" />,
  rejection: <Clock className="h-5 w-5 text-red-500" />,
  followup: <MessageCircle className="h-5 w-5 text-amber-500" />,
  note: <MapPin className="h-5 w-5 text-purple-500" />,
};

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  if (!activities.length) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-medium text-gray-900">Recent Activity</h3>
        <div className="text-center text-gray-500 py-8">
          No recent activity found.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h3 className="text-sm font-medium text-gray-700">Recent Activity</h3>
      </div>

      <div className="p-4">
        <ol className="relative border-l border-gray-200">
          {activities.map((activity, idx) => (
            <li key={activity.id} className={cn("ml-6 pb-5", idx === activities.length - 1 && "pb-0")}>
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
                {activityIcons[activity.type]}
              </span>
              
              <div className="ml-2">
                <h4 className="text-sm font-semibold text-gray-900">{activity.title}</h4>
                
                <div className="mb-1 mt-1 flex items-center text-xs text-gray-500">
                  <span className="font-medium text-gray-600">{activity.position}</span>
                  <span className="mx-1.5">at</span>
                  <span className="font-medium text-gray-600">{activity.company}</span>
                </div>
                
                {activity.description && (
                  <p className="mb-2 text-sm text-gray-600">{activity.description}</p>
                )}
                
                <time className="text-xs text-gray-500">
                  {formatDistanceToNow(activity.date, { addSuffix: true })}
                </time>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ActivityTimeline;
