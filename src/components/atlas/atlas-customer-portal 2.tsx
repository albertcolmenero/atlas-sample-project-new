"use client";

import { useEffect, useState } from "react";

export function AtlasCustomerPortal() {
  const [CustomerPortalComponent, setCustomerPortalComponent] = useState<any>(null);

  useEffect(() => {
    const loadCustomerPortalComponent = async () => {
      try {
        const { CustomerPortalComponent: Component } = await import("@runonatlas/next/client");
        setCustomerPortalComponent(() => Component);
      } catch (error) {
        console.error("Failed to load CustomerPortalComponent:", error);
      }
    };
    
    if (typeof window !== "undefined") {
      loadCustomerPortalComponent();
    }
  }, []);

  if (!CustomerPortalComponent) {
    return (
      <div className="w-full">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-atlas-900 mb-4">
            Customer Portal Demo
          </h2>
          <p className="text-gray-600">
            Loading customer portal...
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
          Customer Portal Demo
        </h2>
        <p className="text-gray-600">
          Manage your subscription, billing, and account settings
        </p>
      </div>
      <CustomerPortalComponent successUrl={`${window.location.origin}/portal`} />
    </div>
  );
}