import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Application } from '@/components/Dashboard/RecentApplications';

const Analytics: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
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

  useEffect(() => {
    // Load applications from localStorage
    const savedApplications = localStorage.getItem('applications');
    if (savedApplications) {
      const parsedApplications = JSON.parse(savedApplications);
      setApplications(parsedApplications);
      calculateMetrics(parsedApplications);
    }
  }, []);

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
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Prepare data for charts
  const applicationData = applications.reduce((acc, app) => {
    const date = new Date(app.dateApplied);
    const month = date.toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(item => item.month === month);
    
    if (existingMonth) {
      existingMonth.applications++;
      if (app.status === 'interviewing') existingMonth.interviews++;
    } else {
      acc.push({
        month,
        applications: 1,
        interviews: app.status === 'interviewing' ? 1 : 0
      });
    }
    
    return acc;
  }, [] as { month: string; applications: number; interviews: number }[]);

  const statusData = [
    { status: 'Applied', count: applications.filter(app => app.status === 'applied').length },
    { status: 'Interview', count: applications.filter(app => app.status === 'interviewing').length },
    { status: 'Offer', count: applications.filter(app => app.status === 'offer').length },
    { status: 'Rejected', count: applications.filter(app => app.status === 'rejected').length },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your job application progress and performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalApplications}</div>
            <p className="text-xs text-gray-500">
              {calculateChange(metrics.totalApplications, metrics.lastMonthMetrics.totalApplications) > 0 ? '+' : ''}
              {calculateChange(metrics.totalApplications, metrics.lastMonthMetrics.totalApplications).toFixed(0)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.inProgress}</div>
            <p className="text-xs text-gray-500">
              {calculateChange(metrics.inProgress, metrics.lastMonthMetrics.inProgress) > 0 ? '+' : ''}
              {calculateChange(metrics.inProgress, metrics.lastMonthMetrics.inProgress).toFixed(0)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.successRate.toFixed(1)}%</div>
            <p className="text-xs text-gray-500">
              {calculateChange(metrics.successRate, metrics.lastMonthMetrics.successRate) > 0 ? '+' : ''}
              {calculateChange(metrics.successRate, metrics.lastMonthMetrics.successRate).toFixed(0)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.rejectionRate.toFixed(1)}%</div>
            <p className="text-xs text-gray-500">
              {calculateChange(metrics.rejectionRate, metrics.lastMonthMetrics.rejectionRate) > 0 ? '+' : ''}
              {calculateChange(metrics.rejectionRate, metrics.lastMonthMetrics.rejectionRate).toFixed(0)}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Applications Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#8884d8" />
                  <Bar dataKey="interviews" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics; 