"use client";

import { ReactNode, useEffect, useState } from "react";

interface FeatureGateProps {
  feature: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureGate({ feature, children, fallback }: FeatureGateProps) {
  const [FeatureProtect, setFeatureProtect] = useState<any>(null);

  useEffect(() => {
    const loadFeatureProtect = async () => {
      try {
        const { FeatureProtect: Component } = await import("@runonatlas/next/client");
        setFeatureProtect(() => Component);
      } catch (error) {
        console.error("Failed to load FeatureProtect:", error);
      }
    };
    
    if (typeof window !== "undefined") {
      loadFeatureProtect();
    }
  }, []);

  const defaultFallback = (
    <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center">
      <div className="text-gray-500 mb-2">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 14v20c0 4.418-7.163 8-16 8S0 38.418 0 34V14"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Feature Not Available
      </h3>
      <p className="text-gray-600">
        This feature requires a higher subscription tier.
      </p>
      <button className="mt-4 px-4 py-2 bg-atlas-600 text-white rounded-lg hover:bg-atlas-700 transition-colors">
        Upgrade Plan
      </button>
    </div>
  );

  if (!FeatureProtect) {
    return <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>;
  }

  return (
    <FeatureProtect features={[feature]} disallowedFallback={fallback || defaultFallback}>
      {children}
    </FeatureProtect>
  );
}