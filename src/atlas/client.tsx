"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const loginCallback = () => {
  redirect("/sign-in");
};

export function AtlasClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, getToken, isLoaded } = useAuth();
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [AtlasProvider, setAtlasProvider] = useState<any>(null);

  useEffect(() => {
    // Dynamically import AtlasProvider to avoid SSR issues
    const loadAtlasProvider = async () => {
      try {
        const { AtlasProvider: Provider } = await import("@runonatlas/next/client");
        setAtlasProvider(() => Provider);
      } catch (error) {
        console.error("Failed to load AtlasProvider:", error);
      }
    };
    
    if (typeof window !== "undefined") {
      loadAtlasProvider();
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading authentication...</div>;
  }

  if (!AtlasProvider) {
    return <div>Loading Atlas...</div>;
  }

  return (
    <AtlasProvider
      getAuth={getToken}
      loginCallback={loginCallback}
      userId={userId}
      userEmail={user?.primaryEmailAddress?.emailAddress}
      userName={user?.fullName}
      isUserLoading={!isLoaded}
    >
      {children}
    </AtlasProvider>
  );
}