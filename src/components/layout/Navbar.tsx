"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { HiMenu, HiX, HiUser, HiLogout } from "react-icons/hi";
import { useAuth } from "@/hooks/useAuth";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { href: "/", label: "الرئيسية", active: false },
    { href: "/courses", label: "الكورسات" },
    { href: "/#about", label: "عن الأكاديمية" },
    { href: "/#activities", label: "الأنشطة" },
    { href: "/#contact", label: "تواصل" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border/70 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/imgs/Radwan.png"
                alt="أكاديمية الرضوان"
                width={180}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - RTL aligned */}
          <div className="hidden md:block">
            <div className="mr-10 flex items-baseline space-x-reverse space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={`relative px-1 py-2 text-sm font-medium font-arabic transition-colors text-text-secondary hover:text-accent after:absolute after:-bottom-2 after:right-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full ${
                    link.active ? "text-accent after:w-full" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-24 h-8 bg-gray-200 animate-pulse rounded"></div>
            ) : isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <HiUser className="w-4 h-4" />
                  <span>مرحباً، {user?.first_name}</span>
                </div>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    حسابي
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:border-red-600"
                >
                  <HiLogout className="w-4 h-4 ml-1" />
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    إنشاء حساب
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-primary hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">افتح القائمة الرئيسية</span>
              {/* Menu icons */}
              <HiMenu
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
              />
              <HiX className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface/95 backdrop-blur-md border-t border-border/70">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium font-arabic transition-colors ${
                link.active
                  ? "text-primary"
                  : "text-text-primary hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 px-3 space-y-2">
            {isLoading ? (
              <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
            ) : isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary border-b border-border">
                  <HiUser className="w-4 h-4" />
                  <span>مرحباً، {user?.first_name}</span>
                </div>
                <Link href="/dashboard" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    حسابي
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full text-red-600 hover:text-red-700 hover:border-red-600"
                >
                  <HiLogout className="w-4 h-4 ml-1" />
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button variant="primary" size="sm" className="w-full">
                    إنشاء حساب
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
