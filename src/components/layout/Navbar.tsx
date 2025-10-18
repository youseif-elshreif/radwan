"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#", label: "الرئيسية", active: true },
    { href: "#courses", label: "الكورسات" },
    { href: "#about", label: "عن الأكاديمية" },
    { href: "#contact", label: "تواصل" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border/70 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/imgs/Radwan.png"
              alt="أكاديمية الرضوان"
              width={180}
              height={60}
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation - RTL aligned */}
          <div className="hidden md:block">
            <div className="mr-10 flex items-baseline space-x-reverse space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={`relative px-1 py-2 text-sm font-medium font-arabic transition-colors text-text-secondary hover:text-accent after:absolute after:-bottom-2 after:right-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full ${
                    link.active ? "text-accent after:w-full" : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Button variant="outline" size="sm">
              تسجيل الدخول
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-primary hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">افتح القائمة الرئيسية</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface/95 backdrop-blur-md border-t border-border/70">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium font-arabic transition-colors ${
                link.active
                  ? "text-primary"
                  : "text-text-primary hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 px-3">
            <Button variant="outline" size="sm" className="w-full">
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
