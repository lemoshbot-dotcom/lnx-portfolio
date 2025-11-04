"use client";

import Image from "next/image";

export default function ClientLogos() {
  const brands = [
    { name: 'Vivo', file: 'vivo.svg', width: 120, brightness: 2.0 },
    { name: 'Bradesco', file: 'bradesco.svg', width: 105, brightness: 2.0 },
    { name: 'Itaú', file: 'itau.png', width: 75 },
    { name: 'Santander', file: 'santander.png', width: 95 },
    { name: 'Nubank', file: 'nubank.svg', width: 90, brightness: 2.0 },
    { name: 'Intel', file: 'intel-3.png', width: 100, customFilter: 'grayscale(1) invert(1) brightness(1.3) contrast(2)' },
    { name: 'McDonald\'s', file: 'mcdonalds.svg', width: 90 },
    { name: 'Natura', file: 'natura.png', width: 90, customFilter: 'grayscale(1) invert(1) brightness(1.3) contrast(2)' },
    { name: 'Jeep', file: 'jeep.png', width: 90, brightness: 2.0 },
    { name: 'Nivea', file: 'nivea.png', width: 90, brightness: 2.0 },
    { name: 'Petronas', file: 'petronas.svg', width: 70 },
    { name: 'iFood', file: 'ifood.svg', width: 100 },
  ];

  const LogoItem = ({ brand }: { brand: typeof brands[0] }) => (
    <div
      className="flex items-center justify-center h-20 opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mx-8"
      style={{ width: `${brand.width}px` }}
    >
      <Image
        src={`/logos/${brand.file}`}
        alt={brand.name}
        width={brand.width}
        height={60}
        className="w-full h-auto object-contain pointer-events-none select-none"
        style={{
          filter: brand.customFilter
            ? brand.customFilter
            : `grayscale(1) brightness(${brand.brightness || 1.2})`,
          userSelect: 'none'
        } as React.CSSProperties}
        draggable={false}
      />
    </div>
  );

  return (
    <div className="overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll">
          {[...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
            <LogoItem key={`${brand.name}-${idx}`} brand={brand} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-60%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
