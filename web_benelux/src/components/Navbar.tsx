"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Logo from "./Logo";

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
      setIsScrolled(window.scrollY > 50);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          isScrolled || isOpen
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl shadow-lg border-b border-white/10 py-5"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-8"
        }`}
      >
        <div className="container-custom w-full flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-50 transform origin-left scale-75 md:scale-90 lg:scale-100 transition-transform duration-500">
            <Logo />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-16">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white transition-all duration-300 py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Language selector & Menu toggle */}
          <div className="flex items-center gap-6 xl:gap-10">
            <div className="hidden lg:flex items-center bg-white/5 backdrop-blur-md rounded-full p-1.5 border border-white/10 gap-1">
              {["es", "en", "pt"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLocale(lang)}
                  className={`uppercase text-xs font-semibold tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    locale === lang
                      ? "bg-white text-black shadow-md"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Hamburger Menu Toggle (Mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-12 h-12 rounded-full bg-white/10 border border-white/20 focus:outline-none z-50 relative cursor-pointer hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <span
                  className={`block w-full h-[1.5px] bg-white transition-all duration-300 origin-left ${isOpen ? "rotate-45 translate-x-[2px] -translate-y-[1px]" : ""}`}
                ></span>
                <span
                  className={`block w-full h-[1.5px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`block w-full h-[1.5px] bg-white transition-all duration-300 origin-left ${isOpen ? "-rotate-45 translate-x-[2px] translate-y-[1px]" : ""}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col px-8 pt-32 pb-12 transition-all duration-700 ease-in-out overflow-y-auto ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-8 text-left max-w-sm mx-auto w-full mt-8">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-serif text-3xl text-white/90 hover:text-white transition-colors py-4 flex items-center justify-between group border-b border-white/10"
              style={{
                transitionDelay: isOpen ? `${idx * 100}ms` : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isOpen ? 1 : 0,
                transitionProperty: "transform, opacity",
                transitionDuration: "0.6s",
                transitionTimingFunction: "cubic-bezier(0.2, 1, 0.3, 1)",
              }}
            >
              <span className="tracking-wide">{link.name}</span>
              <span className="text-white/30 group-hover:text-white transition-colors text-2xl font-light">→</span>
            </Link>
          ))}
        </div>

        {/* Footer of Mobile Menu */}
        <div 
          className="max-w-sm mx-auto w-full mt-auto pt-12"
          style={{
            transitionDelay: isOpen ? "400ms" : "0ms",
            opacity: isOpen ? 1 : 0,
            transitionProperty: "opacity",
            transitionDuration: "0.8s",
          }}
        >
          {/* Languages Selector */}
          <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-8">
            <div className="flex justify-between items-center">
              {["es", "en", "pt"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    changeLocale(lang);
                    setIsOpen(false);
                  }}
                  className={`uppercase text-sm font-semibold tracking-widest px-6 py-3 rounded-xl transition-all cursor-pointer w-full ${
                    locale === lang
                      ? "bg-white text-black shadow-lg"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {lang === "es" ? "ES" : lang === "en" ? "EN" : "PT"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center text-xs tracking-wider text-white/50 space-y-2">
              <span className="block font-semibold text-white/80 text-sm">BENELUX REAL ESTATE</span>
              <span className="block">+54 261 555-1234 • info@beneluxmendoza.com</span>
            </div>
            
            <div className="flex justify-center space-x-8 text-[0.7rem] tracking-[0.2em] text-white/40">
              <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-white transition-colors">FACEBOOK</a>
              <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
