
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mb-8 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
