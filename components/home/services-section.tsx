import React from 'react';
import CustomBadge from '../shared/custom-badge';
import { BsWordpress } from 'react-icons/bs';
import { SiWebflow } from 'react-icons/si';
import Link from 'next/link';
import { Brain, Palette } from 'lucide-react';

// --- Interfaces ---
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  link: string;
  className?: string; // Added className prop
}

interface TagProps {
  icon: React.ReactNode;
  label: string;
  link: string;
}

// --- Icons ---
const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

import { useTranslations } from "next-intl";

/* ─── main section ──────────────────────────────────────────── */
export default function ServicesSection() {
  const t = useTranslations('Home.Services');

  const SERVICES: ServiceCardProps[] = [
    {
      icon: <SiWebflow size={25} className='w-full h-full' />,
      title: t('webflow.title'),
      subtitle: t('webflow.subtitle'),
      description: t('webflow.description'),
      imageUrl: "/webflow-step.svg",
      link: "/webflow"
    },
    {
      icon: <BsWordpress size={25} className='w-full h-full' />,
      title: t('wordpress.title'),
      subtitle: t('wordpress.subtitle'),
      description: t('wordpress.description'),
      imageUrl: "/wordpress-step.svg",
      link: "/wordpress"
    },
    {
      icon: <Palette size={25} className='w-full h-full' />,
      title: t('webDesign.title'),
      subtitle: t('webDesign.subtitle'),
      description: t('webDesign.description'),
      imageUrl: "/web-des-step.svg",
      link: "/web-design"
    },
    {
      icon: <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />,
      title: t('ecommerce.title'),
      subtitle: t('ecommerce.subtitle'),
      description: t('ecommerce.description'),
      imageUrl: "/shopify-step.svg",
      link: "/ecommerce"
    },
    {
      icon: <path d="M16 18 22 12 16 6M8 6 2 12 8 18" />,
      title: t('customSoftware.title'),
      subtitle: t('customSoftware.subtitle'),
      description: t('customSoftware.description'),
      imageUrl: "/custom-step.svg",
      link: "/custom-software"
    },
    {
      icon: <Brain size={25} className='w-full h-full' />,
      title: t('ai.title'),
      subtitle: t('ai.subtitle'),
      description: t('ai.description'),
      imageUrl: "/ai-step.svg",
      link: "/ai"
    },
    {
      icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
      title: t('accessibility.title'),
      subtitle: t('accessibility.subtitle'),
      description: t('accessibility.description'),
      imageUrl: "/accessibility-step.svg",
      link: "/accessibility"
    },
  ];

  const TAGS: TagProps[] = [
    { icon: <path d="M3 3v18h18" />, label: t('tags.seo'), link: "/seo-optimization" },
    { icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />, label: t('tags.social'), link: "/social-media-management" },
    { icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />, label: t('tags.maintenance'), link: "/website-maintenance" },
    { icon: <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />, label: t('tags.copywriting'), link: "/copywriting" },
    { icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />, label: t('tags.migration'), link: "/migration-integration" },
  ];

  return (
    <section className="relative min-h-screen  py-24 px-6 md:px-12 lg:px-24 font-sans text-white overflow-hidden">

      {/* Top Ambient Purple Light */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[500px] bg-[#4f18db]/2 blur-[120px] rounded-full pointer-events-none "></div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header Area */}
        <div className="mb-20 flex flex-col items-center text-center">
          {/* ── badge ── */}
          <CustomBadge title={t('badge')} />

          {/* ── headline ── */}
          <h2 className="text-center text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-tight mb-4 mt-5">
            <span className="text-white">{t('title')}</span>

          </h2>

          {/* ── sub ── */}
          <p className="text-center text-[14.5px] leading-relaxed text-white/40 max-w-md ">
            {t('sub')}
          </p>


        </div>

        {/* 3x2 Grid Area */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            // Check if this is the last card in the array
            const isLast = index === SERVICES.length - 1;

            return (
              <ServiceCard
                key={index}
                {...service}
                // Apply the span classes conditionally
                className={isLast ? "md:col-span-2 lg:col-span-3 " : ""}
              />
            );
          })}
        </div>

        {/* Bottom Tags / Pills Area */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
          {TAGS.map((tag, index) => (
            <PillTag key={index} {...tag} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Added className to props and template literal
const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, subtitle, description, imageUrl, link, className = "" }) => {
  return (
    <Link href={link} className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#090a11] p-1 transition-all hover:border-white/10 cursor-pointer ${className}`}>
      {/* Inner dotted background pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#ffffff15_1px,transparent_1px)] bg-[size:14px_14px] opacity-40 mix-blend-overlay"></div>

      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6a35ff] text-white shadow-[0_0_15px_rgba(106,53,255,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {icon}
            </svg>
          </div>
          <ArrowUpRight />
        </div>

        {/* Content */}
        <div className="mb-6 flex-grow">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mb-4 text-sm text-gray-400">{subtitle}</p>
          <p className="text-sm leading-relaxed text-gray-400/80">{description}</p>
        </div>

        {/* Image */}
        <div className="relative mt-auto h-40 w-full overflow-hidden rounded-xl border border-white/5 bg-gray-900">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
          {/* Bottom fade overlay to blend image into card */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-40"></div>
        </div>
      </div>
    </Link>
  );
};

const PillTag: React.FC<TagProps> = ({ icon, label, link }) => {
  return (
    <Link href={link} className="flex cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-[#0a0a0c] py-2.5 pl-3 pr-5 transition-colors hover:bg-white/5 hover:border-white/20">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6a35ff] text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
      <span className="text-sm font-medium text-gray-200">{label}</span>
    </Link>
  );
}