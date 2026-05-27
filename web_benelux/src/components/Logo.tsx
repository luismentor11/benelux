import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export default function Logo({ className = "", isDark = true }: LogoProps) {
  const textColor = isDark ? "text-white" : "text-black";
  const subTextColor = isDark ? "text-white/70" : "text-black/70";
  const lineFades = isDark 
    ? "from-transparent to-white/30" 
    : "from-transparent to-black/30";

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Icon: The 3 slanted bars */}
      <svg viewBox="0 0 100 80" className="w-16 md:w-20 mb-4 transition-transform hover:scale-105 duration-700">
        <polygon points="20,80 35,80 35,30 20,45" fill="#E31837" />
        <polygon points="42.5,80 57.5,80 57.5,35 42.5,20" fill={isDark ? "#FFFFFF" : "#111111"} />
        <polygon points="65,80 80,80 80,50 65,35" fill="#0033A0" />
      </svg>

      {/* Main Text */}
      <div className="flex flex-col items-center w-full">
        <span className={`font-sans text-3xl md:text-4xl tracking-[0.3em] font-light ml-[0.3em] ${textColor}`}>
          BENELUX
        </span>
        
        {/* Tricolor Underline */}
        <div className="flex w-full items-center mt-3 mb-3 h-[1px]">
          <div className={`flex-1 bg-gradient-to-r ${lineFades}`}></div>
          <div className="w-6 h-[1.5px] bg-[#E31837]"></div>
          <div className={`w-6 h-[1.5px] ${isDark ? "bg-white" : "bg-black"}`}></div>
          <div className="w-6 h-[1.5px] bg-[#0033A0]"></div>
          <div className={`flex-1 bg-gradient-to-l ${lineFades}`}></div>
        </div>

        {/* Subtitle */}
        <span className={`font-sans text-[0.45rem] md:text-[0.55rem] tracking-[0.45em] uppercase ml-[0.45em] ${subTextColor}`}>
          Inversiones Inmobiliarias
        </span>
      </div>
    </div>
  );
}
