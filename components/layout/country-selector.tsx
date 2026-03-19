"use client"

import { useLocale, useTranslations } from 'next-intl';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function CountrySelector() {
  const t = useTranslations('CountrySelector');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLocaleChange(nextLocale: string) {
    setIsOpen(false);
    router.replace(
      // @ts-expect-error -- pathname is compatible
      {pathname, params},
      {locale: nextLocale}
    );
  }

  const languages = [
    { code: 'en', label: t('en'), flag: '🇺🇸' },
    { code: 'hi', label: t('hi'), flag: '🇮🇳' },
  ];

  const currentLanguage = languages.find(l => l.code === locale) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all outline-none"
      >
        <Globe size={14} className="opacity-70" />
        <span>{currentLanguage.label}</span>
        <ChevronDown size={12} className={`opacity-50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-40 bg-[#121117] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 p-1"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLocaleChange(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                  locale === lang.code 
                    ? 'bg-[#5449e8] text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{lang.label}</span>
                <span className="text-sm">{lang.flag}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
