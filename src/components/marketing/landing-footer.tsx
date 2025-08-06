import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-atlas-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Atlas Sample App</h3>
            <p className="text-atlas-200 max-w-md">
              A comprehensive showcase of Atlas SDK capabilities for internal 
              demo purposes and product testing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/sign-up" className="block text-atlas-200 hover:text-white">
                Get Started
              </Link>
              <Link href="/sign-in" className="block text-atlas-200 hover:text-white">
                Sign In
              </Link>
              <a 
                href="https://docs.runonatlas.com" 
                className="block text-atlas-200 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Atlas Documentation
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-atlas-800 mt-8 pt-8 text-center text-atlas-300">
          <p>&copy; 2024 Atlas Sample App. Built for internal demo and testing purposes.</p>
        </div>
      </div>
    </footer>
  );
}