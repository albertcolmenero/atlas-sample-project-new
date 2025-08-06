"use client";

import { useEffect, useState } from "react";

export function AtlasPricing() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [PricingComponent, setPricingComponent] = useState<any>(null);

  useEffect(() => {
    const loadPricingComponent = async () => {
      try {
        const { PricingComponent: Component } = await import("@runonatlas/next/client");
        setPricingComponent(() => Component);
      } catch (error) {
        console.error("Failed to load PricingComponent:", error);
      }
    };
    
    if (typeof window !== "undefined") {
      loadPricingComponent();
    }
  }, []);

  if (!PricingComponent) {
    return (
      <div className="w-full">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-atlas-900 mb-4">
            Atlas Pricing Demo
          </h2>
          <p className="text-gray-600">
            Loading pricing component...
          </p>
        </div>
        <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-atlas-900 mb-4">
          Atlas Pricing Demo
        </h2>
        <p className="text-gray-600">
          Experience the Atlas PricingComponent with our custom purple branding
        </p>
      </div>
      <PricingComponent successUrl={`${window.location.origin}/features`} />
    </div>
  );
}