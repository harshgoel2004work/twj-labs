import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Logo = () => {
  return (
    <div className=''>
      <Image 
        src="/twj logo.png"
        alt="The Walking Jumbo Logo"
        width={144}
        height={40}
        className='w-15'
      />
    </div>
  )
}

export const LogoWhite = () => {
  return (
    <div className=''>
      <Image 
        src="/twj-logo-white.png"
        alt="The Walking Jumbo Logo White"
        width={144}
        height={40}
        className='w-11'
      />
    </div>
  )
}

export const LogoSymbol = () => {
  return (
    <div className='w-10 h-10'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="w-full h-full">
        <g transform="matrix(2.391695, 0, 0, 2.391695, -348.079041, -353.105377)" fill="currentColor">
          <polygon style={{ paintOrder: "fill", stroke: "rgba(2, 2, 2, 0)" }} points="158.896 207.71 210.755 207.437 248.967 246.74 197.381 245.921"/>
          <polygon style={{ paintOrder: "fill", stroke: "rgba(0, 0, 0, 0)", transformOrigin: "203.775px 275.998px" }} points="158.739 295.378 210.598 295.651 248.81 256.348 197.224 257.167"/>
          <polygon points="218.435 151.309 218.435 200.72 228.537 210.603 252.694 185.348"/>
          <polygon points="269.603 175.905 269.384 210.163 307.595 247.057 341.414 246.837"/>
          <polygon points="218.173 352.726 218.173 303.315 228.275 293.432 252.432 318.687" style={{ transformOrigin: "235.303px 323.079px" }}/>
          <polygon points="269.863 328.27 269.644 294.012 307.855 257.118 341.674 257.338"/>
          <path d="M 264.304 244.668 L 288.604 269.031 L 240.003 269.031 L 264.304 244.668 Z" style={{ stroke: "rgba(0, 0, 0, 0)", transformBox: "fill-box", transformOrigin: "50% 50%" }} transform="matrix(0, -1, 1, 0, -18.547947, -41.773048)"/>
          <path d="M 264.304 244.668 L 288.604 269.031 L 240.003 269.031 L 264.304 244.668 Z" style={{ stroke: "rgba(0, 0, 0, 0)", strokeWidth: 1, transformOrigin: "264.304px 256.85px" }} transform="matrix(0, -1, 1, 0, -18.548069, 31.696228)"/>
          <polygon points="269.942 257.368 269.842 283.424 296.641 257.125"/>
          <polygon points="270.041 246.283 269.941 220.227 296.74 246.526" style={{ transformOrigin: "283.341px 233.375px" }}/>
        </g>
      </svg>
    </div>
  )
}

export const LogoSymbolWhite = () => {
  return (
    <div className='w-10 h-10'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="w-full h-full">
        <g transform="matrix(2.391695, 0, 0, 2.391695, -348.079041, -353.105377)" fill="#FFFFFF">
          <polygon style={{ paintOrder: "fill", stroke: "rgba(255, 255, 255, 0)" }} points="158.896 207.71 210.755 207.437 248.967 246.74 197.381 245.921"/>
          <polygon style={{ paintOrder: "fill", stroke: "rgba(255, 255, 255, 0)", transformOrigin: "203.775px 275.998px" }} points="158.739 295.378 210.598 295.651 248.81 256.348 197.224 257.167"/>
          <polygon points="218.435 151.309 218.435 200.72 228.537 210.603 252.694 185.348" fill="#FFFFFF"/>
          <polygon points="269.603 175.905 269.384 210.163 307.595 247.057 341.414 246.837" fill="#FFFFFF"/>
          <polygon points="218.173 352.726 218.173 303.315 228.275 293.432 252.432 318.687" style={{ transformOrigin: "235.303px 323.079px", fill: "#FFFFFF" }}/>
          <polygon points="269.863 328.27 269.644 294.012 307.855 257.118 341.674 257.338" style={{ fill: "#FFFFFF" }}/>
          <path d="M 264.304 244.668 L 288.604 269.031 L 240.003 269.031 L 264.304 244.668 Z" style={{ stroke: "rgba(255, 255, 255, 0)", transformBox: "fill-box", transformOrigin: "50% 50%", fill: "#FFFFFF" }} transform="matrix(0, -1, 1, 0, -18.547947, -41.773048)"/>
          <path d="M 264.304 244.668 L 288.604 269.031 L 240.003 269.031 L 264.304 244.668 Z" style={{ stroke: "rgba(255, 255, 255, 0)", strokeWidth: 1, transformOrigin: "264.304px 256.85px", fill: "#FFFFFF" }} transform="matrix(0, -1, 1, 0, -18.548069, 31.696228)"/>
          <polygon points="269.942 257.368 269.842 283.424 296.641 257.125" fill="#FFFFFF"/>
          <polygon points="270.041 246.283 269.941 220.227 296.74 246.526" style={{ transformOrigin: "283.341px 233.375px", fill: "#FFFFFF" }}/>
        </g>
      </svg>
    </div>
  )
}

