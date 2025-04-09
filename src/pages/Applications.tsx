import React, { useState, useEffect } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ApplicationCard from '@/components/Applications/ApplicationCard';
import StatusFilter from '@/components/Applications/StatusFilter';
import ApplicationForm from '@/components/Applications/ApplicationForm';
import { Button } from '@/components/ui/button';
import { Application } from '@/components/Dashboard/RecentApplications';
import { useToast } from '@/hooks/use-toast';

// Mock data for initial applications
const initialApplications: Application[] = [
  {
    id: '1',
    company: 'Acme Inc',
    position: 'Frontend Developer',
    status: 'interviewing',
    dateApplied: new Date('2023-04-05'),
    link: 'https://example.com',
  },
  {
    id: '2',
    company: 'TechCorp',
    position: 'Full Stack Engineer',
    status: 'applied',
    dateApplied: new Date('2023-03-28'),
  },
  {
    id: '3',
    company: 'Startup Co',
    position: 'React Developer',
    status: 'offer',
    dateApplied: new Date('2023-04-01'),
    link: 'https://example.com',
  },
  {
    id: '4',
    company: 'BigTech',
    position: 'Software Engineer',
    status: 'saved',
    dateApplied: new Date('2023-04-07'),
  },
  {
    id: '5',
    company: 'Digital Agency',
    position: 'UI Developer',
    status: 'rejected',
    dateApplied: new Date('2023-03-15'),
  },
  {
    id: '6',
    company: 'Fintech Inc',
    position: 'JavaScript Developer',
    status: 'applied',
    dateApplied: new Date('2023-04-02'),
  },
];

type Status = 'all' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'saved';

const Applications: React.FC = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>(() => {
    // Load applications from localStorage or use initial data
    const savedApplications = localStorage.getItem('applications');
    return savedApplications ? JSON.parse(savedApplications) : initialApplications;
  });
  const [filteredApplications, setFilteredApplications] = useState<Application[]>(applications);
  const [selectedStatus, setSelectedStatus] = useState<Status>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editApplication, setEditApplication] = useState<Application | null>(null);

  // Save applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  // Calculate counts for each status
  const statusCounts = applications.reduce(
    (counts, app) => {
      counts[app.status] = (counts[app.status] || 0) + 1;
      counts.all = (counts.all || 0) + 1;
      return counts;
    },
    {} as Record<Status, number>
  );

  // Filter applications based on selected status and search query
  useEffect(() => {
    let filtered = applications;
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((app) => app.status === selectedStatus);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.company.toLowerCase().includes(query) ||
          app.position.toLowerCase().includes(query)
      );
    }
    
    setFilteredApplications(filtered);
  }, [applications, selectedStatus, searchQuery]);

  // Handle status filter change
  const handleStatusChange = (status: Status) => {
    setSelectedStatus(status);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle application form submission
  const handleApplicationSubmit = (values: any) => {
    if (editApplication) {
      // Update existing application
      const updatedApplications = applications.map((app) =>
        app.id === editApplication.id
          ? { ...app, ...values, dateApplied: new Date() }
          : app
      );
      setApplications(updatedApplications);
      toast({
        title: "Application updated",
        description: "Your job application has been updated successfully.",
      });
    } else {
      // Add new application
      const newApplication: Application = {
        id: Date.now().toString(),
        company: values.company,
        position: values.position,
        status: values.status,
        link: values.link,
        dateApplied: new Date(),
      };
      setApplications([newApplication, ...applications]);
      toast({
        title: "Application added",
        description: "Your job application has been added successfully.",
      });
    }
    
    setEditApplication(null);
    setFormOpen(false);
  };

  // Handle application edit
  const handleEditApplication = (id: string) => {
    const application = applications.find((app) => app.id === id);
    if (application) {
      setEditApplication(application);
      setFormOpen(true);
    }
  };

  // Handle application delete
  const handleDeleteApplication = (id: string) => {
    const updatedApplications = applications.filter((app) => app.id !== id);
    setApplications(updatedApplications);
    toast({
      title: "Application deleted",
      description: "Your job application has been deleted.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600">Manage and track your job applications</p>
        </div>
        <Button
          onClick={() => {
            setEditApplication(null);
            setFormOpen(true);
          }}
          className="mt-4 sm:mt-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Application
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <StatusFilter
          selectedStatus={selectedStatus}
          onChange={handleStatusChange}
          counts={statusCounts}
        />

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredApplications.length === 0 ? (
          <div className="col-span-full rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
            <p className="mt-2 text-gray-500">
              {searchQuery || selectedStatus !== 'all'
                ? 'Try changing your search or filter criteria'
                : 'Add your first job application to get started'}
            </p>
            {!searchQuery && selectedStatus === 'all' && (
              <Button
                onClick={() => {
                  setEditApplication(null);
                  setFormOpen(true);
                }}
                className="mt-4"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Application
              </Button>
            )}
          </div>
        ) : (
          filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onEdit={handleEditApplication}
              onDelete={handleDeleteApplication}
            />
          ))
        )}
      </div>

      {/* Application Form Dialog */}
      <ApplicationForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleApplicationSubmit}
        initialValues={editApplication || undefined}
        title={editApplication ? 'Edit Application' : 'Add New Application'}
      />
    </DashboardLayout>
  );
};

export default Applications;
