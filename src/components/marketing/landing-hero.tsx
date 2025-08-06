import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingHero() {
  return (
    <div className="relative bg-gradient-to-br from-atlas-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-atlas-900 mb-6">
              Atlas SDK
              <span className="block text-atlas-600">Capabilities Showcase</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how Atlas simplifies billing and packaging management with 
              seamless integration, feature-based architecture, and developer-friendly implementation.
            </p>
          </div>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button asChild size="lg" className="bg-atlas-600 hover:bg-atlas-700">
              <Link href="/sign-up">
                Try Atlas Demo
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-atlas-900">Key Benefits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-atlas-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-atlas-600 text-xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Simplified Integration</h3>
                <p className="text-gray-600 text-sm">
                  Seamless integration with modern tech stack
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-atlas-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-atlas-600 text-xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">Feature-Based Architecture</h3>
                <p className="text-gray-600 text-sm">
                  Control access with powerful feature gating
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-atlas-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-atlas-600 text-xl">🚀</span>
                </div>
                <h3 className="font-semibold mb-2">Developer-Friendly</h3>
                <p className="text-gray-600 text-sm">
                  Easy to use with comprehensive documentation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}