import React from "react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  label?: string;
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Hola, estoy interesado en recibir asesoramiento sobre propiedades e inversiones en Mendoza.",
  label,
}: WhatsAppButtonProps) {
  // Format phone number (remove spaces, plus, etc.)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-stone-900 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-stone-800 transition-all duration-300 hover:-translate-y-1 group"
      aria-label={label || "Contactar por WhatsApp"}
    >
      {/* Icon */}
      <span className="relative flex h-5 w-5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <svg
          className="relative inline-flex h-5 w-5 text-emerald-400 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436.002 9.861-4.422 9.864-9.862.002-2.637-1.023-5.116-2.887-6.981-1.864-1.865-4.343-2.89-6.984-2.891-5.439 0-9.865 4.424-9.868 9.863-.001 1.63.435 3.222 1.262 4.636l-.97 3.541 3.636-.954zm10.742-6.533c-.29-.145-1.716-.848-1.981-.944-.266-.097-.46-.145-.652.145-.19.29-.738.944-.905 1.139-.166.195-.332.218-.622.073-.29-.145-1.226-.452-2.336-1.442-.864-.771-1.447-1.723-1.616-2.014-.17-.291-.018-.448.127-.592.13-.13.29-.339.435-.509.145-.17.193-.29.29-.484.097-.194.048-.363-.024-.509-.072-.145-.652-1.573-.893-2.155-.236-.57-.497-.491-.68-.5-1.68-.009-1.938.01-2.227.029-.29.02-.759.111-1.157.546-.399.436-1.522 1.491-1.522 3.636 0 2.146 1.558 4.218 1.775 4.509.217.29 3.066 4.682 7.427 6.566 1.037.448 1.847.716 2.477.917 1.042.331 1.99.284 2.739.172.836-.125 1.717-.7 1.958-1.344.241-.644.241-1.196.17-1.306-.072-.111-.266-.194-.556-.339z" />
        </svg>
      </span>

      {/* Text Label */}
      <span className="text-xs uppercase tracking-widest font-semibold text-stone-300 group-hover:text-white transition-colors duration-300">
        WhatsApp
      </span>
    </a>
  );
}
