"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { PricingComponent, usePricingModel } from "@runonatlas/next/client";

export function LandingPricing() {
  const { isSignedIn, isLoaded } = useAuth();
  const pricingModel = usePricingModel();
  
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-atlas-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-atlas-900 mb-4">
            Atlas Pricing
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Transparent, flexible pricing that scales with your business. 
            Start free and upgrade as you grow.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
              <PricingComponent 
                successUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/features`}
                
              />
            </div>
          
            {/* Feature Comparison Table */}
            {pricingModel.pricingModel && (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mt-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-atlas-900 mb-2">
                    Feature Comparison
                  </h3>
                  <p className="text-slate-600">
                    Compare features and limits across all plans
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-4 font-semibold text-slate-800">
                          Features
                        </th>
                        {pricingModel.pricingModel.plans.map((plan: any) => (
                          <th key={plan.id} className="text-center py-4 px-4 font-semibold text-slate-800">
                            <div>
                            <div className="font-bold text-atlas-700">{plan.name}</div>
                            <div className=" text-slate-500 mb-4">{plan.description}</div>
                              <div className="text-sm text-slate-500 font-normal">
                                ${plan.price?.price || 'Custom'}/mo
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pricingModel.pricingModel.entitlements.map((entitlement: any) => (
                        <tr key={entitlement.id} className="border-b border-slate-100 hover:bg-slate-25">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-slate-800">
                                {entitlement.name}
                              </div>
                              
                            </div>
                          </td>
                          {pricingModel.pricingModel?.plans.map((plan: any) => {
                            const planEntitlement = plan.entitlements.find(
                              (pe: any) => pe.id === entitlement.id
                            );
                            const isIncluded = planEntitlement?.included;
                            const limit = planEntitlement?.limit;
                            
                            return (
                              <td key={`${plan.id}-${entitlement.id}`} className="py-4 px-4 text-center">
                                {limit ? (
                                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                    <span>{limit.toLocaleString()}</span>
                                  </div>
                                ) : isIncluded ? (
                                  <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                                    <span className="text-lg">✓</span>
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 text-slate-400 rounded-full">
                                    <span className="text-lg">✗</span>
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          
            <div className="grid md:grid-cols-2 gap-8 items-center mt-10">
              {/* Preview Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-atlas-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">💰</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    Interactive Pricing Table
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Experience the full Atlas pricing component with real-time plan selection, 
                    feature comparison, and seamless checkout process.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-slate-600">Real-time pricing updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-slate-600">Feature comparison matrix</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-slate-600">Instant plan upgrades</span>
                    </div>
                  </div>

                    <div className="space-y-3">
                      <div className="text-sm text-slate-500">
                        Or <Link href="/sign-up" className="text-atlas-600 hover:text-atlas-700 font-medium">sign up</Link> for full access
                      </div>
                    </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800">
                  Why Choose Atlas?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-atlas-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-atlas-600">🚀</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Instant Setup</h4>
                      <p className="text-slate-600">Get up and running in minutes with our easy-to-use SDK</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-atlas-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-atlas-600">⚡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Real-time Updates</h4>
                      <p className="text-slate-600">Pricing and features sync automatically across your app</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-atlas-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-atlas-600">💳</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Flexible Billing</h4>
                      <p className="text-slate-600">Support for subscriptions, one-time payments, and usage-based pricing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-atlas-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-atlas-600">📊</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Advanced Analytics</h4>
                      <p className="text-slate-600">Deep insights into customer behavior and revenue metrics</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex gap-3">
                    <Button asChild size="lg" className="bg-atlas-600 hover:bg-atlas-700">
                      <Link href="/sign-up">
                        Get Started Free
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-atlas-200 text-atlas-700 hover:bg-atlas-50">
                      <Link href="/sign-in">
                        Sign In
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
        
        </div>
      </div>
    </section>
  );
}