
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ClerkContextProvider } from './contexts/ClerkContext';

// Clerk publishable key
const PUBLISHABLE_KEY = "pk_test_YW11c2VkLWFhcmR2YXJrLTk4LmNsZXJrLmFjY291bnRzLmRldiQ";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkContextProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkContextProvider>
  </React.StrictMode>
);
