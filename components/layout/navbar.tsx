"use client"

import React, { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, BookOpen, Mail, Layers, Briefcase, InspectionPanel, Globe } from 'lucide-react';
import { LogoSymbolWhite } from '../shared/logo'
import CountrySelector from './country-selector';
import { services } from '@/data/services'
import { useCases } from '@/data/use-cases'
import {
  BriefcaseIcon,
  ShoppingCartIcon,
  CloudIcon,
  Cog6ToothIcon,
  HeartIcon,
  AcademicCapIcon,
  TruckIcon,
  BanknotesIcon,
  HomeModernIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/solid';

// --- Types ---
type LinkItem = {
  id: string; // Use id for translation keys
  isMegaMenu: boolean;
  href: string;
  megaMenuid?: string;
}

const navLinks: LinkItem[] = [
  { id: 'services', isMegaMenu: true, href: '#', megaMenuid: 'services-mega-menu' },
  { id: 'pricing', isMegaMenu: false, href: '/pricing' },
  { id: 'useCases', isMegaMenu: true, href: '#', megaMenuid: 'use-cases-mega-menu' },
  { id: 'company', isMegaMenu: true, href: '#', megaMenuid: 'company-mega-menu' }
]

const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  BriefcaseIcon,
  ShoppingCartIcon,
  CloudIcon,
  Cog6ToothIcon,
  HeartIcon,
  AcademicCapIcon,
  TruckIcon,
  BanknotesIcon,
  HomeModernIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
};

const Navbar = () => {
  const t = useTranslations('Navbar');
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links: LinkItem[] = navLinks;

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock Body Scroll when Mobile Menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`w-full h-20 px-6 md:px-12 lg:px-16  fixed top-0 left-0 z-50 transition-all duration-300  
          ${scrolled || mobileMenuOpen ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-white/5" : " border-transparent"}
        `}>
        <nav
          className='flex justify-between items-center h-full max-w-7xl mx-auto'
        >
          {/* --- LEFT ALIGNED SECTION: Logo + Divider + Links --- */}
          <div className="flex items-center h-full">
            {/* LOGO */}
            <div className='scale-90 relative z-50 flex items-center'>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <LogoSymbolWhite />
              </Link>
            </div>

            {/* VERTICAL DIVIDER */}
            <div className="hidden lg:block w-px h-8 bg-linear-to-b from-transparent via-white/20 to-transparent mx-6" />

            {/* DESKTOP MENU (Hidden on Mobile) */}
            <div className="hidden lg:flex space-x-8 text-[14px] font-normal text-white/70 h-full">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => link.isMegaMenu && setActiveMegaMenu(link.megaMenuid || null)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="hover:text-white transition flex items-center gap-1 py-4"
                  >
                    {t(link.id)}
                    {link.isMegaMenu && <ChevronDown size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />}
                  </Link>

                  {/* Desktop Mega Menus */}
                  <AnimatePresence>
                    {link.isMegaMenu && link.megaMenuid === "services-mega-menu" && activeMegaMenu === "services-mega-menu" && (
                      <ServicesMegaMenu />
                    )}
                    {link.isMegaMenu && link.megaMenuid === "use-cases-mega-menu" && activeMegaMenu === "use-cases-mega-menu" && (
                      <UseCasesMegaMenu />
                    )}
                    {link.isMegaMenu && link.megaMenuid === "company-mega-menu" && activeMegaMenu === "company-mega-menu" && <CompanyMegaMenu />}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT ALIGNED SECTION: CTA (Hidden on Mobile) --- */}
          <div className="hidden lg:flex items-center gap-6">
            {/* <CountrySelector /> */}
            <Link href={'/contact-sales'}
              className="w-fit py-3 px-6 rounded-xl text-xs font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white  hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              {t('contactSales')}
            </Link>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <button
            className="lg:hidden text-white relative z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </nav>

      {/* --- MOBILE FULL SCREEN MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

// ============================================================================
// REDESIGNED MOBILE MENU COMPONENT
// ============================================================================

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations('Navbar');
  const links = navLinks;
  const [expandedLink, setExpandedLink] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedLink(expandedLink === id ? null : id);
  };

  // Variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-[#08060b]/95 backdrop-blur-xl pt-24 px-6 overflow-y-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col space-y-4 pb-20 max-w-lg mx-auto"
      >
        {links.map((link) => (
          <motion.div
            variants={itemVariants}
            key={link.id}
            className={`rounded-2xl border transition-all duration-300 ${expandedLink === link.id ? "bg-white/5 border-white/10" : "bg-transparent border-transparent"
              }`}
          >
            <div
              className="flex items-center justify-between p-4 text-lg font-medium text-white cursor-pointer"
              onClick={() => link.isMegaMenu ? toggleAccordion(link.id) : onClose()}
            >
              {link.isMegaMenu ? (
                <>
                  <span>{t(link.id)}</span>
                  <motion.div
                    animate={{ rotate: expandedLink === link.id ? 180 : 0 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5"
                  >
                    <ChevronDown size={18} className="text-white/70" />
                  </motion.div>
                </>
              ) : (
                <Link href={link.href} className="w-full" onClick={onClose}>
                  {t(link.id)}
                </Link>
              )}
            </div>

            <AnimatePresence>
              {link.id && expandedLink === link.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-6 pt-2">
                    {link.megaMenuid === "services-mega-menu" && <MobileServicesList onClose={onClose} />}
                    {link.megaMenuid === "use-cases-mega-menu" && <MobileUseCasesList onClose={onClose} />}
                    {link.megaMenuid === "company-mega-menu" && (
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'about', label: t('about') },
                          { id: 'work', label: t('work') },
                          { id: 'blog', label: t('blog') },
                          { id: 'careers', label: t('careers') },
                          { id: 'contact', label: t('contact') },
                          { id: 'white-labeling', label: t('whiteLabeling') },
                          { id: 'go-online', label: t('goOnline') },
                          { id: 'free-website-audit', label: t('freeAudit') }
                        ].map((item) => (
                          <Link
                            key={item.id}
                            href={`/${item.id}`}
                            onClick={onClose}
                            className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/70 text-sm hover:text-white"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Mobile CTA Section */}
        <motion.div variants={itemVariants} className="pt-6 mt-4 border-t border-white/10 space-y-4">
          <div className="flex justify-center">
            {/* <CountrySelector /> */}
          </div>
          <Link
            href={'/contact-sales'}
            onClick={onClose}
            className="flex items-center justify-center w-full py-4 rounded-2xl text-[15px] font-bold bg-[#5449e8] text-white shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
          >
            {t('contactSales')}
          </Link>
          <p className="text-center text-white/40 text-xs mt-4">{t('readyToElevate')}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const MobileServicesList = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations('Services');
  const serviceKeyMap: { [key: number]: string } = {
    1: 'webflow', 2: 'wordpress', 3: 'webDesign', 4: 'ecommerce', 5: 'customSoftware',
    14: 'aiIntegration', 13: 'accessibility'
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {[...services[0].servicesList, ...services[1].servicesList].map((service) => (
        <Link
          key={service.id}
          href={service.url}
          onClick={onClose}
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
        >
          <div className="w-10 h-10 shrink-0 border border-white/10 rounded-xl flex items-center justify-center bg-[#1e1e24] group-hover:bg-indigo-600 transition-colors">
            <service.icon size={18} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{serviceKeyMap[service.id] ? t(serviceKeyMap[service.id]) : service.name}</div>
            {service.tagline && <div className="text-[10px] text-white/50">{serviceKeyMap[service.id] ? t(`${serviceKeyMap[service.id]}Tagline`) : service.tagline}</div>}
          </div>
        </Link>
      ))}
    </div>
  );
};

