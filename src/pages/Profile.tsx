import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Trash2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { toast } = useToast();
  const [resumes, setResumes] = React.useState([
    { id: 1, name: 'Software Engineer Resume.pdf', date: '2024-04-01' },
    { id: 2, name: 'Frontend Developer Resume.pdf', date: '2024-03-15' },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumes([
        ...resumes,
        {
          id: resumes.length + 1,
          name: file.name,
          date: new Date().toISOString().split('T')[0],
        },
      ]);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully.",
      });
    }
  };

  const handleDeleteResume = (id: number) => {
    setResumes(resumes.filter(resume => resume.id !== id));
    toast({
      title: "Resume deleted",
      description: "The resume has been deleted successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your profile information and resumes</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue="Experienced software engineer with a passion for building scalable web applications."
                className="min-h-[100px]"
              />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-600">Upload Resume</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <div className="space-y-2">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{resume.name}</p>
                    <p className="text-sm text-gray-500">Uploaded on {resume.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteResume(resume.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile; 