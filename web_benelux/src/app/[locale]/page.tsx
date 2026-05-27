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
    <div className="relative min-h-screen bg-black text-white selection:bg-[#E31837] selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Benelux Luxury Real Estate"
            fill
            priority
            className="object-cover brightness-[0.6] contrast-[1.1] scale-105 animate-[kenburns_20s_ease-out_forwards]"
            sizes="100vw"
          />
          {/* Subtle gradient overlay to read text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center animate-fade-in mt-16">
          <span className="text-[0.65rem] tracking-[0.4em] text-white/70 uppercase mb-6 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-white/30"></div>
            Inversiones Inmobiliarias
            <div className="w-12 h-[1px] bg-white/30"></div>
          </span>
          <h1 className="text-4xl md:text-7xl font-serif text-white tracking-widest leading-[1.1] mb-8 font-light uppercase">
            {dict.Hero.title}
          </h1>
          <p className="text-white/70 text-xs md:text-sm tracking-[0.25em] max-w-2xl font-light mb-12 uppercase leading-relaxed">
            {dict.Hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link
              href={`/${locale}/propiedades`}
              className="bg-[#E31837] text-white px-12 py-4 text-[0.65rem] font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-500 text-center"
            >
              {dict.Hero.cta}
            </Link>
            <Link
              href={`/${locale}/desarrollos`}
              className="bg-transparent text-white px-12 py-4 text-[0.65rem] font-semibold tracking-[0.25em] uppercase border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-500 text-center"
            >
              {dict.Hero.investCta}
            </Link>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
          <span className="text-[0.55rem] tracking-[0.4em] text-white/40 uppercase mb-4">Discover</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-[scrolldown_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </section>

      {/* 2. Search & Filter Bar Overlay */}
      <section className="relative z-20 -mt-8 container-custom px-4 mb-32 md:mb-48">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
          <div className="flex flex-col space-y-3">
            <label className="text-[0.6rem] tracking-[0.2em] text-white/50 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#E31837] rounded-full"></span>
              {dict.Filters.buy} / {dict.Filters.invest}
            </label>
            <select className="border-b border-white/20 pb-2 text-xs bg-transparent text-white outline-none focus:border-[#E31837] transition-all duration-300 cursor-pointer w-full appearance-none rounded-none">
              <option className="bg-black text-white">{dict.Filters.all}</option>
              <option className="bg-black text-white">{dict.Filters.buy}</option>
              <option className="bg-black text-white">{dict.Filters.invest}</option>
            </select>
          </div>

          <div className="flex flex-col space-y-3">
            <label className="text-[0.6rem] tracking-[0.2em] text-white/50 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              {dict.Filters.location}
            </label>
            <select className="border-b border-white/20 pb-2 text-xs bg-transparent text-white outline-none focus:border-white transition-all duration-300 cursor-pointer w-full appearance-none rounded-none">
              <option className="bg-black text-white">{dict.Filters.all}</option>
              <option className="bg-black text-white">Chacras de Coria</option>
              <option className="bg-black text-white">Valle de Uco</option>
              <option className="bg-black text-white">Ciudad de Mendoza</option>
            </select>
          </div>

          <div className="flex flex-col space-y-3">
            <label className="text-[0.6rem] tracking-[0.2em] text-white/50 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#0033A0] rounded-full"></span>
              {dict.Filters.stage}
            </label>
            <select className="border-b border-white/20 pb-2 text-xs bg-transparent text-white outline-none focus:border-[#0033A0] transition-all duration-300 cursor-pointer w-full appearance-none rounded-none">
              <option className="bg-black text-white">{dict.Filters.all}</option>
              <option className="bg-black text-white">{dict.Filters.pozo}</option>
              <option className="bg-black text-white">{dict.Filters.desarrollo}</option>
              <option className="bg-black text-white">{dict.Filters.finalizado}</option>
            </select>
          </div>

          <Link
            href={`/${locale}/propiedades`}
            className="bg-white text-black text-center py-4 text-[0.65rem] font-bold tracking-[0.25em] uppercase hover:bg-[#E31837] hover:text-white transition-all duration-500 cursor-pointer flex items-center justify-center gap-3"
          >
            {dict.Filters.search}
            <span className="text-lg leading-none font-light">→</span>
          </Link>
        </div>
      </section>

      {/* 3. Featured Properties */}
      <section className="min-h-[90vh] flex flex-col justify-center py-20 md:py-40 container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-[#E31837] text-[0.65rem] font-semibold tracking-[0.3em] uppercase block">
              Colección Exclusiva
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wider font-light">
              Propiedades Destacadas
            </h2>
          </div>
          <Link
            href={`/${locale}/propiedades`}
            className="text-[0.65rem] uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1 self-start md:self-auto"
          >
            Ver Todo el Portafolio
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {featuredProperties.map((prop) => (
            <div key={prop.id} className="group relative flex flex-col">
              {/* Image Container */}
              <div className="relative h-[500px] lg:h-[650px] w-full overflow-hidden mb-6">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out brightness-90 group-hover:brightness-100"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Tag overlay */}
                <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 text-[0.55rem] tracking-[0.3em] uppercase text-white border border-white/10">
                  {prop.tag}
                </div>
              </div>

              {/* Details */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-serif text-white uppercase tracking-widest font-light">
                  {prop.title}
                </h3>
                <span className="font-sans text-sm tracking-[0.15em] text-white">
                  {prop.price}
                </span>
              </div>
              
              <p className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-6">
                {prop.location}
              </p>

              <div className="border-t border-white/10 pt-4 flex items-center gap-8 text-[0.65rem] text-white/70 tracking-[0.2em] uppercase">
                <span>{prop.beds} Beds</span>
                <span>{prop.baths} Baths</span>
                <span>{prop.area}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Developments / Investments Section */}
      <section className="min-h-[90vh] flex flex-col justify-center py-20 md:py-40 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#111111] -z-10"></div>
        <div className="container-custom">
          <div className="max-w-4xl space-y-6 mb-24">
            <span className="text-[#E31837] text-[0.65rem] font-semibold tracking-[0.3em] uppercase block">
              Inversión y Desarrollo
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wider font-light leading-tight">
              {dict.Developments.title}
            </h2>
            <p className="text-white/50 font-light max-w-xl text-sm tracking-wider leading-relaxed">
              {dict.Developments.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            {/* Pozo */}
            <div className="p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between h-[400px] group hover:bg-white/5 transition-colors duration-500">
              <div className="space-y-6">
                <span className="text-[#E31837] font-sans text-sm tracking-widest block mb-12">01</span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-widest font-light">
                  {dict.Developments.stages.pozo.title}
                </h3>
                <p className="text-[0.7rem] text-white/50 font-light leading-loose tracking-wide">
                  {dict.Developments.stages.pozo.description}
                </p>
              </div>
              <Link
                href={`/${locale}/desarrollos?etapa=pozo`}
                className="text-[0.65rem] tracking-[0.25em] uppercase text-white hover:text-[#E31837] transition-colors flex items-center gap-2 mt-8"
              >
                Explorar Pozo <span className="font-light text-lg leading-none">→</span>
              </Link>
            </div>

            {/* Construcción */}
            <div className="p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between h-[400px] group hover:bg-white/5 transition-colors duration-500">
              <div className="space-y-6">
                <span className="text-white font-sans text-sm tracking-widest block mb-12">02</span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-widest font-light">
                  {dict.Developments.stages.desarrollo.title}
                </h3>
                <p className="text-[0.7rem] text-white/50 font-light leading-loose tracking-wide">
                  {dict.Developments.stages.desarrollo.description}
                </p>
              </div>
              <Link
                href={`/${locale}/desarrollos?etapa=construccion`}
                className="text-[0.65rem] tracking-[0.25em] uppercase text-white hover:text-white/70 transition-colors flex items-center gap-2 mt-8"
              >
                Ver Obras <span className="font-light text-lg leading-none">→</span>
              </Link>
            </div>

            {/* Terminado */}
            <div className="p-12 flex flex-col justify-between h-[400px] group hover:bg-white/5 transition-colors duration-500">
              <div className="space-y-6">
                <span className="text-[#0033A0] font-sans text-sm tracking-widest block mb-12">03</span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-widest font-light">
                  {dict.Developments.stages.finalizado.title}
                </h3>
                <p className="text-[0.7rem] text-white/50 font-light leading-loose tracking-wide">
                  {dict.Developments.stages.finalizado.description}
                </p>
              </div>
              <Link
                href={`/${locale}/desarrollos?etapa=terminado`}
                className="text-[0.65rem] tracking-[0.25em] uppercase text-white hover:text-[#0033A0] transition-colors flex items-center gap-2 mt-8"
              >
                Ver Terminados <span className="font-light text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Lifestyle Mendoza Section */}
      <section id="lifestyle" className="min-h-[90vh] flex flex-col justify-center py-20 md:py-40 container-custom">
        <div className="max-w-3xl space-y-6 mb-24 text-center mx-auto">
          <span className="text-[#E31837] text-[0.65rem] font-semibold tracking-[0.3em] uppercase block">
            El Estilo de Vida
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wider font-light">
            {dict.Lifestyle.title}
          </h2>
          <p className="text-white/50 font-light text-sm tracking-wider mx-auto">
            {dict.Lifestyle.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Wine */}
          <div className="flex flex-col items-center text-center space-y-6 group">
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center text-white group-hover:border-[#E31837] group-hover:text-[#E31837] transition-colors duration-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m0-20c-3.313 0-6 2.687-6 6a6 6 0 001.5 3.75l.5.5V18a2 2 0 002 2h4a2 2 0 002-2v-5.75l.5-.5A6 6 0 0018 8c0-3.313-2.687-6-6-6z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-white uppercase tracking-widest font-light">
              {dict.Lifestyle.item1.title}
            </h3>
            <p className="text-[0.7rem] text-white/50 font-light leading-loose tracking-wide">
              {dict.Lifestyle.item1.description}
            </p>
          </div>

          {/* Mountains */}
          <div className="flex flex-col items-center text-center space-y-6 group">
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center text-white group-hover:border-white group-hover:text-white transition-colors duration-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-white uppercase tracking-widest font-light">
              {dict.Lifestyle.item2.title}
            </h3>
            <p className="text-[0.7rem] text-white/50 font-light leading-loose tracking-wide">
              {dict.Lifestyle.item2.description}
            </p>
          </div>

          {/* Gastronomy */}
          <div className="flex flex-col items-center text-center space-y-6 group">
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center text-white group-hover:border-[#0033A0] group-hover:text-[#0033A0] transition-colors duration-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-white uppercase tracking-widest font-light">
              {dict.Lifestyle.item3.title}
            </h3>
            <p className="text-[0.7rem] text-white/50 font-light leading-loose tracking-wide">
              {dict.Lifestyle.item3.description}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Contact Form Section */}
      <section id="contacto" className="min-h-[90vh] flex flex-col justify-center py-20 md:py-40 bg-[#050505] border-t border-white/10">
        <div className="container-custom max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-8 flex flex-col justify-center">
            <span className="text-[#E31837] text-[0.65rem] font-semibold tracking-[0.3em] uppercase block">
              Contacto
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wider font-light leading-tight">
              {dict.Contact.title}
            </h2>
            <p className="text-white/50 font-light text-sm tracking-wider leading-relaxed">
              {dict.Contact.subtitle}
            </p>
            
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-8 h-[1px] bg-[#E31837]"></div>
                <span className="text-xs tracking-[0.2em] uppercase">Mendoza, Argentina</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-8 h-[1px] bg-white/30"></div>
                <span className="text-xs tracking-[0.2em] uppercase">+54 261 555-1234</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-8 h-[1px] bg-[#0033A0]"></div>
                <span className="text-xs tracking-[0.2em] uppercase">info@benelux.com</span>
              </div>
            </div>
          </div>

          {/* Form Component */}
          <div className="w-full">
            <ContactForm dict={dict.Contact} />
          </div>
        </div>
      </section>
      
      {/* Keyframes for animations injected locally */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        @keyframes scrolldown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}} />
    </div>
  );
}
