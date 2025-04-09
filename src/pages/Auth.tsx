
import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useLocation, Navigate } from 'react-router-dom';
import { useClerkContext } from '@/contexts/ClerkContext';

const Auth: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useClerkContext();
  const isSignUp = location.pathname === '/sign-up';

  // If the user is already authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="mx-auto flex w-full max-w-[1200px] flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left side - Product Info */}
          <div className="hidden flex-col justify-center space-y-6 p-4 lg:flex">
            <div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 rounded-md bg-brand-600 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">JobTrack</h1>
              </div>
              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                Organize Your Job Search, Optimize Your Career
              </h2>
            </div>
            <p className="text-lg text-gray-600">
              Track applications, prepare tailored resumes, and take control of your job hunt with
              our AI-powered assistant.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-brand-100 p-2 text-brand-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Track All Your Applications</h3>
                  <p className="text-gray-600">
                    Keep all your job applications organized in one place.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-brand-100 p-2 text-brand-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M7 15h0M2 9.5h20" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">AI Resume Assistant</h3>
                  <p className="text-gray-600">
                    Personalize your resume and cover letter for each application.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-brand-100 p-2 text-brand-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Analyze Your Progress</h3>
                  <p className="text-gray-600">
                    Get insights into your application success rate and status.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg sm:p-6 md:p-8">
            <div className="mb-6 w-full max-w-md">
              <div className="mb-2 text-center lg:hidden">
                <div className="mb-2 flex justify-center">
                  <div className="rounded-md bg-brand-600 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">JobTrack</h1>
                <p className="mt-1 text-gray-600">
                  {isSignUp ? 'Create your account' : 'Sign in to your account'}
                </p>
              </div>

              {isSignUp ? (
                <SignUp
                  routing="path"
                  path="/sign-up"
                  signInUrl="/sign-in"
                  afterSignUpUrl="/"
                />
              ) : (
                <SignIn
                  routing="path"
                  path="/sign-in"
                  signUpUrl="/sign-up"
                  afterSignInUrl="/"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