export const LogoSymbolGradient = () => {
  return (
    <svg
    width="50"
    height="50"
    viewBox="0 0 40 40"
    fill="none"
  >
    <defs>
      <radialGradient id="grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#999fb2" />
      </radialGradient>
    </defs>

    {/* Scaled group of your original logo */}
    <g transform="scale(0.08)">
      <g transform="matrix(2.391695, 0, 0, 2.391695, -348.079041, -353.105377)">
        <polygon
          style={{
            paintOrder: "fill",
            stroke: "rgba(255, 255, 255, 0)",
            fill: "url(#grad)",
          }}
          points="158.896 207.71 210.755 207.437 248.967 246.74 197.381 245.921"
        />
        <polygon
          style={{
            paintOrder: "fill",
            stroke: "rgba(255, 255, 255, 0)",
            transformOrigin: "203.775px 275.998px",
            fill: "url(#grad)",
          }}
          points="158.739 295.378 210.598 295.651 248.81 256.348 197.224 257.167"
        />
        <polygon
          points="218.435 151.309 218.435 200.72 228.537 210.603 252.694 185.348"
          fill="url(#grad)"
        />
        <polygon
          points="269.603 175.905 269.384 210.163 307.595 247.057 341.414 246.837"
          fill="url(#grad)"
        />
        <polygon
          points="218.173 352.726 218.173 303.315 228.275 293.432 252.432 318.687"
          style={{
            transformOrigin: "235.303px 323.079px",
            fill: "url(#grad)",
          }}
        />
        <polygon
          points="269.863 328.27 269.644 294.012 307.855 257.118 341.674 257.338"
          style={{ fill: "url(#grad)" }}
        />
        <path
          d="M 264.304 244.668 L 288.604 269.031 L 240.003 269.031 L 264.304 244.668 Z"
          style={{
            stroke: "rgba(255, 255, 255, 0)",
            transformBox: "fill-box",
            transformOrigin: "50% 50%",
            fill: "url(#grad)",
          }}
          transform="matrix(0, -1, 1, 0, -18.547947, -41.773048)"
        />
        <path
          d="M 264.304 244.668 L 288.604 269.031 L 240.003 269.031 L 264.304 244.668 Z"
          style={{
            stroke: "rgba(255, 255, 255, 0)",
            strokeWidth: 1,
            transformOrigin: "264.304px 256.85px",
            fill: "url(#grad)",
          }}
          transform="matrix(0, -1, 1, 0, -18.548069, 31.696228)"
        />
        <polygon
          points="269.942 257.368 269.842 283.424 296.641 257.125"
          fill="url(#grad)"
        />
        <polygon
          points="270.041 246.283 269.941 220.227 296.74 246.526"
          style={{
            transformOrigin: "283.341px 233.375px",
            fill: "url(#grad)",
          }}
        />
      </g>
    </g>
  </svg>
  )
}