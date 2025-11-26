"use client"

import Image from 'next/image';
import React from 'react';
import Balatro from '../Balatro';
import CustomBadge from '../shared/custom-badge';

// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

const aboutUsCards = [
  {
    id:1,
    title: 'Our Mission',
    description: 'To deliver high-quality products and services that exceed our customers\' expectations.',
    image: '/about/1.png',
    alt: 'Our Mission Image'
  },
  {
    id: 2,
    title: 'Our Vision',
    description: 'To be a global leader in our industry, recognized for our innovation and customer-centric approach.',
    image: '/about/2.png',
    alt: 'Our Vision Image'
  },
  {
    id: 3,
    title: 'Our Values',
    description: 'Integrity, Excellence, Innovation, and Customer Focus are the core values that guide our actions.',
    image: '/about/2.png',
    alt: 'Our Values Image'
  }
]



const AboutHero = () => {
  return (
    <div id="about" className="pt-40 pb-20 flex flex-col w-full text-white">
      {/* Intro Text */}
      <div className=" px-6 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-4 space-y-3">
        <div className=''>
          <CustomBadge title={"About Us"} darkMode={true} />
        </div>
        <div className="font-medium space-y-4 md:col-span-2">
          <p className="text-3xl leading-normal">
            Our mission is to deliver high-quality products and services that exceed our customers&apos; expectations. We are committed to innovation, excellence, and customer satisfaction.
          </p>
          <p className="opacity-60 text-sm lg:pr-48 md:pr-24 sm:pr-0">
            We believe in the power of collaboration and innovation, and we strive to create a positive impact in everything we do. Our team is committed to continuous improvement and we are always looking for ways to enhance our offerings. We value our customers and partners, and we work hard to build long-lasting relationships based on trust and mutual respect.
          </p>
          
        </div>
      </div>

      

      <div className='w-full grid grid-cols-1 md:grid-cols-3 items-center justify-center mt-20 px-6 md:px-24 gap-6'> 
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
  )
}

export default AboutHero


