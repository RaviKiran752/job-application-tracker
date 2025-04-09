import React from 'react';
import { Upload, FileText, MessageSquarePlus } from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ResumeAssistant: React.FC = () => {
  const { toast } = useToast();
  const [resumeText, setResumeText] = React.useState('');
  const [jobDescription, setJobDescription] = React.useState('');
  const [analyzing, setAnalyzing] = React.useState(false);
  const [generating, setGenerating] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState('');
  const [coverLetter, setCoverLetter] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleResumeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && 
          file.type !== 'application/msword' && 
          file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text);
        toast({
          title: "Resume uploaded",
          description: "Your resume has been uploaded successfully.",
        });
      };
      reader.readAsText(file);
    }
  };

  const analyzeResume = () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: "Missing information",
        description: "Please provide both your resume and the job description.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);

    setTimeout(() => {
      setAnalysisResult(
        "# Resume Analysis\n\n" +
        "## Key Matches\n" +
        "- Strong match: **React.js development** - Your 3 years of experience aligns well\n" +
        "- Good match: **TypeScript expertise** - Your projects demonstrate proficiency\n" +
        "- Match: **API integration experience** - Your work with RESTful APIs is relevant\n\n" +
        "## Missing Skills\n" +
        "- **GraphQL** - Consider highlighting any GraphQL experience or learning basics\n" +
        "- **CI/CD pipelines** - Add details about any experience with automated deployment\n" +
        "- **Next.js** - Emphasize any Next.js projects or familiarity\n\n" +
        "## Recommendations\n" +
        "1. Add specific metrics about impact of your React projects\n" +
        "2. Highlight TypeScript usage in more prominent position\n" +
        "3. Include examples of responsive design implementation\n" +
        "4. Remove outdated jQuery experience to focus on modern skills\n"
      );
      setAnalyzing(false);
    }, 2000);
  };

  const generateCoverLetter = () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: "Missing information",
        description: "Please provide both your resume and the job description.",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      setCoverLetter(
        "Dear Hiring Manager,\n\n" +
        "I am writing to express my interest in the Frontend Developer position at TechCorp. With over three years of experience in React.js development and a passion for creating intuitive user interfaces, I believe I would be a valuable addition to your team.\n\n" +
        "My background in developing responsive web applications aligns well with your requirements. In my current role at WebSolutions, I've implemented TypeScript across our frontend projects, resulting in a 35% reduction in type-related bugs. I've also integrated various RESTful APIs and optimized component performance, improving load times by 40%.\n\n" +
        "I'm particularly excited about TechCorp's focus on innovative digital products. Your company's commitment to using cutting-edge technologies like React and TypeScript resonates with my own professional values and aspirations.\n\n" +
        "While I have extensive experience with React, I'm continuously expanding my skill set. I've recently been learning GraphQL and have started implementing it in side projects, which I see could be valuable for your team.\n\n" +
        "I would welcome the opportunity to discuss how my background, technical skills, and enthusiasm could benefit TechCorp. Thank you for considering my application.\n\n" +
        "Sincerely,\n" +
        "[Your Name]"
      );
      setGenerating(false);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Resume Assistant</h1>
        <p className="text-gray-600">
          Optimize your resume and generate tailored cover letters for job applications
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-gray-900">Your Resume</h2>
            <p className="mb-4 text-sm text-gray-600">
              Paste your resume content below or upload a file
            </p>
            
            <div className="mb-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>
            </div>
            
            <Textarea
              placeholder="Paste your resume text here..."
              className="min-h-[200px]"
              value={resumeText}
              onChange={handleResumeChange}
            />
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-gray-900">Job Description</h2>
            <p className="mb-4 text-sm text-gray-600">
              Paste the job description you're applying for
            </p>
            
            <Textarea
              placeholder="Paste the job description here..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
            />
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={analyzeResume} 
              disabled={analyzing || !resumeText || !jobDescription}
              className="flex-1"
            >
              {analyzing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>
            
            <Button 
              onClick={generateCoverLetter} 
              disabled={generating || !resumeText || !jobDescription}
              className="flex-1"
            >
              {generating ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Generating...
                </>
              ) : (
                <>
                  <MessageSquarePlus className="mr-2 h-4 w-4" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </div>
        </div>

        <div>
          <Tabs defaultValue="analysis" className="rounded-lg border bg-white shadow-sm">
            <TabsList className="w-full border-b">
              <TabsTrigger value="analysis" className="flex-1">Resume Analysis</TabsTrigger>
              <TabsTrigger value="coverLetter" className="flex-1">Cover Letter</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analysis" className="p-6">
              {analysisResult ? (
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: analysisResult.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/# (.*?)$/gm, '<h1>$1</h1>')
                      .replace(/## (.*?)$/gm, '<h2>$1</h2>')
                      .replace(/\n/g, '<br>')
                  }} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
                  <FileText className="h-16 w-16 text-gray-300" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">No Analysis Yet</h3>
                    <p className="mt-1 text-gray-500">
                      Enter your resume and a job description, then click "Analyze Resume"
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="coverLetter" className="p-6">
              {coverLetter ? (
                <div>
                  <div className="mb-4 whitespace-pre-wrap font-serif text-gray-900">
                    {coverLetter}
                  </div>
                  <Button className="mt-4">
                    Copy to Clipboard
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
                  <MessageSquarePlus className="h-16 w-16 text-gray-300" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">No Cover Letter Yet</h3>
                    <p className="mt-1 text-gray-500">
                      Enter your resume and a job description, then click "Generate Cover Letter"
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeAssistant;