const MobileUseCasesList = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations('UseCases');
  const useCaseKeyMap: { [key: string]: string } = {
    'b2b': 'b2b', 'ecommerce': 'ecommerce', 'saas': 'saas', 'healthcare': 'healthcare',
    'education': 'education', 'finance': 'finance', 'realestate': 'realestate', 'hospitality': 'hospitality'
  };

  return (
    <div className="flex flex-col gap-8">
      {useCases.map((category) => (
        <div key={category.heading}>
          <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 ml-1">
            {category.heading === 'Industry' ? t('industry') : category.heading}
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {category.cases.map((item) => {
              const IconComponent = iconMap[item.icon];
              return (
                <Link
                  key={item.title}
                  href={`/use-cases/for-${item.link}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/5"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5">
                    <IconComponent className="size-4 text-white/80" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{useCaseKeyMap[item.link] ? t(useCaseKeyMap[item.link]) : item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};



// ============================================================================
// DESKTOP MEGA MENUS
// ============================================================================

const ServicesMegaMenu = () => {
  const navT = useTranslations('Navbar');
  const t = useTranslations('Services');
  const serviceKeyMap: { [key: number]: string } = {
    1: 'webflow', 2: 'wordpress', 3: 'webDesign', 4: 'ecommerce', 5: 'customSoftware',
    14: 'aiIntegration', 13: 'accessibility', 7: 'seo', 8: 'socialMedia', 9: 'maintenance',
    10: 'copywriting', 11: 'migration'
  };

  return (
    <motion.div
      className="absolute top-[60%] left-0 pt-6 w-180"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-[#121117] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 relative">
        {/* Background Effects */}
        <div className='absolute inset-0 backdrop-blur-3xl z-0 pointer-events-none' />
        <div className='absolute -top-20 -left-20 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none' />

        <div className="flex z-2 relative p-1">
          {/* Main Services */}
          <div className="w-full flex-2 border-r border-white/5 p-6 space-y-4">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{navT('coreServices')}</h3>
            <div className="grid grid-cols-2 gap-4">
              {services[0].servicesList.map((service) => (
                <Link
                  key={service.id}
                  href={service.url}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors ${service.id === 13 ? 'col-span-2' : ''}`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <service.icon size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">{serviceKeyMap[service.id] ? t(serviceKeyMap[service.id]) : service.name}</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">{serviceKeyMap[service.id] ? t(`${serviceKeyMap[service.id]}Tagline`) : service.tagline}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Services */}
          <div className="w-full p-6 space-y-4 bg-white/2 flex-1">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{navT('specialized')}</h3>
            <div className="flex flex-col gap-2">
              {services[1].servicesList.map((service) => (
                <Link
                  key={service.id}
                  href={service.url}
                  className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div>
                    <div className="text-xs font-medium text-white  transition-colors">{serviceKeyMap[service.id] ? t(serviceKeyMap[service.id]) : service.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UseCasesMegaMenu = () => {
  const t = useTranslations('UseCases');
  const useCaseKeyMap: { [key: string]: string } = {
    'b2b': 'b2b', 'ecommerce': 'ecommerce', 'saas': 'saas', 'healthcare': 'healthcare',
    'education': 'education', 'finance': 'finance', 'realestate': 'realestate', 'hospitality': 'hospitality'
  };

  return (
    <motion.div
      className="absolute top-[60%] left-1/2 -translate-x-1/2 pt-6 w-max"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-[#121117] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 relative">
        <div className='absolute inset-0 backdrop-blur-3xl z-0 pointer-events-none' />
        <div className='absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none' />

        <div className="flex z-2 relative">
          {useCases.map((category, idx) => (
            <div key={category.heading} className={`w-[600px] p-6 space-y-4 ${idx !== useCases.length - 1 ? 'border-r border-white/5' : ''}`}>
              <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{category.heading === 'Industry' ? t('industry') : category.heading}</h3>
              <div className="grid grid-cols-2 gap-6">
                {category.cases.map((item) => {
                  const IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>> = iconMap[item.icon];
                  const key = useCaseKeyMap[item.link];
                  return (
                    <Link
                      key={item.title}
                      href={`/use-cases/for-${item.link}`}
                      className="group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                        <IconComponent className="text-white/80 size-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white mb-0.5">{key ? t(key) : item.title}</div>
                        <div className="text-[10px] text-white/50 leading-tight line-clamp-1 group-hover:text-white/70">{key ? t(`${key}Desc`) : item.description}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const CompanyMegaMenu = () => {
  const t = useTranslations('Navbar');
  return (
    <motion.div
      className="absolute top-[60%] left-1/2 -translate-x-1/2 pt-6 w-140"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-[#121117] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 relative">
        {/* Background Effects */}
        <div className='absolute inset-0 backdrop-blur-3xl z-0 pointer-events-none' />
        <div className='absolute -top-20 -left-20 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none' />

        <div className="flex z-2 relative p-1">
          {/* Main Services */}
          <div className="w-full flex-[1.4] border-r border-white/5 p-6 space-y-4">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{t('company')}</h3>
            <div className="">

              <nav className='space-y-2'>
                <Link

                  href={"/about"}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <Briefcase size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">{t('about')}</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">{t('aboutDesc')}</div>
                  </div>
                </Link>
                <Link

                  href={"/work"}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <Layers size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">{t('work')}</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">{t('workDesc')}</div>
                  </div>
                </Link>
                <Link

                  href={"/white-labeling"}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <Layers size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">{t('whiteLabeling')}</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">{t('whiteLabelingDesc')}</div>
                  </div>
                </Link>
                <Link href={"/go-online"}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}>
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <Globe size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">{t('goOnline')}</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">{t('goOnlineDesc')}</div>
                  </div>
                </Link>
                <Link


                  href={"/careers"}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <Briefcase size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">{t('careers')}</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">{t('careersDesc')}</div>
                  </div>
                </Link>
              </nav>

            </div>
          </div>

          {/* Other Services */}
          <div className="w-full p-6 space-y-4 bg-white/2 flex-1">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{t('resources')}</h3>
            <div className="flex flex-col gap-2">
              <Link

                href={"/blog"}
                className={`group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
              >
                <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                  <BookOpen size={14} className="text-white/80" />
                </div>
                <div className='w-full'>
                  <div className="text-xs font-bold text-white ">{t('blog')}</div>
                  <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">{t('blogDesc')}</div>
                </div>
              </Link>
              <Link

                href={"/free-website-audit"}
                className={`group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
              >
                <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                  <InspectionPanel size={14} className="text-white/80" />
                </div>
                <div className='w-full'>
                  <div className="text-xs font-bold text-white ">{t('freeAudit')}</div>
                  <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">{t('freeAuditDesc')}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}