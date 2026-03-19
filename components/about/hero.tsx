import Image from 'next/image';
import React from 'react';
import Balatro from '../Balatro';
import CustomBadge from '../shared/custom-badge';
import { useTranslations } from 'next-intl';

const AboutHero = () => {
  const t = useTranslations('About.Hero');

  const aboutUsCards = [
    {
      id: 1,
      title: t('cards.mission.title'),
      description: t('cards.mission.description'),
      image: '/about/1.png',
      alt: t('cards.mission.title')
    },
    {
      id: 2,
      title: t('cards.vision.title'),
      description: t('cards.vision.description'),
      image: '/about/2.png',
      alt: t('cards.vision.title')
    },
    {
      id: 3,
      title: t('cards.values.title'),
      description: t('cards.values.description'),
      image: '/about/2.png',
      alt: t('cards.values.title')
    }
  ];

  return (
    <div id="about" className="pt-40 pb-20 flex flex-col w-full text-white">
      {/* Intro Text */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 space-y-3 max-w-7xl mx-auto">
        <div className=''>
          <CustomBadge title={t('badge')} darkMode={true} />
        </div>
        <div className="font-medium space-y-4 md:col-span-2">
          <p className="text-3xl leading-normal">
            {t('missionContent')}
          </p>
          <p className="opacity-60 text-sm lg:pr-48 md:pr-24 sm:pr-0">
            {t('collaborationContent')}
          </p>
        </div>
      </div>

      <div className='w-full grid grid-cols-1 md:grid-cols-3 items-center justify-center mt-20 gap-6 max-w-7xl mx-auto'> 
        {aboutUsCards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-center bg-gray-100 w-full aspect-[2/2.5] relative overflow-hidden"
          >
            {/* Background Content */}
            {card.id === 2 ? (
              // Render Balatro for the middle card
              <div className="absolute inset-0 w-full h-full">
                <Balatro
                  isRotate={false}
                  mouseInteraction={false}
                  pixelFilter={800}
                  color1="#d57bd8"
                  color2="#6832cc"
                  color3="#9f4bd0"
                />
              </div>
            ) : (
              // Render image for other cards
              <Image
                src={card.image}
                alt={card.alt}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full p-6 bg-radial from-transparent to-black/40 flex flex-col justify-between z-10">
              <h2 className="text-xl text-white">{card.title}</h2>
              <p className="text-sm text-white/80">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutHero;


