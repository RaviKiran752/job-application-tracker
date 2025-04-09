
import React from 'react';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  change?: number;
  className?: string;
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  change,
  className,
}) => {
  return (
    <div className={cn("rounded-lg border bg-white p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="rounded-md bg-gray-50 p-1.5">{icon}</div>
      </div>
      
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
        
        {change !== undefined && (
          <span className={cn(
            "ml-2 text-sm",
            change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-500"
          )}>
            {change > 0 ? "+" : ""}{change}%
          </span>
        )}
      </div>
      
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default StatsCard;
