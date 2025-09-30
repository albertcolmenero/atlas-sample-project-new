"use client";

// Removed unused imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePricingModel, useCustomerInfo } from "@runonatlas/next/client";
import { useState, useEffect } from "react";
import {
  loadFeatureUsage,
  incrementFeatureUsage,
  decrementFeatureUsage,
  type FeatureUsageData
} from "@/lib/feature-usage";

export default function FeaturesPage() {
  const pricingModel = usePricingModel();
  const customerInfo = useCustomerInfo();

  console.log("pricingModel", pricingModel);
  console.log("customerInfo", customerInfo);
  
  // Extract user's active plan and included entitlements
  const activeSubscription = customerInfo.user?.activeSubscriptions?.[0];
  const activePlan = activeSubscription?.plan;
  const activePlanId = activePlan?.id;
  
  // Find the matching plan in pricing model to get correct entitlements
  const pricingModelPlan = pricingModel.pricingModel?.plans?.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (plan: any) => plan.id === activePlanId
  );
  const userEntitlements = pricingModelPlan?.entitlements || [];

  console.log("activePlan", activePlan);
  console.log("pricingModelPlan", pricingModelPlan);
  console.log("userEntitlements", userEntitlements);

  // Get all available entitlements from pricing model
  const allEntitlements = pricingModel.pricingModel?.entitlements || [];

  console.log("allEntitlements", allEntitlements);
  
  const isLoading = pricingModel.isLoading || customerInfo.isLoading;

  // State for testing usage-based features
  const [testingFeature, setTestingFeature] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({});

  // State for feature usage tracking
  const [featureUsage, setFeatureUsage] = useState<FeatureUsageData>({});
  const currentUserId = customerInfo.user?.id;

  // Load feature usage data when user changes
  useEffect(() => {
    if (currentUserId) {
      const usageData = loadFeatureUsage(currentUserId);
      setFeatureUsage(usageData);
    } else {
      setFeatureUsage({});
    }
  }, [currentUserId]);

  /*

  {
    "pricingModel": {
        "entitlements": [
            {
                "name": "Basic entitlement",
                "id": "92efdbdb-7c74-4005-9ca2-7bde041aab44",
                "slug": "basic-entitlement"
            },
            {
                "name": "Pro entitlement",
                "id": "40f09aaf-6d98-42a3-98f1-e4d784941abc",
                "slug": "pro-entitlement"
            },
            {
                "name": "Enterprise entitlement",
                "id": "a46dfa64-1ecd-4ba0-a78e-caa74cdf7521",
                "slug": "enterprise-entitlement"
            }
        ],
        "plans": [
            {
                "id": "261f5cea-11c6-4e89-b179-79905a7ea4fb",
                "name": "Basic plan",
                "description": "Basic plan",
                "status": "available",
                "purchasable": true,
                "requestPricingText": "Request pricing",
                "requestPricingUrl": "",
                "price": {
                    "price": 10
                },
                "entitlements": [
                    {
                        "id": "92efdbdb-7c74-4005-9ca2-7bde041aab44",
                        "crossEnvironmentId": "803ce801-a7a3-453f-a667-58c61c1d5387",
                        "included": true
                    },
                    {
                        "id": "40f09aaf-6d98-42a3-98f1-e4d784941abc",
                        "crossEnvironmentId": "1dd27e3f-e25d-463c-a883-77acce3684a5",
                        "included": false
                    },
                    {
                        "id": "a46dfa64-1ecd-4ba0-a78e-caa74cdf7521",
                        "crossEnvironmentId": "6d91b9ad-5f2b-44f6-a893-286e8b397cba",
                        "included": false
                    }
                ]
            },
            {
                "id": "af1fb323-951b-44b8-ae7c-247012961a65",
                "name": "Pro plan",
                "description": "Pro plan",
                "status": "available",
                "purchasable": true,
                "requestPricingText": "Request pricing",
                "requestPricingUrl": "",
                "price": {
                    "price": 20
                },
                "entitlements": [
                    {
                        "id": "92efdbdb-7c74-4005-9ca2-7bde041aab44",
                        "crossEnvironmentId": "803ce801-a7a3-453f-a667-58c61c1d5387",
                        "included": true
                    },
                    {
                        "id": "40f09aaf-6d98-42a3-98f1-e4d784941abc",
                        "crossEnvironmentId": "1dd27e3f-e25d-463c-a883-77acce3684a5",
                        "included": true
                    },
                    {
                        "id": "a46dfa64-1ecd-4ba0-a78e-caa74cdf7521",
                        "crossEnvironmentId": "6d91b9ad-5f2b-44f6-a893-286e8b397cba",
                        "included": false
                    }
                ]
            },
            {
                "id": "9903972c-5883-412c-88d3-c718710da1cd",
                "name": "Enterprise plan",
                "description": "Enterprise plan",
                "status": "available",
                "purchasable": true,
                "requestPricingText": "Request pricing",
                "requestPricingUrl": "",
                "price": {
                    "price": 30
                },
                "entitlements": [
                    {
                        "id": "92efdbdb-7c74-4005-9ca2-7bde041aab44",
                        "crossEnvironmentId": "803ce801-a7a3-453f-a667-58c61c1d5387",
                        "included": true
                    },
                    {
                        "id": "40f09aaf-6d98-42a3-98f1-e4d784941abc",
                        "crossEnvironmentId": "1dd27e3f-e25d-463c-a883-77acce3684a5",
                        "included": true
                    },
                    {
                        "id": "a46dfa64-1ecd-4ba0-a78e-caa74cdf7521",
                        "crossEnvironmentId": "6d91b9ad-5f2b-44f6-a893-286e8b397cba",
                        "included": true
                    }
                ]
            }
        ]
    },
    "isLoading": false,
    "error": null
}
  */

  /*
  {
    "user": {
        "billingAddress1": null,
        "billingAddress2": null,
        "billingCity": null,
        "billingCountry": null,
        "billingState": null,
        "billingZipCode": null,
        "createdAt": "2025-08-06T13:12:49.038Z",
        "email": "albert.colmenero@gmail.com",
        "externalId": "user_30tRQUBeFccXAbB1TJdUUb5NFr7",
        "id": "a024c66a-ccb5-43a1-a4ab-165c1a9b1b4b",
        "name": "Albert Colmenero",
        "quickBooksId": null,
        "paymentMethod": null,
        "shippingAddress1": null,
        "shippingAddress2": null,
        "shippingCity": null,
        "shippingCountry": null,
        "shippingState": null,
        "shippingZipCode": null,
        "status": "inactive",
        "stripeId": "cus_SokeMajmDrSxiZ",
        "updatedAt": "2025-08-06T13:12:49.038Z",
        "merchantId": "656ca63b-991c-4816-ace8-4415a4677eda",
        "activeSubscriptions": [
            {
                "currency": null,
                "endDate": null,
                "id": "5095128c-e513-4a42-9d2f-079d646c7274",
                "netTerms": null,
                "startDate": "2025-08-06T00:00:00.000Z",
                "status": "active",
                "customerId": "a024c66a-ccb5-43a1-a4ab-165c1a9b1b4b",
                "merchantId": "656ca63b-991c-4816-ace8-4415a4677eda",
                "planId": "261f5cea-11c6-4e89-b179-79905a7ea4fb",
                "plan": {
                    "currency": "USD",
                    "description": "Basic plan",
                    "externalId": null,
                    "id": "261f5cea-11c6-4e89-b179-79905a7ea4fb",
                    "name": "Basic plan",
                    "netTerms": "uponReceipt",
                    "purchasable": true,
                    "requestPricingText": "Request pricing",
                    "requestPricingUrl": "",
                    "status": "available",
                    "crossEnvironmentId": "261f5cea-11c6-4e89-b179-79905a7ea4fb",
                    "basePlanPriceId": "327ea215-f34a-44ad-aef3-f5f9db9d5f3f",
                    "merchantId": "656ca63b-991c-4816-ace8-4415a4677eda",
                    "basePlanPrice": {
                        "billingCadence": "monthly",
                        "billingMode": "advance",
                        "entityType": "entitlement",
                        "id": "327ea215-f34a-44ad-aef3-f5f9db9d5f3f",
                        "limit": null,
                        "name": "Basic plan",
                        "priceType": "unit",
                        "status": "active",
                        "usesCustomPricingUnit": false,
                        "rules": {
                            "price": 10,
                            "quantity": 1
                        },
                        "billableId": "481e48fa-cf3a-4005-a977-7900bb3a07ac",
                        "customPricingUnitId": null,
                        "merchantId": "656ca63b-991c-4816-ace8-4415a4677eda"
                    }
                }
            }
        ],
        "upcomingSubscriptions": []
    },
    "isLoading": false,
    "error": null
}
  */

  // Removed unused helper function

  // Helper function to get entitlement details including limits and pricing
  const getEntitlementDetails = (entitlementId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userEntitlement = userEntitlements.find((ent: any) => ent.id === entitlementId);
    return {
      hasAccess: userEntitlement?.included || false,
      limit: userEntitlement?.limit || null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      price: (userEntitlement as any)?.price || null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isUsageBased: (userEntitlement as any)?.price?.priceType && (userEntitlement as any)?.price?.priceType !== 'none',
    };
  };

  // Function to test usage-based features
  const testUsageFeature = async (featureId: string) => {
    console.log("Testing feature:", featureId);
    setTestingFeature(featureId);
    try {
      const response = await fetch('/api/test-usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featureId }),
      });

      const data = await response.json();
      console.log("API Response:", response.status, data);

      setTestResults(prev => ({
        ...prev,
        [featureId]: {
          success: response.ok,
          message: data.error || data.message,
        },
      }));
    } catch {
      setTestResults(prev => ({
        ...prev,
        [featureId]: {
          success: false,
          message: 'Network error occurred while testing the feature',
        },
      }));
    } finally {
      setTestingFeature(null);
    }
  };

  // Function to increment feature usage
  const handleIncrementUsage = (featureId: string) => {
    if (!currentUserId) return;

    const newCount = incrementFeatureUsage(currentUserId, featureId);
    setFeatureUsage(prev => ({
      ...prev,
      [featureId]: newCount
    }));
  };

  // Function to decrement feature usage
  const handleDecrementUsage = (featureId: string) => {
    if (!currentUserId) return;

    const newCount = decrementFeatureUsage(currentUserId, featureId);
    setFeatureUsage(prev => ({
      ...prev,
      [featureId]: newCount
    }));
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
          Your feature access based on the <span className="font-medium text-atlas-700">{pricingModelPlan?.name || activePlan?.name || 'current'}</span> plan
        </p>
      </div>

      {/* Current Plan Summary */}
      {(pricingModelPlan || activePlan) && (
        <div className="bg-gradient-to-r from-atlas-50 to-purple-50 border border-atlas-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-atlas-900">{pricingModelPlan?.name || activePlan?.name}</h3>
              <p className="text-slate-600">{pricingModelPlan?.description || activePlan?.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-atlas-700">
                ${pricingModelPlan?.prices[activeSubscription?.billingCadence || 'monthly']?.price || activePlan?.basePlanPrice?.rules?.price || 'Custom'}
              </div>
              <div className="text-sm text-slate-500">
                {activeSubscription?.billingCadence}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 font-medium">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
                        details.hasAccess
                          ? details.isUsageBased
                            ? 'text-orange-800'
                            : 'text-green-800'
                          : 'text-slate-700'
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
                      <span className="text-sm font-medium">
                        {'✓'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-sm">
                      {details.isUsageBased ? `Available: $${details.price.price}/use` : '🔒'}
                    </span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className={`text-sm mb-4 ${
                  details.hasAccess ? 'text-slate-700' : 'text-slate-500'
                }`}>
                  {details.isUsageBased
                    ? details.hasAccess
                      ? 'This feature is billed per use. You will be charged based on your actual usage.'
                      : 'This feature is available for usage-based billing. Pay only for what you use.'
                    : details.hasAccess
                      ? 'This feature is included in your current plan.'
                      : 'This feature is not included in your current plan.'
                  }
                </p>

                {/* Show pricing information for usage-based features */}
                {details.isUsageBased && (
                  <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-600">💰</span>
                      <span className="text-sm font-medium text-orange-800">
                        ${details.price.price} per use
                      </span>
                    </div>
                  </div>
                )}

                {/* Show limit and usage tracking if it exists */}
                {details.limit && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">📊</span>
                        <span className="text-sm font-medium text-blue-800">
                          Used: {featureUsage[entitlement.id] || 0} / Limit: {details.limit.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Increment/Decrement buttons for limit-type features */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleDecrementUsage(entitlement.id)}
                        disabled={(featureUsage[entitlement.id] || 0) <= 0}
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 !bg-white !text-red-600 !border-red-300 hover:!bg-red-50 disabled:opacity-50"
                      >
                        -
                      </Button>
                      <Button
                        onClick={() => handleIncrementUsage(entitlement.id)}
                        disabled={(featureUsage[entitlement.id] || 0) >= details.limit}
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 !bg-white !text-green-600 !border-green-300 hover:!bg-green-50 disabled:opacity-50"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}

                {/* Test button for usage-based features */}
                {details.isUsageBased && details.hasAccess && (
                  <div className="mt-4 space-y-3">
                    <Button
                      onClick={() => testUsageFeature(entitlement.slug)}
                      disabled={testingFeature === entitlement.slug}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      size="sm"
                    >
                      {testingFeature === entitlement.slug ? 'Testing...' : 'Test Usage Event'}
                    </Button>

                    {/* Show test results */}
                    {testResults[entitlement.slug] && (
                      <div className={`p-3 rounded-lg border ${
                        testResults[entitlement.slug].success
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className={testResults[entitlement.slug].success ? 'text-green-600' : 'text-red-600'}>
                            {testResults[entitlement.slug].success ? '✅' : '❌'}
                          </span>
                          <span className={`text-sm font-medium ${
                            testResults[entitlement.slug].success ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {testResults[entitlement.slug].message}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
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