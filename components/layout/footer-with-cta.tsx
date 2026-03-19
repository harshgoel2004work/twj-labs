import React from 'react'
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import DarkVeil from '../DarkVeil'
import { LogoSymbolGradient, LogoSymbolWhite, LogoWhite } from '../shared/logo'
import { services } from '@/data/services'
import Image from 'next/image'
import { useCases } from '@/data/use-cases'
import { ArrowRight, Sparkles } from 'lucide-react' // Assuming you have lucide-react, if not, remove the icon

const FooterWithCTA = () => {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navbar');
  const sT = useTranslations('Services');
  const uT = useTranslations('UseCases');
  const currentYear = new Date().getFullYear();

  const serviceKeyMap: { [key: number]: string } = {
    1: 'webflow', 2: 'wordpress', 3: 'webDesign', 4: 'ecommerce', 5: 'customSoftware', 
    14: 'aiIntegration', 13: 'accessibility', 7: 'seo', 8: 'socialMedia', 9: 'maintenance',
    10: 'copywriting', 11: 'migration', 6: 'aiIntegration' // Some IDs might be inconsistent
  };

  const useCaseKeyMap: { [key: string]: string } = {
    'b2b': 'b2b', 'ecommerce': 'ecommerce', 'saas': 'saas', 'healthcare': 'healthcare',
    'education': 'education', 'finance': 'finance', 'realestate': 'realestate', 'hospitality': 'hospitality'
  };

  return (
    <footer className='w-full relative overflow-hidden bg-[#060609] '>

      {/* --- Background Effects --- */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        {/* <div className='absolute inset-0 opacity-60'>
            <DarkVeil
            hueShift={1}
            noiseIntensity={0.03}
            speed={0.3}
            warpAmount={5}
            />
        </div> */}
        <div className="absolute inset-0 backdrop-blur-3xl z-1" />

        {/* Large Background Logo Watermark */}
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] opacity-[0.03] rotate-[-15deg] pointer-events-none z-2">
          <Image
            src="/logo-outline.svg" // Ensure this path is correct
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className='relative z-10 max-w-7xl 2xl:max-w-360 mx-auto px-6 md:px-12 lg:px-8 pt-20 pb-12'>

        {/* --- 1. Modernized CTA Section (Card Style) --- */}
        <div className="relative w-full max-w-340 2xl:max-w-360 mx-auto mb-30 group">
          {/* 1. The "Glow" Behind the Card - Soft ambient light */}
          <div className="absolute -inset-1 rounded-[40px] bg-linear-to-r from-[#5449e8] via-purple-500 to-[#5449e8] opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40" />

          {/* 2. Main Card Container */}
          <div className="relative rounded-[32px] overflow-hidden bg-[#0a0a0a] border border-white/10 ring-1 ring-white/5 p-8 md:p-20">

            {/* 3. Background Grid Pattern & Radial Mask */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* 4. Top Spotlight Light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[#5449e8]/20 blur-[100px] pointer-events-none mix-blend-screen" />

            {/* Content Layer */}
            <div className="relative flex flex-col items-center text-center gap-8 z-10">

              {/* Logo / Icon Badge */}
              <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg ">
                {/* Replace this with your LogoSymbolGradient */}
                <div className="p-3 rounded-xl bg-linear-to-br from-[#5449e8] to-purple-600 flex items-center justify-center">
                  <LogoSymbolWhite />
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight  drop-shadow-sm bg-clip-text text-transparent bg-linear-to-b from-white  to-neutral-400">
                  {t('ctaTitle')} <br />
                  <span className="">
                    {t('ctaTitleSpan')}
                  </span>
                </h2>
                <p className="text-sm md:text-lg text-neutral-400  max-w-lg mx-auto leading-relaxed ">
                  {t('ctaDescription')}
                </p>
              </div>

              <div className="pt-3">
                <Link
                  href={'/contact-sales'}
                  aria-label='Contact Sales'
                  className="relative inline-flex h-12 items-center justify-center rounded-full bg-neutral-950 px-8 py-1 text-sm font-medium text-white border border-white/10 ring-1 ring-white/5 transition-all duration-300 hover:bg-neutral-900 gap-2 overflow-hidden group/btn"
                >
                  {/* Spinning Gradient Border Effect - Simplified */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-20 group-hover/btn:opacity-40 animate-[spin_4s_linear_infinite]" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {t('contactSales')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 duration-300" />
                  </span>
                </Link>
              </div>

            </div>
          </div>
        </div>


        {/* --- 2. Footer Navigation Grid --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16'>

          {/* Brand Column (Span 4) */}
          <div className='lg:col-span-4 flex flex-col gap-6'>
            <div className='flex items-center gap-2'>
              <div className='scale-90'>
                <LogoSymbolWhite />
              </div>
              <LogoWhite />
            </div>
            <p className='text-sm text-neutral-400 leading-relaxed max-w-sm'>
              {t('brandDescription')}
            </p>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Columns (Span 7 total) */}
          <div className='lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8'>

            {/* Quick Links */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-semibold text-white tracking-wide'>{t('company')}</h3>
              <ul className='flex flex-col gap-3'>
                {[
                  { label: navT('home'), href: '/' },
                  { label: navT('about'), href: '/about' },
                  { label: navT('work'), href: '/work' },
                  { label: navT('blog'), href: '/blog' },
                  { label: navT('careers'), href: '/careers' },
                  { label: t('contactSales'), href: '/contact-sales' },
                  { label: navT('freeAudit'), href: '/free-website-audit' },
                  { label: navT('goOnline'), href: '/go-online' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-semibold text-white tracking-wide'>{t('services')}</h3>
              <ul className='flex flex-col gap-3'>
                {[...services[0].servicesList, ...services[1].servicesList].map((service) => (
                  <li key={service.id}>
                    <Link href={service.url} className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>
                      {serviceKeyMap[service.id] ? sT(serviceKeyMap[service.id]) : service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases / Legal */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-semibold text-white tracking-wide'>{t('resources')}</h3>
              <ul className='flex flex-col gap-3'>
                {useCases[0].cases.map((useCase) => (
                  <li key={useCase.link}>
                    <Link href={`/use-cases/for-${useCase.link}`} className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>
                      {useCaseKeyMap[useCase.link] ? uT(useCaseKeyMap[useCase.link]) : useCase.title}
                    </Link>
                  </li>
                ))}
                <li className="h-px bg-white/10 my-2 w-full" />
                <li>
                  <Link href="/legal/privacy-policy" className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>{t('privacyPolicy')}</Link>
                </li>
                <li>
                  <Link href="/legal/terms-of-service" className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>{t('termsOfService')}</Link>
                </li>
                <li>
                  <Link href="/legal/sitemap" className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>{t('sitemap')}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- 3. Bottom Bar --- */}
        <div className='pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className="text-xs text-neutral-500">
            &copy; {currentYear} The Walking Jumbo. {t('rights')}
          </p>

          {/* Optional: Social Icons Placeholders */}
          <div className='flex items-center gap-6 opacity-50'>
            {/* Add standard icons like Twitter/LinkedIn here if you have them */}
            {/* <TwitterIcon className="w-4 h-4 text-white hover:text-[#5449e8] cursor-pointer transition" /> */}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default FooterWithCTA