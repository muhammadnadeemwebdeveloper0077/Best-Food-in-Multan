import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Custom Multan Food Emblem */}
      <div
        className={`${iconSizes[size]} bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#C2410C] rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-500/20 flex-shrink-0 relative overflow-hidden`}
      >
        <svg
          viewBox="0 0 40 40"
          className="w-6 h-6 fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Traditional Dome / Wok Motif */}
          <path d="M20 5C14 5 9 10 9 16C9 18 10 20 12 21.5L8 23V25H32V23L28 21.5C30 20 31 18 31 16C31 10 26 5 20 5Z" opacity="0.9" />
          {/* Flame / Steam Flourish */}
          <path d="M20 1C21 2.5 22 4 20 5C18 4 19 2.5 20 1Z" fill="#FFF" />
          {/* Sizzling Karahi handles */}
          <rect x="5" y="23" width="30" height="3" rx="1.5" fill="#FFF" />
          {/* Fork & Spoon crossed below */}
          <path d="M14 28L18 35M26 28L22 35" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-extrabold tracking-tight text-[#191919] leading-tight flex items-center gap-1.5 ${textSizes[size]}`}>
          <span>Best Food in</span>
          <span className="text-[#F97316] relative">
            Multan
            <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#F97316]/40 rounded-full"></span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-semibold text-stone-500 tracking-wider uppercase">
            Multan's Verified Food Directory
          </span>
        )}
      </div>
    </div>
  );
};
