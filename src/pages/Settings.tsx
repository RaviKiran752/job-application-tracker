import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = React.useState(true);
  const [email, setEmail] = React.useState('user@example.com');
  const [name, setName] = React.useState('John Doe');

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500">
                Receive email notifications about your applications
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="h-24">
                Light
              </Button>
              <Button variant="outline" className="h-24">
                Dark
              </Button>
              <Button variant="outline" className="h-24">
                System
              </Button>
            </div>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings; 