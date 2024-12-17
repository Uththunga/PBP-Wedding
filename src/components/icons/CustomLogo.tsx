import React from 'react';

interface CustomLogoProps {
  className?: string;
}

export default function CustomLogo({ className = '' }: CustomLogoProps) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M800 500c0 165.685-134.315 300-300 300S200 665.685 200 500s134.315-300 300-300 300 134.315 300 300zM700 500c0 110.457-89.543 200-200 200S300 610.457 300 500s89.543-200 200-200 200 89.543 200 200z"
        fill="currentColor"
        fillRule="evenodd"
        stroke="currentColor"
        strokeWidth="40"
      />
      <path
        d="M450 200c-27.614 0-50-22.386-50-50s22.386-50 50-50h100c27.614 0 50 22.386 50 50s-22.386 50-50 50H450z"
        fill="currentColor"
      />
    </svg>
  );
}
