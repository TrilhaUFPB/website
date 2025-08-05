"use client";

import { useEffect, useState } from "react";

export default function MetricsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after a short delay to allow iframe to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Real-time insights from PostHog</p>
            </div>
            <div className="text-sm text-gray-500">
              Powered by PostHog
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        )}
        
        <div className={`${isLoading ? 'hidden' : 'block'}`}>
          <iframe
            width="100%"
            height="800"
            frameBorder="0"
            allowFullScreen
            src="https://us.posthog.com/embedded/gYL5gdFgD4WMZ4QWDKefCoh4TKUoxg"
            className="rounded-lg shadow-lg bg-white"
            title="PostHog Analytics Dashboard"
          />
        </div>
      </div>
    </div>
  );
} 