import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, Locale } from "@/get-dictionary";
import ContactForm from "@/components/ContactForm";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const featuredProperties = [
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
  ];

  return (
    <div className="relative min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Mendoza Luxury Real Estate"
            fill
            priority
            className="object-cover brightness-[0.85] contrast-[1.05]"
            sizes="100vw"
          />
          {/* Subtle gradient overlay to read text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-stone-900/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center animate-fade-in">
          <h1 className="text-4xl md:text-7xl font-serif text-white tracking-[0.1em] leading-tight mb-6">
            {dict.Hero.title}
          </h1>
          <p className="text-stone-200 text-sm md:text-lg tracking-widest max-w-2xl font-light mb-12 uppercase leading-relaxed">
            {dict.Hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center">
            <Link
              href={`/${locale}/propiedades`}
              className="bg-white text-stone-900 px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase border border-white hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 shadow-lg text-center"
            >
              {dict.Hero.cta}
            </Link>
            <Link
              href={`/${locale}/desarrollos`}
              className="bg-transparent text-white px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase border border-white/60 hover:border-white hover:bg-white/10 transition-all duration-300 text-center"
            >
              {dict.Hero.investCta}
            </Link>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
          <span className="text-[0.6rem] tracking-[0.3em] text-white/50 uppercase mb-2">Scroll</span>
          <div className="w-0.5 h-8 bg-white/40" />
        </div>
      </section>

      {/* 2. Search & Filter Bar Overlay (Mockup) */}
      <section className="relative z-20 -mt-16 container-custom px-4 mb-24">
        <div className="bg-white/80 backdrop-blur-lg shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/50 p-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end rounded-lg">
          <div className="flex flex-col space-y-2">
            <label className="text-[0.65rem] tracking-[0.15em] text-stone-500 uppercase font-bold flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {dict.Filters.buy} / {dict.Filters.invest}
            </label>
            <select className="border border-stone-200 px-4 py-3 text-xs bg-stone-50/50 rounded outline-none focus:border-primary transition-all duration-350 cursor-pointer">
              <option>{dict.Filters.all}</option>
              <option>{dict.Filters.buy}</option>
              <option>{dict.Filters.invest}</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[0.65rem] tracking-[0.15em] text-stone-500 uppercase font-bold flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {dict.Filters.location}
            </label>
            <select className="border border-stone-200 px-4 py-3 text-xs bg-stone-50/50 rounded outline-none focus:border-primary transition-all duration-350 cursor-pointer">
              <option>{dict.Filters.all}</option>
              <option>Chacras de Coria</option>
              <option>Valle de Uco</option>
              <option>Ciudad de Mendoza</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[0.65rem] tracking-[0.15em] text-stone-500 uppercase font-bold flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {dict.Filters.stage}
            </label>
            <select className="border border-stone-200 px-4 py-3 text-xs bg-stone-50/50 rounded outline-none focus:border-primary transition-all duration-350 cursor-pointer">
              <option>{dict.Filters.all}</option>
              <option>{dict.Filters.pozo}</option>
              <option>{dict.Filters.desarrollo}</option>
              <option>{dict.Filters.finalizado}</option>
            </select>
          </div>

          <Link
            href={`/${locale}/propiedades`}
            className="bg-stone-900 text-white text-center py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-primary transition-all duration-300 rounded shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {dict.Filters.search}
          </Link>
        </div>
      </section>

      {/* 3. Featured Properties */}
      <section className="py-12 container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-red-800 text-xs font-semibold tracking-[0.25em] uppercase block">
              Colección Seleccionada
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900">
              Propiedades Destacadas
            </h2>
          </div>
          <Link
            href={`/${locale}/propiedades`}
            className="text-xs uppercase tracking-widest text-stone-600 hover:text-stone-950 font-semibold border-b border-stone-400 pb-1 self-start md:self-auto"
          >
            Ver Todo el Portafolio
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featuredProperties.map((prop) => (
            <div key={prop.id} className="group relative bg-white border border-stone-200/30 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 rounded-lg">
              {/* Image Container */}
              <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Tag overlay */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[0.65rem] tracking-widest uppercase font-bold text-stone-800 rounded">
                  {prop.tag}
                </div>
              </div>

              {/* Details */}
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-stone-900 group-hover:text-primary transition-colors duration-300">
                      {prop.title}
                    </h3>
                    <p className="text-xs tracking-wider text-stone-500">
                      {prop.location}
                    </p>
                  </div>
                  <span className="font-serif text-xl text-stone-900 font-semibold text-primary">
                    {prop.price}
                  </span>
                </div>

                <div className="border-t border-stone-100 pt-6 flex items-center justify-between text-xs text-stone-600 tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {prop.beds} Dorms
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v3c0 1.242 1.008 2.25 2.25 2.25zm0 0l-1.072 6.435A2.25 2.25 0 005.65 21h12.7a2.25 2.25 0 002.222-2.315L19.5 12" />
                    </svg>
                    {prop.baths} Baños
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9V9z" />
                    </svg>
                    {prop.area} Cubiertos
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Developments / Investments Section */}
      <section className="py-24 bg-stone-100/70 border-y border-stone-200/50 mt-12">
        <div className="container-custom">
          <div className="max-w-3xl space-y-6 mb-20">
            <span className="text-red-800 text-xs font-semibold tracking-[0.25em] uppercase block">
              Inversión y Desarrollo
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900">
              {dict.Developments.title}
            </h2>
            <p className="text-stone-500 font-light max-w-xl">
              {dict.Developments.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Pozo */}
            <div className="bg-white p-10 border border-stone-200/30 flex flex-col justify-between h-[320px] hover:-translate-y-2 transition-transform duration-500">
              <div className="space-y-6">
                <span className="text-stone-300 font-serif text-5xl">01</span>
                <h3 className="text-xl font-serif text-stone-900">
                  {dict.Developments.stages.pozo.title}
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  {dict.Developments.stages.pozo.description}
                </p>
              </div>
              <Link
                href={`/${locale}/desarrollos?etapa=pozo`}
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-red-800 hover:text-red-900 self-start"
              >
                Explorar Pozo
              </Link>
            </div>

            {/* Construcción */}
            <div className="bg-white p-10 border border-stone-200/30 flex flex-col justify-between h-[320px] hover:-translate-y-2 transition-transform duration-500">
              <div className="space-y-6">
                <span className="text-stone-300 font-serif text-5xl">02</span>
                <h3 className="text-xl font-serif text-stone-900">
                  {dict.Developments.stages.desarrollo.title}
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  {dict.Developments.stages.desarrollo.description}
                </p>
              </div>
              <Link
                href={`/${locale}/desarrollos?etapa=construccion`}
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-red-800 hover:text-red-900 self-start"
              >
                Ver Obras
              </Link>
            </div>

            {/* Terminado */}
            <div className="bg-white p-10 border border-stone-200/30 flex flex-col justify-between h-[320px] hover:-translate-y-2 transition-transform duration-500">
              <div className="space-y-6">
                <span className="text-stone-300 font-serif text-5xl">03</span>
                <h3 className="text-xl font-serif text-stone-900">
                  {dict.Developments.stages.finalizado.title}
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  {dict.Developments.stages.finalizado.description}
                </p>
              </div>
              <Link
                href={`/${locale}/desarrollos?etapa=terminado`}
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-red-800 hover:text-red-900 self-start"
              >
                Ver Terminados
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Lifestyle Mendoza Section */}
      <section id="lifestyle" className="py-24 container-custom">
        <div className="text-center max-w-2xl mx-auto space-y-6 mb-20">
          <span className="text-red-800 text-xs font-semibold tracking-[0.25em] uppercase">
            Experiencia
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900">
            {dict.Lifestyle.title}
          </h2>
          <p className="text-stone-500 font-light text-sm">
            {dict.Lifestyle.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Wine */}
          <div className="bg-white/50 backdrop-blur-sm p-8 border-t-2 border-t-primary border-x border-b border-stone-200/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-b-lg flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m0-20c-3.313 0-6 2.687-6 6a6 6 0 001.5 3.75l.5.5V18a2 2 0 002 2h4a2 2 0 002-2v-5.75l.5-.5A6 6 0 0018 8c0-3.313-2.687-6-6-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-stone-900 font-medium">
                {dict.Lifestyle.item1.title}
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {dict.Lifestyle.item1.description}
              </p>
            </div>
          </div>

          {/* Mountains */}
          <div className="bg-white/50 backdrop-blur-sm p-8 border-t-2 border-t-primary border-x border-b border-stone-200/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-b-lg flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-stone-900 font-medium">
                {dict.Lifestyle.item2.title}
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {dict.Lifestyle.item2.description}
              </p>
            </div>
          </div>

          {/* Gastronomy */}
          <div className="bg-white/50 backdrop-blur-sm p-8 border-t-2 border-t-primary border-x border-b border-stone-200/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-b-lg flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-stone-900 font-medium">
                {dict.Lifestyle.item3.title}
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {dict.Lifestyle.item3.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact Form Section */}
      <section id="contacto" className="py-24 bg-stone-900 text-white relative">
        <div className="container-custom max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6 flex flex-col justify-center">
            <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
              Contacto
            </span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              {dict.Contact.title}
            </h2>
            <p className="text-stone-400 font-light text-sm">
              {dict.Contact.subtitle}
            </p>
          </div>

          {/* Form Component */}
          <div className="w-full">
            <ContactForm dict={dict.Contact} />
          </div>
        </div>
      </section>
    </div>
  );
}
