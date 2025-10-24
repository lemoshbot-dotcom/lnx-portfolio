"use client";

import Image from "next/image";

export default function ClientLogos() {
  const brands = [
    { name: 'Vivo', file: 'vivo.svg', width: 120, brightness: 2.0 },
    { name: 'Bradesco', file: 'bradesco.svg', width: 130, brightness: 2.0 },
    { name: 'Itaú', file: 'itau.png', width: 90 },
    { name: 'Santander', file: 'santander.png', width: 120 },
    { name: 'Nubank', file: 'nubank.svg', width: 110, brightness: 2.0 },
    { name: 'Intel', file: 'intel-3.png', width: 100, customFilter: 'grayscale(1) invert(1) brightness(1.3) contrast(2)' },
    { name: 'McDonald\'s', file: 'mcdonalds.svg', width: 110 },
    { name: 'Natura', file: 'natura.png', width: 110, customFilter: 'grayscale(1) invert(1) brightness(1.3) contrast(2)' },
    { name: 'Jeep', file: 'jeep.png', width: 90, brightness: 2.0 },
    { name: 'Nivea', file: 'nivea.png', width: 90, brightness: 2.0 },
    { name: 'Petronas', file: 'petronas.svg', width: 90 },
    { name: 'iFood', file: 'ifood.svg', width: 100 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-12 items-center">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="flex items-center justify-center h-20 opacity-60 hover:opacity-100 transition-opacity duration-300"
          style={{ maxWidth: `${brand.width}px`, margin: '0 auto' }}
        >
          <Image
            src={`/logos/${brand.file}`}
            alt={brand.name}
            width={brand.width}
            height={60}
            className="w-full h-auto object-contain"
            style={{
              filter: brand.customFilter
                ? brand.customFilter
                : `grayscale(1) brightness(${brand.brightness || 1.2})`
            }}
          />
        </div>
      ))}
    </div>
  );
}
