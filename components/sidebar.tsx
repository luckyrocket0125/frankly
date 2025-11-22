"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Handshake,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Listings", href: "/listings", icon: FileText },
  { name: "Buyers", href: "/buyers", icon: Users },
  { name: "Matches", href: "/matches", icon: Handshake },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSignOut = async () => {
    await logout();
    router.push("/login");
    setIsMenuOpen(false);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo and Toggle Button */}
        <div className="flex items-center justify-between border-b border-border p-4">
          {!isCollapsed && (
            <Link href="/" className="text-xl font-semibold text-foreground">
              frankly
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="rounded-md p-1.5 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 px-4 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info at Bottom */}
        {!isCollapsed && (
          <div className="border-t border-border p-4">
            {user && (
              <div className="relative" ref={menuRef}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {user.user_metadata?.full_name || user.user_metadata?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-md p-1.5 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="User menu"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 rounded-md border border-border bg-background shadow-lg">
                    <Link
                      href="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Account settings</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

