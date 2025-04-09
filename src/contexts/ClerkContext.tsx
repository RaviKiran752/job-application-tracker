
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';

type ClerkContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
};

const ClerkContext = createContext<ClerkContextType>({
  isAuthenticated: false,
  isLoading: true,
  userId: null,
});

export const useClerkContext = () => useContext(ClerkContext);

// Create a separate component for the internal consumer logic
const ClerkContextConsumerComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [contextValue, setContextValue] = useState<ClerkContextType>({
    isAuthenticated: false,
    isLoading: true,
    userId: null,
  });

  useEffect(() => {
    if (isLoaded) {
      setContextValue({
        isAuthenticated: !!isSignedIn,
        isLoading: false,
        userId: user?.id || null,
      });
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <ClerkContext.Provider value={contextValue}>
      {children}
    </ClerkContext.Provider>
  );
};

type ClerkContextProviderProps = {
  children: React.ReactNode;
  publishableKey: string;
};

export const ClerkContextProvider: React.FC<ClerkContextProviderProps> = ({ 
  children, 
  publishableKey 
}) => {
  if (!publishableKey) {
    throw new Error('Missing Clerk Publishable Key');
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkContextConsumerComponent>{children}</ClerkContextConsumerComponent>
    </ClerkProvider>
  );
};

export const AuthenticatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Authentication Required</h2>
              <p className="mt-2 text-gray-600">
                Please sign in to access this page
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href="/sign-in"
                className="rounded bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                Go to Login
              </a>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
};
