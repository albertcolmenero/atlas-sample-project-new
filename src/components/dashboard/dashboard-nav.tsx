"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Features", href: "/features", icon: "✨" },
  { name: "Pricing", href: "/pricing", icon: "💰" },
  { name: "Customer Portal", href: "/portal", icon: "👤" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-white shadow-lg border-r border-slate-200">
      <div className="p-6">
        <div className="text-lg font-bold text-atlas-800 mb-8 flex items-center gap-2">
          <div className="w-2 h-2 bg-atlas-600 rounded-full"></div>
          Atlas Demo
        </div>
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname === "/" && item.href === "/features");
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-atlas-600 text-atlas-700 shadow-md"
                      : "text-slate-700 hover:bg-atlas-50 hover:text-atlas-800 hover:shadow-sm"
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}