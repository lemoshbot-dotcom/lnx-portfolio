import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n-config'

function getLocale(request: NextRequest): string {
  // Verifica se já tem locale na URL
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return pathname.split('/')[1]

  // Detecta idioma do navegador
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage?.includes('pt')) return 'pt-BR'
  if (acceptLanguage?.includes('en')) return 'en'

  return i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Ignora arquivos estáticos
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/logos') ||
    pathname.startsWith('/flags') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Verifica se precisa redirecionar
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redireciona para locale
  const locale = getLocale(request)
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  )
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
