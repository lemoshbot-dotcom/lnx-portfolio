"use client"

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLocale: string) => {
    // Remove locale atual do pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-3">
      {/* Bandeira Brasil */}
      <button
        onClick={() => switchLanguage('pt-BR')}
        className={`transition-opacity ${
          currentLocale === 'pt-BR' ? 'opacity-100' : 'opacity-40 hover:opacity-70'
        }`}
        aria-label="Português"
      >
        <Image
          src="/flags/br.svg"
          alt="Português"
          width={24}
          height={16}
          className="rounded"
        />
      </button>

      {/* Bandeira EUA */}
      <button
        onClick={() => switchLanguage('en')}
        className={`transition-opacity ${
          currentLocale === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'
        }`}
        aria-label="English"
      >
        <Image
          src="/flags/us.svg"
          alt="English"
          width={24}
          height={16}
          className="rounded"
        />
      </button>
    </div>
  )
}
