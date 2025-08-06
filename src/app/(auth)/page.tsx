"use client";

import { useEffect, useState } from "react";
import { FeatureGate } from "@/components/atlas/feature-gate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePricingModel, useCustomerInfo } from "@runonatlas/next/client";

export default function FeaturesPage() {
  const pricingModel = usePricingModel();
  const customerInfo = useCustomerInfo();

  console.log("pricingModel", pricingModel);
  console.log("customerInfo", customerInfo);
  
  // Extract user's active plan and included entitlements
  const activeSubscription = customerInfo.user?.activeSubscriptions?.[0];
  const activePlan = activeSubscription?.plan;
  const userEntitlements = activePlan?.entitlements || [];
  
  // Get all available entitlements from pricing model
  const allEntitlements = pricingModel.pricingModel?.entitlements || [];
  
  const isLoading = pricingModel.isLoading || customerInfo.isLoading;

  // Helper function to check if user has access to an entitlement
  const hasAccess = (entitlementId: string) => {
    return userEntitlements.some((ent: any) => ent.id === entitlementId && ent.included);
  };

  // Helper function to get entitlement details including limits
  const getEntitlementDetails = (entitlementId: string) => {
    const userEntitlement = userEntitlements.find((ent: any) => ent.id === entitlementId);
    return {
      hasAccess: userEntitlement?.included || false,
      limit: userEntitlement?.limit || null,
    };
  };

  

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-atlas-900">Features & Entitlements</h1>
        <p className="text-slate-600 mt-2">
          Your feature access based on the <span className="font-medium text-atlas-700">{activePlan?.name || 'current'}</span> plan
        </p>
      </div>

      {/* Current Plan Summary */}
      {activePlan && (
        <div className="bg-gradient-to-r from-atlas-50 to-purple-50 border border-atlas-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-atlas-900">{activePlan.name}</h3>
              <p className="text-slate-600">{activePlan.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-atlas-700">
                ${activePlan.basePlanPrice?.rules?.price || 'Custom'}
              </div>
              <div className="text-sm text-slate-500">
                {activePlan.basePlanPrice?.billingCadence || 'monthly'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 font-medium">
                {userEntitlements.filter((ent: any) => ent.included).length} features included
              </span>
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">
              Status: <span className="text-green-600 font-medium">Active</span>
            </span>
          </div>
        </div>
      )}

      {/* All Available Features */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allEntitlements.map((entitlement: any) => {
          const details = getEntitlementDetails(entitlement.id);
          

          return (
            <Card 
              key={entitlement.id}
              className={`transition-all duration-200 ${
                details.hasAccess 
                  ? 'border-green-200 bg-green-50 shadow-md' 
                  : 'border-slate-200 bg-white opacity-75 hover:opacity-90'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl"></span>
                    <div>
                      <CardTitle className={`text-lg ${
                        details.hasAccess ? 'text-green-800' : 'text-slate-700'
                      }`}>
                        {entitlement.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {entitlement.slug}
                      </CardDescription>
                    </div>
                  </div>
                  {details.hasAccess ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <span className="text-sm font-medium">✓ Included</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-sm">🔒 Locked</span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className={`text-sm mb-4 ${
                  details.hasAccess ? 'text-slate-700' : 'text-slate-500'
                }`}>
                 
                </p>
                
                {/* Show limit if it exists */}
                {details.limit && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">📊</span>
                      <span className="text-sm font-medium text-blue-800">
                        Limit: {details.limit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {details.hasAccess ? (
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    Configure Feature
                  </button>
                ) : (
                  <button className="w-full px-4 py-2 bg-atlas-600 text-white rounded-lg hover:bg-atlas-700 transition-colors text-sm font-medium">
                    Upgrade Plan
                  </button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No features message */}
      {allEntitlements.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">No Features Configured</h3>
          <p className="text-slate-500">
            Features will appear here once your Atlas pricing model is configured.
          </p>
        </div>
      )}
    </div>
  );
}