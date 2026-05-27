import React from "react";
import Link from "next/link";

interface FooterProps {
  locale: string;
  dict: {
    about: string;
    copyright: string;
    properties: string;
    developments: string;
    lifestyle: string;
    contact: string;
  };
}

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-20 pb-10 border-t border-stone-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: About */}
          <div className="space-y-6">
            <Link href={`/${locale}`} className="flex flex-col items-start">
              <span className="font-serif text-2xl tracking-[0.25em] font-semibold text-white">
                BENELUX
              </span>
              <span className="text-[0.65rem] tracking-[0.4em] text-red-500 uppercase mt-1">
                Real Estate
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              {dict.about}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-medium">
              Navegación
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href={`/${locale}/propiedades`} className="hover:text-white transition-colors">
                  {dict.properties}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/desarrollos`} className="hover:text-white transition-colors">
                  {dict.developments}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/#lifestyle`} className="hover:text-white transition-colors">
                  {dict.lifestyle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/#contacto`} className="hover:text-white transition-colors">
                  {dict.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-medium">
              Oficinas y Contacto
            </h4>
            <ul className="space-y-3 text-sm font-light text-stone-400">
              <li>
                <span className="text-white block font-medium mb-1">Mendoza</span>
                Viamonte 5420, Chacras de Coria, Luján de Cuyo, Mendoza, Argentina.
              </li>
              <li>
                <span className="text-stone-300 block font-medium">Teléfono:</span>
                +54 261 555-1234
              </li>
              <li>
                <span className="text-stone-300 block font-medium">Email:</span>
                info@beneluxmendoza.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500 font-light">
            {dict.copyright}
          </p>
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-white transition-colors text-xs uppercase tracking-widest"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-white transition-colors text-xs uppercase tracking-widest"
            >
              Facebook
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-white transition-colors text-xs uppercase tracking-widest"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
