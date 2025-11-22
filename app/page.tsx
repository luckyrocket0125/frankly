"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-foreground mb-4">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your dashboard.</p>
      </div>
    </div>
  );
}
