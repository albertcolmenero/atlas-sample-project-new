import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export async function DashboardHeader() {
  const user = await currentUser();

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-slate-800">
            Atlas Sample App
          </div>
          <div className="px-3 py-1 text-xs font-medium text-atlas-700 bg-atlas-100 rounded-full">
            Demo & Testing
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm font-medium text-slate-700">
            Welcome, <span className="text-atlas-700">{user?.firstName}</span>!
          </div>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}