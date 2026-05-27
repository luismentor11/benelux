"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  locale: string;
  dict: {
    properties: string;
    developments: string;
    lifestyle: string;
    contact: string;
  };
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Block body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const changeLocale = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");
    router.push(newPathname);
  };

  const navLinks = [
    { name: dict.properties, href: `/${locale}/propiedades` },
    { name: dict.developments, href: `/${locale}/desarrollos` },
    { name: dict.lifestyle, href: `/${locale}/#lifestyle` },
    { name: dict.contact, href: `/${locale}/#contacto` },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isOpen
            ? "bg-stone-50/90 backdrop-blur-md shadow-sm border-b border-stone-200/40 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex flex-col items-start lg:items-center">
            <span
              className={`font-serif text-xl tracking-[0.25em] font-semibold transition-colors duration-500 ${
                isScrolled || isOpen ? "text-stone-900" : "text-white"
              }`}
            >
              BENELUX
            </span>
            <span
              className={`text-[0.6rem] tracking-[0.4em] transition-colors duration-500 uppercase mt-0.5 ${
                isScrolled || isOpen ? "text-stone-500" : "text-white/70"
              }`}
            >
              Real Estate
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs tracking-widest uppercase font-medium transition-colors duration-500 border-b border-transparent hover:border-primary/50 pb-1 ${
                  isScrolled
                    ? "text-stone-600 hover:text-primary"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language selector & Menu toggle */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-3 text-xs tracking-wider">
              {["es", "en", "pt"].map((lang, idx) => (
                <React.Fragment key={lang}>
                  {idx > 0 && <span className={isScrolled ? "text-stone-300" : "text-white/20"}>|</span>}
                  <button
                    onClick={() => changeLocale(lang)}
                    className={`uppercase font-semibold transition-colors duration-500 cursor-pointer ${
                      locale === lang
                        ? isScrolled
                          ? "text-primary border-b border-primary"
                          : "text-white border-b border-white"
                        : isScrolled
                        ? "text-stone-400 hover:text-stone-600"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Hamburger Menu Toggle (Mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1.5 focus:outline-none z-50 relative cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isScrolled || isOpen ? "bg-stone-900" : "bg-white"
                } ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isScrolled || isOpen ? "bg-stone-900" : "bg-white"
                } ${isOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isScrolled || isOpen ? "bg-stone-900" : "bg-white"
                } ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-stone-50 z-40 flex flex-col justify-between px-8 pt-24 pb-8 transition-all duration-500 ease-in-out overflow-y-auto ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6 text-left max-w-sm mx-auto w-full mt-4">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-serif text-2xl text-stone-850 hover:text-primary transition-colors py-2.5 flex items-center justify-between group border-b border-stone-200/40"
              style={{
                transitionDelay: isOpen ? `${idx * 50}ms` : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(15px)",
                opacity: isOpen ? 1 : 0,
                transitionProperty: "transform, opacity",
                transitionDuration: "0.4s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span>{link.name}</span>
              <span className="text-stone-400 group-hover:text-primary transition-colors text-lg font-light">→</span>
            </Link>
          ))}
        </div>

        {/* Footer of Mobile Menu */}
        <div className="max-w-sm mx-auto w-full space-y-6 mt-8">
          {/* Languages Selector */}
          <div className="space-y-2 text-center">
            <span className="text-[0.6rem] tracking-[0.25em] text-stone-400 uppercase font-bold block mb-1">
              Idioma / Language
            </span>
            <div className="flex justify-center items-center gap-4 py-1">
              {["es", "en", "pt"].map((lang, idx) => (
                <React.Fragment key={lang}>
                  {idx > 0 && <span className="text-stone-300">|</span>}
                  <button
                    onClick={() => {
                      changeLocale(lang);
                      setIsOpen(false);
                    }}
                    className={`uppercase text-xs font-semibold tracking-widest pb-1 border-b-2 transition-all cursor-pointer ${
                      locale === lang
                        ? "text-primary border-primary"
                        : "text-stone-400 border-transparent hover:text-stone-800"
                    }`}
                  >
                    {lang === "es" ? "ES" : lang === "en" ? "EN" : "PT"}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-200/60 pt-4 space-y-3">
            {/* Contact Info */}
            <div className="text-center text-[0.7rem] text-stone-500 space-y-0.5">
              <span className="block font-semibold text-stone-700">BENELUX Real Estate</span>
              <span className="block">Tel: +54 261 555-1234 • info@beneluxmendoza.com</span>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 text-[0.65rem] tracking-widest text-stone-400 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                INSTAGRAM
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                FACEBOOK
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                LINKEDIN
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
