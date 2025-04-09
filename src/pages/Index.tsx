
import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useClerkContext } from '@/contexts/ClerkContext';

const Index: React.FC = () => {
  const { isAuthenticated, isLoading } = useClerkContext();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  
  return <Dashboard />;
};

export default Index;
