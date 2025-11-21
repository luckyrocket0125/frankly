"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-semibold text-foreground sm:text-2xl">
          frankly
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/listings"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            View All Listings
          </Link>
          <Link
            href="/sell"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Sell Your Business
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-2 text-foreground transition-colors hover:text-primary md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link
              href="/listings"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              View All Listings
            </Link>
            <Link
              href="/sell"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Sell Your Business
            </Link>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-border px-4 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

