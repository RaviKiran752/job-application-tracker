
import React from 'react';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

export type Application = {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected' | 'saved';
  dateApplied: Date;
  logo?: string;
  link?: string;
};

type RecentApplicationsProps = {
  applications: Application[];
};

const statusColors = {
  applied: 'bg-status-applied text-white',
  interviewing: 'bg-status-interviewing text-white',
  offer: 'bg-status-offer text-white',
  rejected: 'bg-status-rejected text-white',
  saved: 'bg-status-saved text-white',
};

const statusLabels = {
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
  saved: 'Saved',
};

const RecentApplications: React.FC<RecentApplicationsProps> = ({ applications }) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h3 className="text-sm font-medium text-gray-700">Recent Applications</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {applications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No applications found. Start tracking your job applications!
          </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                    {app.logo ? (
                      <img src={app.logo} alt={app.company} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-lg font-medium text-gray-600">{app.company.charAt(0)}</span>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">{app.position}</h4>
                    <p className="text-sm text-gray-500">{app.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[app.status]}`}>
                    {statusLabels[app.status]}
                  </span>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {formatDistanceToNow(app.dateApplied, { addSuffix: true })}
                  </div>
                  
                  {app.link && (
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8 text-gray-400 hover:text-gray-500"
                    >
                      <a href={app.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open job link</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {applications.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
          <a
            href="/applications"
            className="text-sm font-medium text-brand-600 hover:text-brand-500"
          >
            View all applications
          </a>
        </div>
      )}
    </div>
  );
};

export default RecentApplications;
