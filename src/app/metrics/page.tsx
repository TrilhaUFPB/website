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
      <iframe
        width="100%"
        height="1000"
        frameBorder="0"
        allowFullScreen
        src="https://us.posthog.com/embedded/gYL5gdFgD4WMZ4QWDKefCoh4TKUoxg"
        className="rounded-lg shadow-lg bg-white"
        title="PostHog Analytics Dashboard"
      />
    </div>
  );
} 