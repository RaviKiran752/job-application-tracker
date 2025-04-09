import React, { useState, useEffect } from 'react';
import {
  BriefcaseBusiness,
  CheckCircle,
  Clock,
  RefreshCw,
  XCircle,
  Search,
} from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import StatusChart from '@/components/Dashboard/StatusChart';
import { 
  Application,
  default as RecentApplications 
} from '@/components/Dashboard/RecentApplications';
import {
  Activity,
  default as ActivityTimeline
} from '@/components/Dashboard/ActivityTimeline';

const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    inProgress: 0,
    successRate: 0,
    rejectionRate: 0,
    lastMonthMetrics: {
      totalApplications: 0,
      inProgress: 0,
      successRate: 0,
      rejectionRate: 0,
    }
  });

  // Load applications from localStorage
  useEffect(() => {
    const savedApplications = localStorage.getItem('applications');
    if (savedApplications) {
      const parsedApplications = JSON.parse(savedApplications);
      setApplications(parsedApplications);
      setFilteredApplications(parsedApplications);
      calculateMetrics(parsedApplications);
    }
  }, []);

  // Update filtered applications when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredApplications(applications);
      calculateMetrics(applications);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = applications.filter(app => {
        const companyMatch = app.company.toLowerCase().includes(query);
        const positionMatch = app.position.toLowerCase().includes(query);
        const statusMatch = app.status.toLowerCase().includes(query);
        return companyMatch || positionMatch || statusMatch;
      });
      setFilteredApplications(filtered);
      calculateMetrics(filtered);
    }
  }, [searchQuery, applications]);

  const calculateMetrics = (apps: Application[]) => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    // Filter applications from last month
    const lastMonthApps = apps.filter(app => {
      const appDate = new Date(app.dateApplied);
      return appDate >= lastMonth && appDate < now;
    });

    // Calculate current metrics
    const totalApplications = apps.length;
    const inProgress = apps.filter(app => 
      app.status === 'applied' || app.status === 'interviewing'
    ).length;
    const offers = apps.filter(app => app.status === 'offer').length;
    const rejections = apps.filter(app => app.status === 'rejected').length;
    
    const successRate = totalApplications > 0 ? (offers / totalApplications) * 100 : 0;
    const rejectionRate = totalApplications > 0 ? (rejections / totalApplications) * 100 : 0;

    // Calculate last month's metrics
    const lastMonthTotal = lastMonthApps.length;
    const lastMonthInProgress = lastMonthApps.filter(app => 
      app.status === 'applied' || app.status === 'interviewing'
    ).length;
    const lastMonthOffers = lastMonthApps.filter(app => app.status === 'offer').length;
    const lastMonthRejections = lastMonthApps.filter(app => app.status === 'rejected').length;
    
    const lastMonthSuccessRate = lastMonthTotal > 0 ? (lastMonthOffers / lastMonthTotal) * 100 : 0;
    const lastMonthRejectionRate = lastMonthTotal > 0 ? (lastMonthRejections / lastMonthTotal) * 100 : 0;

    setMetrics({
      totalApplications,
      inProgress,
      successRate,
      rejectionRate,
      lastMonthMetrics: {
        totalApplications: lastMonthTotal,
        inProgress: lastMonthInProgress,
        successRate: lastMonthSuccessRate,
        rejectionRate: lastMonthRejectionRate,
      }
    });
  };

  // Calculate percentage change
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return ((current - previous) / previous) * 100;
  };

  // Prepare data for the status chart
  const statusData = [
    { name: 'Applied', value: filteredApplications.filter(app => app.status === 'applied').length, color: '#4c51bf' },
    { name: 'Interviewing', value: filteredApplications.filter(app => app.status === 'interviewing').length, color: '#0891b2' },
    { name: 'Offer', value: filteredApplications.filter(app => app.status === 'offer').length, color: '#16a34a' },
    { name: 'Rejected', value: filteredApplications.filter(app => app.status === 'rejected').length, color: '#dc2626' },
    { name: 'Saved', value: filteredApplications.filter(app => app.status === 'saved').length, color: '#d97706' },
  ];

  // Generate activities from applications
  const activities: Activity[] = filteredApplications
    .filter(app => app.status === 'interviewing')
    .map(app => ({
      id: app.id,
      type: 'interview',
      title: 'Interview Scheduled',
      description: `Interview for ${app.position} position`,
      date: new Date(app.dateApplied),
      company: app.company,
      position: app.position,
    }));

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your job application tracker</p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search by company, position, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Applications"
          value={metrics.totalApplications}
          icon={<BriefcaseBusiness className="h-5 w-5 text-gray-500" />}
          change={calculateChange(metrics.totalApplications, metrics.lastMonthMetrics.totalApplications)}
        />
        <StatsCard
          title="In Progress"
          value={metrics.inProgress}
          icon={<RefreshCw className="h-5 w-5 text-brand-500" />}
          description="Applied or interviewing"
          change={calculateChange(metrics.inProgress, metrics.lastMonthMetrics.inProgress)}
        />
        <StatsCard
          title="Success Rate"
          value={`${metrics.successRate.toFixed(1)}%`}
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          change={calculateChange(metrics.successRate, metrics.lastMonthMetrics.successRate)}
        />
        <StatsCard
          title="Rejection Rate"
          value={`${metrics.rejectionRate.toFixed(1)}%`}
          icon={<XCircle className="h-5 w-5 text-red-500" />}
          change={calculateChange(metrics.rejectionRate, metrics.lastMonthMetrics.rejectionRate)}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          <RecentApplications applications={filteredApplications.slice(0, 5)} />
          <ActivityTimeline activities={activities} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <h3 className="text-sm font-medium text-gray-700">Applications by Status</h3>
            </div>
            <StatusChart data={statusData} />
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-medium text-gray-700">Upcoming Interviews</h3>
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map(activity => (
                  <div key={activity.id} className="rounded-md border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.date.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No upcoming interviews</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
