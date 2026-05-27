import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, Locale } from "@/get-dictionary";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PropiedadesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const allProperties = [
    {
      id: "prop-1",
      title: locale === "es" ? "Villa Moderna Chacras" : locale === "en" ? "Modern Villa Chacras" : "Villa Moderna Chacras",
      location: "Chacras de Coria, Luján de Cuyo",
      price: "USD 450.000",
      beds: 4,
      baths: 5,
      area: "380 m²",
      image: "/prop1.png",
      tag: dict.Filters.finalizado,
    },
    {
      id: "prop-2",
      title: locale === "es" ? "Finca Valle de Uco" : locale === "en" ? "Valle de Uco Wine Estate" : "Estância Valle de Uco",
      location: "Tupungato, Valle de Uco",
      price: "USD 1.250.000",
      beds: 3,
      baths: 4,
      area: "520 m²",
      image: "/prop2.png",
      tag: dict.Filters.finalizado,
    },
    {
      id: "prop-3",
      title: locale === "es" ? "Penthouse Plaza España" : locale === "en" ? "Plaza España Penthouse" : "Cobertura Plaza España",
      location: "Ciudad de Mendoza",
      price: "USD 320.000",
      beds: 2,
      baths: 2,
      area: "140 m²",
      image: "/dev.png", // Reusing development image as placeholder
      tag: dict.Filters.finalizado,
    },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="space-y-4 mb-16 max-w-2xl">
          <span className="text-red-800 text-xs font-semibold tracking-[0.25em] uppercase block">
            Portafolio
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-stone-900">
            {dict.Navbar.properties}
          </h1>
          <p className="text-stone-500 font-light text-sm">
            Explora nuestra selecta cartera de inmuebles en Mendoza. Desde fincas vitivinícolas exclusivas hasta residencias modernas en zonas residenciales.
          </p>
        </div>

        {/* Filters Top Bar Mockup */}
        <div className="border-y border-stone-200/50 py-6 mb-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-4 text-xs font-medium uppercase tracking-wider">
            <button className="border-b-2 border-stone-900 pb-1 text-stone-900">
              {dict.Filters.all}
            </button>
            <button className="text-stone-400 hover:text-stone-900 transition-colors pb-1">
              Chacras de Coria
            </button>
            <button className="text-stone-400 hover:text-stone-900 transition-colors pb-1">
              Valle de Uco
            </button>
            <button className="text-stone-400 hover:text-stone-900 transition-colors pb-1">
              Ciudad de Mendoza
            </button>
          </div>
          <span className="text-xs text-stone-500 font-light">
            Mostrando {allProperties.length} propiedades
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProperties.map((prop) => (
            <div key={prop.id} className="group bg-white border border-stone-200/30 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 rounded-lg">
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[0.6rem] tracking-widest uppercase font-bold text-stone-800 rounded">
                  {prop.tag}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-serif text-stone-900 group-hover:text-primary transition-colors duration-300">
                    {prop.title}
                  </h3>
                  <p className="text-[0.7rem] tracking-wider text-stone-450 uppercase">
                    {prop.location}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                  <span className="font-serif text-base text-stone-900 font-semibold text-primary">
                    {prop.price}
                  </span>
                  <div className="flex space-x-3 text-[0.65rem] text-stone-500">
                    <span className="flex items-center gap-1" title="Dormitorios">
                      <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {prop.beds}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1" title="Baños">
                      <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v3c0 1.242 1.008 2.25 2.25 2.25zm0 0l-1.072 6.435A2.25 2.25 0 005.65 21h12.7a2.25 2.25 0 002.222-2.315L19.5 12" />
                      </svg>
                      {prop.baths}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1" title="Superficie">
                      <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9V9z" />
                      </svg>
                      {prop.area}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
