import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-atlas-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-atlas-600 rounded-full"></div>
            <h1 className="text-2xl font-bold text-slate-800">Atlas Sample App</h1>
          </div>
          <p className="text-slate-600">Create your account to get started</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <SignUp 
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none",
                headerTitle: "text-slate-800",
                headerSubtitle: "text-slate-600",
                socialButtonsBlockButton: "border-slate-200 text-slate-700 hover:bg-slate-50",
                formFieldInput: "border-slate-200 text-slate-800 focus:border-atlas-500 focus:ring-atlas-500",
                formFieldLabel: "text-slate-700",
                formButtonPrimary: "bg-atlas-600 hover:bg-atlas-700",
                footerActionLink: "text-atlas-600 hover:text-atlas-700",
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}