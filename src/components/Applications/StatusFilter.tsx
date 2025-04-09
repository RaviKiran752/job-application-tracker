
import React from 'react';
import { cn } from '@/lib/utils';

type Status = 'all' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'saved';

type StatusFilterProps = {
  selectedStatus: Status;
  onChange: (status: Status) => void;
  counts: Record<Status, number>;
};

const statuses: { value: Status; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'applied', label: 'Applied' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'saved', label: 'Saved' },
];

const statusColors = {
  all: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  applied: 'bg-status-applied/10 text-status-applied hover:bg-status-applied/20',
  interviewing: 'bg-status-interviewing/10 text-status-interviewing hover:bg-status-interviewing/20',
  offer: 'bg-status-offer/10 text-status-offer hover:bg-status-offer/20',
  rejected: 'bg-status-rejected/10 text-status-rejected hover:bg-status-rejected/20',
  saved: 'bg-status-saved/10 text-status-saved hover:bg-status-saved/20',
};

const StatusFilter: React.FC<StatusFilterProps> = ({ 
  selectedStatus, 
  onChange,
  counts, 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => onChange(status.value)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            statusColors[status.value],
            selectedStatus === status.value && "ring-2 ring-offset-1",
            selectedStatus === status.value && status.value === 'all' 
              ? "ring-gray-400" 
              : selectedStatus === status.value 
                ? `ring-status-${status.value}` 
                : ""
          )}
        >
          {status.label}
          <span className="ml-1 text-xs">({counts[status.value] || 0})</span>
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
