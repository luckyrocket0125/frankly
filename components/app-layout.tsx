"use client";

import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

function LoggedInLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-300",
          isCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return (
      <SidebarProvider>
        <LoggedInLayout>{children}</LoggedInLayout>
      </SidebarProvider>
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

