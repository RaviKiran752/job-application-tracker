
import React from 'react';
import { Calendar, ExternalLink, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Application } from '@/components/Dashboard/RecentApplications';

type ApplicationCardProps = {
  application: Application;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
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

const ApplicationCard: React.FC<ApplicationCardProps> = ({ 
  application, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
              {application.logo ? (
                <img 
                  src={application.logo} 
                  alt={application.company} 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <span className="text-xl font-medium text-gray-600">
                  {application.company.charAt(0)}
                </span>
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">{application.position}</h3>
              <p className="text-sm text-gray-500">{application.company}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(application.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(application.id)}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[application.status]}`}>
              {statusLabels[application.status]}
            </span>
            
            <div className="ml-2 flex items-center text-xs text-gray-500">
              <Calendar className="mr-1 h-3 w-3" />
              {formatDistanceToNow(application.dateApplied, { addSuffix: true })}
            </div>
          </div>
          
          {application.link && (
            <a
              href={application.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-brand-600 hover:text-brand-500"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              View Job
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
