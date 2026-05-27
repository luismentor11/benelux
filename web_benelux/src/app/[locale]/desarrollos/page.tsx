import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, Locale } from "@/get-dictionary";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function DesarrollosPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const developments = [
    {
      id: "dev-1",
      title: "Chacras Heights Residence",
      location: "Chacras de Coria",
      stage: dict.Filters.pozo,
      description: "Exclusivo complejo residencial de departamentos premium y amenities de primer nivel. Ubicado en una de las zonas de mayor demanda en Mendoza. Financiación flexible durante la obra.",
      roi: "12-15% anual estimado",
      delivery: "Diciembre 2027",
      image: "/dev.png",
    },
    {
      id: "dev-2",
      title: "Tupungato Wine Estates",
      location: "Valle de Uco",
      stage: dict.Filters.desarrollo,
      description: "Club de campo integrado con bodegas y viñedos privados. Lotes con posesión y opción de construcción de villas de diseño llave en mano.",
      roi: "Apreciación de tierra acelerada",
      delivery: "Junio 2027",
      image: "/prop2.png",
    },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="space-y-4 mb-20 max-w-2xl">
          <span className="text-red-800 text-xs font-semibold tracking-[0.25em] uppercase block">
            Inversiones
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-stone-900">
            {dict.Navbar.developments}
          </h1>
          <p className="text-stone-500 font-light text-sm">
            Diseñamos oportunidades de inversión en Real Estate que combinan la seguridad del ladrillo con los rendimientos más atractivos del mercado mendocino.
          </p>
        </div>

        {/* Development List */}
        <div className="space-y-24">
          {developments.map((dev, idx) => (
            <div
              key={dev.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative h-[300px] md:h-[450px] w-full lg:w-1/2 overflow-hidden shadow-md">
                <Image
                  src={dev.image}
                  alt={dev.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-6 left-6 bg-red-800 text-white px-4 py-1.5 text-[0.65rem] tracking-widest uppercase font-semibold">
                  {dev.stage}
                </div>
              </div>

              {/* Text info */}
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-red-800 text-xs font-medium tracking-widest uppercase">
                  Fase: {dev.stage}
                </span>
                <h2 className="text-2xl md:text-4xl font-serif text-stone-900">
                  {dev.title}
                </h2>
                <p className="text-xs text-stone-400 tracking-wider uppercase">
                  Ubicación: {dev.location}
                </p>
                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {dev.description}
                </p>

                {/* Technical details list */}
                <div className="border-t border-stone-200/50 pt-6 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block font-light">Rendimiento:</span>
                    <span className="font-semibold text-stone-800">{dev.roi}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-light">Entrega proyectada:</span>
                    <span className="font-semibold text-stone-800">{dev.delivery}</span>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href={`/${locale}/#contacto`}
                    className="btn-primary"
                  >
                    Consultar Dossier Comercial
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
